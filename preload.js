const {contextBridge} = require("electron")

contextBridge.exposeInMainWorld(
    "requires", {
        clipboard: require("electron").clipboard
    }
)