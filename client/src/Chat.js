import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {
    const [currentMessage, setcurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async ()=> {

        if (currentMessage !== ""){
            const messageData = {
                room: room,
                message:currentMessage,
                author:username,
                time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            }
           await socket.emit("send_message", messageData);
        }
    }

    useEffect(()=>{
        socket.on("recive_message", (Data)=>{
            setMessageList((list)=> [...list, Data]);
        })
    }, [socket])
  return (
    <div className='chat-window' >
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            {messageList.map((message) => {
                return (<h1>{message.message}</h1>)
            })}
        </div>
        <div className='chat-footer'>
            <input type='text'
            placeholder='Hey...'
            onChange={(event)=>setcurrentMessage(event.target.value)}
            />
            <button onClick={sendMessage} >Send</button>
        </div>
    </div>
  )
}

export default Chat