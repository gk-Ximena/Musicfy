use windows::Win32::UI::Input::KeyboardAndMouse::{
    SendInput, INPUT, INPUT_0, INPUT_KEYBOARD, KEYBD_EVENT_FLAGS, KEYBDINPUT,
    VIRTUAL_KEY, VK_MEDIA_PLAY_PAUSE, VK_MEDIA_NEXT_TRACK, VK_MEDIA_PREV_TRACK,
};

use tauri::{Manager, Emitter}; 
use std::thread;
use tungstenite::{accept, Message};
use std::net::TcpListener;


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

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            let window_clone = window.clone();

            thread::spawn(move || {
                let server = TcpListener::bind("127.0.0.1:12345").unwrap();
                println!("WebSocket server running on ws://127.0.0.1:12345");


                for stream in server.incoming() {
                    let mut websocket = accept(stream.unwrap()).unwrap();

                    loop {
                        let msg = websocket.read_message().unwrap();

                        if msg.is_text() {
                            let payload = msg.to_text().unwrap();
                            window_clone.emit("metadata", payload).unwrap();
                        }
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            play_pause,
            next_track,
            previous_track
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}




