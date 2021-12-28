"use strict";

const clipboard = window.requires.clipboard
let clipboardHistory = [];      // クリップボードの履歴を古い順に格納
let clipboardHistoryNo = 0;

// ダブルクリックされた場合、ダブルクリックされた要素の内容をクリップボードに戻す
function clipboard_area_dblClick(e) {
    clipboard.writeText( e.currentTarget.innerHTML )
}

// クリップボード履歴の内容を<div>タグを付与して表示する画面の更新
function createClipBoardHistoryElement(pasteText) {
    const clipboardAreaElement = document.getElementById("clipboard_area")
    // TODO:HTMLのタグなどをテキストに変換して出力するようにする必要がある
    const newClipBoardHistoryElement = document.createElement("div")

    newClipBoardHistoryElement.innerHTML = "<pre>" + pasteText + "</pre>"
    newClipBoardHistoryElement.className = "clipboard-History-Element"
    
    newClipBoardHistoryElement.id = "id" + clipboardHistoryNo;
    clipboardHistoryNo++;

    newClipBoardHistoryElement.addEventListener("dblclick", clipboard_area_dblClick)
    clipboardAreaElement.prepend(newClipBoardHistoryElement)


}

function intervalProc(){

    let pasteTextWork = clipboard.readText()
    let enablePushHistory = false;

    // 空でないことと、前回登録した値と同値でないことを確認してから画面更新、登録をする
    if( clipboardHistory.length == 0 && !(pasteTextWork === undefined ) ){
        enablePushHistory = true
    }else if( clipboardHistory[clipboardHistory.length-1] != pasteTextWork ) {
        enablePushHistory = true
    }

    if(enablePushHistory){
        createClipBoardHistoryElement(pasteTextWork)
        clipboardHistory.push( pasteTextWork )
    }
}

onload = function () {
    // 1秒毎に更新するイベントを作成
    let interval;
    this.clearInterval(interval)
    interval = setInterval(intervalProc, 1000);
};
