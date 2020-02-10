---
title: (DAY-3) 建立Angular 環境-Angular 與 Nestjs 共舞
date: 2019-09-19 23:31:24
tags: [angular]
---
Angular 提供一套很完整的工具去建立各種angular會使用到的元件稱為Angular CLI，只要簡單的指令就可以將Angular的環境建立起來，馬上就可以進入開發


# 安裝Angular環境
在安裝Angular CLI之前，要先確認有沒有安裝Nodejs ，如果沒有請先至官方網站安裝Nodejs，安裝完之後，輸入: 
```
node --version
```

即可看到Nodejs的版本號碼，就代表安裝成功
![https://ithelp.ithome.com.tw/upload/images/20190919/20120107OH31SeYiQi.png](https://ithelp.ithome.com.tw/upload/images/20190919/20120107OH31SeYiQi.png)

接下來就可以安裝Angular CLI，輸入
```
npm install @angular/cli -g
```


安裝完成之後，輸入
```
ng --version
```
檢視是否有安裝完成
![https://ithelp.ithome.com.tw/upload/images/20190919/20120107h1fPTHB47a.png](https://ithelp.ithome.com.tw/upload/images/20190919/20120107h1fPTHB47a.png)





看到大大的Angular CLI的紅字，代表安裝完成了啦，就可以馬上進入Angular的世界囉!


註:Angular 從 8.0開始要求`Nodejs版本要在10以上才能使用`，本系列文章皆以最新的版本 Angular 8 撰寫。如果是新安裝的使用者就沒有任何問題。

但是如果原本就有其他的Angular專案，且專案的Angular版本小於8(ex:7,6,5,4....)則需要Nodejs 8.x的版本才能運行。雖然版本更新總是要壯士斷腕拋棄過舊的版本，卻是對於維護不同版本Angular的來莫大的困擾。不過不用擔心，系列文最後，會寫一篇如何使用`NVM`快速地切換Nodejs版本。


輸入指令讓Angular CLI自動幫你啟動一個全新的Angular專案

```
ng new <project-name>
```


以我這次要分享的專案為例，我就稱為`todolist-iron`，因此我輸入:
```
ng new todolist-iron
```


接下來Angular CLI 就會問你一些配置的問題，例如
1. Would you like to add angular routing? (要不要先預先幫你建立好angular路由?) 
2. Which style sheet format would like to use (喜歡使用哪一種格式的樣式?)
![https://ithelp.ithome.com.tw/upload/images/20190919/20120107gyhW13GOmO.png](https://ithelp.ithome.com.tw/upload/images/20190919/20120107gyhW13GOmO.png)

1. router是SPA的框架切換頁面重要的工具，所以先讓Angular CLI建立好，節省之後自己建立的時間，在這邊我選擇 Yes。
2. 問喜歡哪一種格式的樣式就是個人喜好的問題，你可以選擇最原始的CSS，也可以選擇其他樣式再讓Angular幫你轉譯成CSS，純粹憑習慣選擇。在此我選擇SCSS。






等到專案啟動完成之後，進入專案資料夾
```
cd todolist-iron
```


啟動本機伺服器

```
ng serve
```

啟動完成之後，在瀏覽器輸入:
```
http://localhost:4200/
```


或是懶一點，輸入參數`-open` 啟動完成之後，自動打開網頁
```
ng serve -open
```

![https://ithelp.ithome.com.tw/upload/images/20190919/20120107nkQShexDOx.png](https://ithelp.ithome.com.tw/upload/images/20190919/20120107nkQShexDOx.png)


看到Angular大大的標誌，代表我們的專案啟動成功，終於踏入Angular的世界啦，接下來我們將繼續探索Angular的世界!

註:新版的CLI修改了起始頁，如果看到這個畫面，同樣也是踏入Angular的世界了!
![https://ithelp.ithome.com.tw/upload/images/20190919/20120107Tuh03hbimt.png](https://ithelp.ithome.com.tw/upload/images/20190919/20120107Tuh03hbimt.png)



# 額外的設定-文字編輯器
開發Angular專案，你可以使用任何一個文字編輯器，像是Sublime、Atom、Webstorm、Notepad++，甚至是windows內建的記事本都可以，只要用得順手的文字編輯器，都是適合的文字編輯器。


但是如果你還沒有喜歡的文字編輯器或想試試看很強大的文字編輯器，那麼推薦使用:[Visual Studio Code](https://code.visualstudio.com) (簡稱VS Code)
VS code整合了很多前端開發很需要且常用的功能，如果功能不能的話，還可以安裝自己所需要的擴充功能。


這裡推薦，可以安裝實用的Angular套件:[angular-extension-pack](https://github.com/doggy8088/angular-extension-pack)
可以直接在VS Code裡面的擴充頁面搜尋Angular之後，看到作者為Will 保哥的套件之後點擊 `Install` 安裝，裡面整合很多開發Angular 非常好用的工具，可以加快開發的速度。


![https://ithelp.ithome.com.tw/upload/images/20190919/20120107fT8ivKAwux.png](https://ithelp.ithome.com.tw/upload/images/20190919/20120107fT8ivKAwux.png)



