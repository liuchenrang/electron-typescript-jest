import React, { FC, useState } from "react";
import { Button,Image } from "antd";
import { ipcRenderer }  from 'electron'
import "./App.css";
const App: FC = () => {
  const [message, setMessage]= useState('');
  const clickMe = () => {
    globalThis.electron.ipcRenderer.send('asynchronous-message', 'ping')
    globalThis.electron.ipcRenderer.on('asynchronous-reply', function(event, arg) {
      console.log(arg); // prints "pong"
      setMessage(arg)
    });
  };

  ipcRenderer.send("checkForUpdate");
  // 主进程返回的检测状态
  ipcRenderer.on("message", (event, data) => {
    console.log(data);
    if (data.status == -1) {
     console.log(data)
    }
  });
  //注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
  ipcRenderer.on("downloadProgress", (event, progressObj) => {
    if (progressObj.percent) {
      //this.updateProgress = progressObj.percent;
      if (progressObj.percent == 100) {

      }
      console.log(progressObj)
    }
    // this.downloadPercent = progressObj.percent || 0;
  });
  return (
    <div>
      <Button onClick={clickMe}>My Button</Button>
      <Image src={message}/>
    </div>
  );
};

export default App;
