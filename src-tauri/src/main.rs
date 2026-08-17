#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use windows::Win32::UI::Input::KeyboardAndMouse::{
    SendInput, INPUT, INPUT_0, INPUT_KEYBOARD, KEYBD_EVENT_FLAGS, KEYBDINPUT,
    VIRTUAL_KEY, VK_MEDIA_PLAY_PAUSE, VK_MEDIA_NEXT_TRACK, VK_MEDIA_PREV_TRACK,
};

use std::sync::{mpsc, Arc, Mutex};
use std::sync::mpsc::Sender;
use std::thread;
use std::time::Duration;
use tungstenite::{accept, Message};
use std::net::TcpListener;
use tauri::{Manager, Emitter};


fn send_media_key(vk: VIRTUAL_KEY) {
    unsafe {
        // Key down
        let mut input = INPUT {
            r#type: INPUT_KEYBOARD,
            Anonymous: INPUT_0 {
                ki: KEYBDINPUT {
                    wVk: vk,
                    wScan: 0,
                    dwFlags: KEYBD_EVENT_FLAGS(0),
                    time: 0,
                    dwExtraInfo: 0,
                },
            },
        };
        SendInput(&[input], std::mem::size_of::<INPUT>() as i32);

        // Key up
        input.Anonymous.ki.dwFlags = KEYBD_EVENT_FLAGS(1); // KEYEVENTF_KEYUP
        SendInput(&[input], std::mem::size_of::<INPUT>() as i32);
    }
}

#[tauri::command]
fn play_pause() {
    send_media_key(VK_MEDIA_PLAY_PAUSE);
}

#[tauri::command]
fn next_track() {
    send_media_key(VK_MEDIA_NEXT_TRACK);
}

#[tauri::command]
fn previous_track() {
    send_media_key(VK_MEDIA_PREV_TRACK);
}

#[tauri::command]
fn set_volume(volume: f64, tx: tauri::State<Arc<Mutex<Sender<String>>>>) {
    let payload = format!(r#"{{"type":"setVolume","value":{}}}"#, volume);
    if let Ok(sender) = tx.lock() {
        let _ = sender.send(payload);
    }
}

#[tauri::command]
fn toggle_mute(tx: tauri::State<Arc<Mutex<Sender<String>>>>) {
    if let Ok(sender) = tx.lock() {
        let _ = sender.send(r#"{"type":"toggleMute"}"#.to_string());
    }
}

fn main() {
    let (tx, rx) = mpsc::channel::<String>();
    let tx = Arc::new(Mutex::new(tx));

    tauri::Builder::default()
        .manage(tx)
        .setup(move |app| {
            let window = app.get_webview_window("main").unwrap();
            let window_clone = window.clone();

            thread::spawn(move || {
                let server = TcpListener::bind("127.0.0.1:12345").unwrap();

                for stream in server.incoming() {
                    let stream = stream.unwrap();
                    stream.set_read_timeout(Some(Duration::from_millis(100))).unwrap();
                    let mut websocket = accept(stream).unwrap();

                    loop {
                        while let Ok(payload) = rx.try_recv() {
                            let _ = websocket.write_message(Message::Text(payload));
                        }

                        match websocket.read_message() {
                            Ok(msg) => {
                                if msg.is_text() {
                                    let payload = msg.to_text().unwrap();
                                    window_clone.emit("metadata", payload).unwrap();
                                }
                            }
                            Err(tungstenite::Error::Io(ref e))
                                if e.kind() == std::io::ErrorKind::WouldBlock =>
                            {
                                continue;
                            }
                            Err(_) => break,
                        }
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            play_pause,
            next_track,
            previous_track,
            set_volume,
            toggle_mute
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}




