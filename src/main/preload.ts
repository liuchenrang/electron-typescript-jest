import { contextBridge,ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {
    console.log("dd")
  },
  sendEvent: (event: string,ctx: any)=>{
    ipcRenderer.send('asynchronous-message', ctx)
  },
  onEvent: (eventName: string, callback: (any))=>{
    console.log("onEv")
    ipcRenderer.on(eventName,callback)
  }
})
