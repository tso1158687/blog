---
title: Angular與Electron共舞
date: 2019-06-17 22:46:44
tags: [nodejs, angular]
---

> 比你想像的更容易

> 如果你有能力寫網站，就寫得出桌面應用程式。 Electron 是個用 JavaScript、HTML 及 CSS 等網頁技術開發原生應用程式的框架。鳥事它都包了，專注在你的核心功能吧。

[Electron](https://electronjs.org/)官網簡單明瞭寫下框架的威力，開發桌面應用程式，你只需要專注在網頁三大巨頭`JavaScript`、`HTML`、`CSS`，其他的 Electron 都包了。因此在此就示範如何使用 Angular 搭配 Electron 快速建立一個簡單的桌面應用程式吧!

1.首先先建立 angular 專案

```
ng new angularWithElectron
```

2.建立完之後，輸入:

```
ng serve --open
```

如果很懶的話也可以輸入懶人版指令:

```
ng s -o
```

{% asset_img awe1.png %}

看到這個畫面表示 angular 專案已經建立起來囉!
接著加入 electron 套件

3.安裝 electron

```
npm install --save-dev electron
```

4.在專案最外層，新增 `main.js`，當作 electron 進入點

{% asset_img awe2.png %}

5.`main.js` 當中，貼上 electron 啟動所需要的基本設定

```
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
// 建立瀏覽器視窗。
win = new BrowserWindow({
width: 800,
height: 600,
webPreferences: {
nodeIntegration: true
}
})

// and load the index.html of the app.
win.loadFile('index.html')

// Open the DevTools.
win.webContents.openDevTools()

// 視窗關閉時會觸發。
win.on('closed', () => {
// 拿掉 window 物件的參照。如果你的應用程式支援多個視窗，
// 你可能會將它們存成陣列，現在該是時候清除相關的物件了。
win = null
})
}

// 當 Electron 完成初始化，並且準備好建立瀏覽器視窗時
// 會呼叫這的方法
// 有些 API 只能在這個事件發生後才能用。
app.on('ready', createWindow)

// 在所有視窗都關閉時結束程式。
app.on('window-all-closed', () => {
// 在 macOS 中，一般會讓應用程式及選單列繼續留著，
// 除非使用者按了 Cmd + Q 確定終止它們
if (process.platform !== 'darwin') {
app.quit()
}
})

app.on('activate', () => {
// 在 macOS 中，一般會在使用者按了 Dock 圖示
// 且沒有其他視窗開啟的情況下，
// 重新在應用程式裡建立視窗。
if (win === null) {
createWindow()
}
})

// 你可以在這個檔案中繼續寫應用程式主程序要執行的程式碼。
// 你也可以將它們放在別的檔案裡，再由這裡 require 進來。
```

6.修改 `main.js` 讀取檔案的路徑，electron 預設是 `index.html`。但是 angular 最終生成打包好的檔案在 `dist` 下面，所以要修改路徑`dist/<專案名稱>/index.html`
以本專案叫作 angularWithElectron 為例子，路徑就要修改為`dist/angularWithElectron`

{% asset_img awe3.png %}

7.修改 index.html 的路徑，將根路徑的絕對路徑修改為相對路徑

```
 <base href="/">
```

修改為:

```
 <base href="./">
```

{% asset_img awe4.png %}

8.在 `package.json` 加上 electron 的進入點(如果沒有加上這個指令的話，預設會去找 index.js)

```
"main":"main.js"
```

{% asset_img awe5.png %}

9.(非必須)最後加上快速的指令，可以一鍵打包 angular 檔案，並且打開 electron 吧!

在 scripts 裡面加上

{% asset_img awe6.png %}

```
"electron": "ng build && electron ."
```

10.大功告成!馬上輸入 `npm run electron` 就可以看到使用 angular 框架的 electron 應用程式囉

接下來就是使用你最熟悉的方式開發 angular 囉，其他的，electron 都幫你處理掉了!

{% asset_img awe7.png %}
