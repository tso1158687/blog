---
title: 前端開發環境快速設定
date: 2018-02-15 00:30:54
tags:
---

剛拿到一台新的電腦，最重要的就是可以快速地部屬環境，快速回到熟悉的環境，趕快就戰鬥位置(･ω´･ )

### step0

前置準備:建議先打開 windows update，把作業系統、顯示卡驅動程式等等基本元件更新到最新版

### step1

打開「chrome 下載器」IE 或 EDGE 下載[chrome](https://www.google.com.tw/intl/zh-TW/chrome/)

### step2

下載之後除了將自己的資料同步到電腦上，找回熟悉的麥香之外，建議安裝[chocolatey](https://chocolatey.org/)。這是一款套件管理器，可以快速地幫你安裝和管理程式，並且免去每次安裝程式時一直點擊下一步的麻煩。安裝方法很簡單，打開 windows 搜尋列，打 `cmd`點擊右鍵使用`管理員權限`打開命令提示字元，輸入以下指令:

```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

稍待一下顯示安裝成功之後，就可以開始安裝開發必備的程式了。

### step3

再來，就要安裝前端開發最基本的程式了

* postman:測試 API 的方面工具
* nodejs:這個我不知道怎麼解釋，反正就是要裝，server 才 run 得起來
* vs code:前端的開發工具
* git:版控的工具

```
choco install postman nodejs visualstudiocode -y
```

可以發現指令當中並沒有安裝 git，是因為安裝 git 的時候有很多安裝的選項要微調，由於不知道他會怎麼安裝，只好自己手動安裝。
[git 下載網址](https://git-scm.com/)

### step4

安裝版控的 GUI 工具。GIT 雖然非常方便，但是有很多複雜的指令，其實我是記不起來的，所以要使用 GUI 工具來輔助我使用 GIT。網路有很多這樣的工具，目前我比較熟悉的是 「[sourcetree](https://www.sourcetreeapp.com/) 」和 「[gitkraken](http://gitkraken/) 」(俗稱章魚哥，因為 LOGO 是一隻跳來跳去的章魚)，建議兩套都裝，有時候一套工具突然發瘋了，可以馬上換用另外一套，非常方便。

ps:章魚哥有一個非常奇怪的安全性問題，在第一次操作之前，一定要到你 clone 下來的 repo 更改你的密碼，重新取得安全性憑證才能開始正常的使用

### step5

同步 VS code 插件。相信每個人都有自己的開發習慣，所以每個人會裝不同的插件，讓自己在開發的時候更方便、更快速。因此到 「擴充功能」搜尋並安裝「Setting Sync」

安裝完之後，只需要重新啟動 vs code，按下`alt+shift+D`，依照指示輸入`github Token`和`github gist`之後，Setting Sync，靜待一陣子就會自動同步所有備份的插件。vs code 設定完成!

基本上開發環境設定到這邊就完成了。接下來就是針對個別專案的環境安裝

PS:如果還沒有設定過 Setting Sync 的，建議可以看這篇 [Setting Sync 教學](http://www.whidy.net/visual-studio-code-settings-sync-introduction.html)

### 風險雲

風險雲使用 angular，因此需要安裝`angular cli`，打開命令提示字元，輸入:

```
npm install -g @angular/cli
```

安裝完畢之後，在風險雲資料夾下再次打開命令提示字元，輸入:

```
npm install
```

等相關套件安裝完畢之後，只需要需入以下指令，就可以開始運行風險雲了

```
npm start
ng serve //兩個指令是一樣的，選擇一個輸入即可
```

### 法規雲

法規雲使用 angularjs，因為架構比較沒有那麼潮那麼新，啟用步驟比較多一點，不過還是很簡單滴

在法規雲的根資料夾新增檔案 proxy.json 然後輸入以下內容:

```
{
 "target": "https://eshclouds-lawking-api-developer.azurewebsites.net",
 "changeOrigin": true
}
```

再新增`proxy-auth.json`然後輸入以下內容:

```
{
  "target": "https://eshclouds-authorization-api-developer.azurewebsites.net",
  "changeOrigin": true
}
```

最後打開`app.config.json`，將 develoler 的 api 位置複製到 local 上面，設定大功告成

接下來在根目錄打開命令提示字元，輸入:

```
npm install -g gulp karma karma-cli webpack
```

再來輸入:

```
npm install
```

等套件安裝完畢之後，再輸入以下指令便可以使用法規雲囉

```
gulp serve
```

### 後記:

前端的設定不算很複雜，但是有一點繁瑣。因此寫了一個簡單的教學，只要照著步驟做，可以馬上設定好快速進入開發的工作。但是這樣只照著教學設定，說實在不是一件非常好的事情。希臘哲學家蘇格拉底曾經說過:`未經思考的人生是不值得活的`
照著設定的教學走，當然非常輕鬆，但是如果不了解每個指令的意義的話，那麼這些東西終究不是自己的，對自己毫無幫助，就只是像個執行指令的機器。所以建議，做完教學之後，可以回頭看一下，這些指令分別的作用是什麼，讓環境設定也可以變成自我成長的一個機會。☝( ◠‿◠ )☝
