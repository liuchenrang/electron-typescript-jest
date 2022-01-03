import React, { FC, useState } from "react";
import { Button,Image } from "antd";
import "./App.css";
const App: FC = () => {
  const [message, setMessage]= useState('');
  const clickMe = () => {
    window.myAPI.sendEvent('asynchronous-message', 'ping')
    window.myAPI.onEvent('asynchronous-reply', function(event, arg) {
      console.log(arg); // prints "pong"
      setMessage(arg)
    });
  };
  return (
    <div>
      <Button onClick={clickMe}>My Button</Button>
      <Image src={message}/>
    </div>
  );
};

export default App;
