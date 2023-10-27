import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState("");
  const [recieveMessage, setRecieveMessage] = useState("");
  const [room, setRoom] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setRecieveMessage(data.message);
      },
      [socket]
    );
  });

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send message</button>
      <h1>{recieveMessage}</h1>
    </div>
  );
}

export default App;
