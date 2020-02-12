---
title: (DAY-19) Angular架構與學習資源介紹-Angular 與 Nestjs 共舞
date: 2019-10-05 16:40:12
tags: [angular]
---
終於來到介紹Angular的尾聲。可能會產生一個疑問，為什麼不是在一開始的時候介紹Angular的架構，難道是架構不重要嗎？

我的回答是：不，`架構非常重要`。但是要對Angular產生興趣更重要
本系列文希望可以在不需要太多先備知識的情況下，可以快速體驗到Angular強大的地方，對Angular產生興趣之後，再來研究比較枯燥但卻非常重要的基礎部分

這是AngularCLI產出來的專案結構
![https://ithelp.ithome.com.tw/upload/images/20191005/20120107AhAP5vRPqC.png](https://ithelp.ithome.com.tw/upload/images/20191005/20120107AhAP5vRPqC.png)

- e2e
處理整個專案測試的資料夾，在本次我們不會講到有關於測試的部分
- node_modeules
透過npm install所安裝的相依套件
- src
Angular專案最主要的地方，等下會在下方再詳細講解這個資料夾
- .editorconfig
對於專案的編輯器設定選項，例如：縮排要以tab縮排或是以空白鍵縮排
- .gitignore
設定什麼檔案不會進入版本控制，例如；node_modules資料夾就不會被版本控制
- angular.json
紀錄Angular的專案設定，例如：Angular專案進入點在哪裡、外部樣式的設定、編譯成正式或測試產品的編譯選項等等
- browserlist

- karma.conf.js

- package-lock.json
紀錄開發者實際在nom install 安裝相依的套件實際安裝的內容與版本
- package.json
紀錄專案的基本資訊，例如專案的名稱、版本，還有專案會使用到的相依套件等等資訊
- README.MD
關於我的檔案，一般來說來說會寫下關於這個專案的相關說明，使用markdoen格式
- tsconfig.app.json
Typescripe編譯成Javascript時的編譯設定
- tsconfig.json
Typescripe編譯成Javascript時的編譯設定
- tsconfig.spec.json
測試檔案
- tslint.json
Typescript的語法檢查設定，專案建立時，已經使用Typescript的推薦設定。tslint可以幫你做靜態程式碼分析，
例如:function名稱是不是打錯（常見大小寫錯字或是拼錯字）、變數適不適和定義的型別一致，變數定義為數字，卻指定為字串等等
這些錯誤tslint都會幫你找出來，提升攥寫程式碼的品質。

# src資料夾裡面
![https://ithelp.ithome.com.tw/upload/images/20191005/20120107fqDwYjYTOx.png](https://ithelp.ithome.com.tw/upload/images/20191005/20120107fqDwYjYTOx.png)

- App-routing.module.ts
管理整個專案最高層級的路由設定
- App.component.html
最主要元件的html檔案
- App.component.scss
最主要元件的樣式檔案，其作用範圍僅在這個元件的內容
- App.component.spec.ts
最主要元件的測試檔案，在本次主題將不會討論到測試
- App component.ts
最主要元件的邏輯檔案
- App.module.ts
整個專案最主要的根模組
- Assets
翻譯為中文為資產，也就是放一些雜七雜八的檔案的地方，例如：圖片、多媒體案等等的地方
- Environments
設定整個專案的環境變數的地方，可以為測試環境和正視環境加上整體全域不同的環境變數
- Favicon.ico
網站的icon，預設是Angular的圖示，如果不喜歡就可以把他替換掉
- index.html
網站的主要入口，一般來說不太會更動到此頁面
- Main.ts
angular程式的進入點，一般來說也不太會去修改這個程式
- Polyfills.ts
pollyfill是負責幫助angular去支援比較舊版的瀏覽器，可以載入pollyfill的特性讓舊瀏覽器也可以支援新式瀏覽器所支援的特性
- Style.scss
整個專案最主要的樣式檔，樣式檔的設定為全域通用
- Test.ts
寫測試專用的檔案，在本次主題將不會討論到測試

在前篇文章介紹Angular的優點時有提到，Angular是個高度模組化的框架，可以像樂高一樣自由組合。而組合的基本單位稱為元件 （Component），一個元件裡面通常會包含三個檔案：
- *.component.html
- *.component.ts
- *.component.scss

如果有設定需要測試的話會再多一個
- *.component.spec.ts

Angular系列的基礎介紹在此告一段落。先前的介紹已經足以建構符合大部分需求的頁面，但是還是有很多基礎而且很厲害的觀念沒有提到。例如:什麼是`NgModule`、Angular的`生命週期(life circle)`等等。
因此在這邊推薦Angular的學習資源，可以學習到更多Angular的知識、架構、觀念。
* [Angular 官網 -  英文](https://angular.io/)
* [Angular 官網 -  簡體中文](https://angular.cn/)
* [Angular 官網 -  正體中文](https://angular.tw/)
* [Angular Taiwan](https://www.facebook.com/groups/augularjs.tw/) - 台灣Angular 社群（裡面很多很厲害的神人）
* [台灣Angular 技術論壇](https://forum.angular.tw)
* [Angular Taiwan](https://www.youtube.com/channel/UCIawWId4sXgkVZ_mCF25qGw) (Youtube) - 很多分享與教學影片 

另外要推薦一下，每年都會舉辦Angular Conference ，有很多有趣實用的主題，有興趣也可以去看看
[NG-TW 2019](https://www.accupass.com/go/ngtw2019)
