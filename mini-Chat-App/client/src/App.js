import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUsername] = useState("");
  const [RoomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const JoinRoom = () => {
    if (userName !== "" && RoomId !== "") {
      socket.emit("join_room", RoomId, userName);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
     { !showChat ? <div className="joinChatContainer">
        <h3>Join Room</h3>
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          placeholder="Room-id..."
          onChange={(event) => setRoomId(event.target.value)}
        />
        <button onClick={JoinRoom}>Join Room</button>
      </div>
      :
      <Chat socket={socket} username={userName} room={RoomId} />}
    </div>
  );
}

export default App;
