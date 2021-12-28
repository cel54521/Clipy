"use strict";

const  {app, Menu, Tray,  BrowserWindow, globalShortcut} = require("electron")
const path = require("path")
let tray = null
let globalWin = null

// タスクトレイ生成
function createTray() {
    let imgFilePath = __dirname + "/icon/icon.png"
    const contextMenu = Menu.buildFromTemplate([
        { 
            label: "終了",
            role: "quit"
        }
    ]);
    tray = new Tray(imgFilePath);
    tray.setToolTip(app.name);
    tray.setContextMenu(contextMenu);
}

function createWindow () {
    const win = new BrowserWindow({
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        transparent: true,
        resizable: false,
        frame: false,
        toolbar: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });

    win.loadFile("index.html")

    return win;
}

app.whenReady().then(() => {
    globalWin = createWindow()

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })

    try
    {
        createTray()
    }
    catch(e)
    {
        console.log(e)
    }
    
    globalShortcut.register('Alt+C', function() {
        globalWin.show()
        globalWin.focus()   // TODO:globalにしない方法にしたい
    })
})

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        globalShortcut.unregisterAll()
        app.quit()
    }   
})

app.on("browser-window-blur", function () {
    globalWin.hide()
})