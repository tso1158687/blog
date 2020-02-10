---
title: (DAY-4) 建立元件與認識元件
date: 2019-09-20 23:33:21
tags: [angular]
---
# 利用Angular CLI建立Component


在Angular專案裡面輸入：

```
ng generate component <componentName>
```


如果覺得單字太長太麻煩記不起來的話也可以使用縮寫，取`第一個字母`

```
ng g c <componentName>
```


請記得：component    的命名請使用`小駝峰命名（lower camelCase）`，也就是首字小寫，中間的單詞請勿使用破折號，使用大寫字母緊密結合
(X) 錯誤例子：hello-wrold
(X) 錯誤例子：HelloWorld

(O) 正確例子：helloWorld


在這裡，我建立一個稱為`main`的component

```
ng generate component main
```


建立完成之後，就會看到app資料夾下面建立一個main的資料夾，資料夾裡面包包含這些基本的檔案

![https://ithelp.ithome.com.tw/upload/images/20190920/201201074mo20eqIol.png](https://ithelp.ithome.com.tw/upload/images/20190920/201201074mo20eqIol.png)




打開`main.component.ts`看看主要的邏輯控制頁面

```
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```


這是一個新建立的空白component的樣子，可以看到有一個`＠Component`的裝飾器，聲明這是一個component的元件，並且輸入一些元件的資本資訊
1. `selector`:這個元件的名稱
2. `templateUrl`:這個元件的html頁面所在路徑位子
3. `styleUrls`:這個元件使用的樣式檔案位置，可以指定多個樣式檔案。指定的樣式檔案就的作用域僅止於這個component，例如Ａcomponent的樣式只會在Ａ component生效，不會在Ｂcomponent生效，如果想要讓樣式共用，請將樣式定義在全域的style.scss


再來可以看到主要的部分-MainComponent
MainComponent是一個class最後會匯出在其他的地方使用，這個就是所謂的模組化的設計。接下來看看class裡面包含了什麼。可以看到兩個function
* constructor:javascript原生物件建立時會啟動的建構式，通常會在建構式裡面注入一些從外部進來的服務
* ngOnInit:Angular內建的生命週期元件，在Angular元件啟動時，會呼叫的function，通常會在這裡指定一些的初始值或是呼叫的function。


# 將元件加入頁面
將main component放到app component裡面
打開`app.component.html`輸入:
```
<app-main></app-main>
```
![https://ithelp.ithome.com.tw/upload/images/20190920/20120107yNfAtmgjCp.png](https://ithelp.ithome.com.tw/upload/images/20190920/20120107yNfAtmgjCp.png)
重新整理，就可以看到main works，表示main component成功放進來了

![https://ithelp.ithome.com.tw/upload/images/20190920/20120107ABE8Ussl8V.png](https://ithelp.ithome.com.tw/upload/images/20190920/20120107ABE8Ussl8V.png)
接下來開始修改一下寫點有趣的東西在上面吧!


`main.component.ts`
```
export class MainComponent implements OnInit {
  name = 'jason'; // 宣告一個新的屬性
  constructor() { }

  ngOnInit() {
  }

}
```

`main.component.html`

```
<p>
  我的名字是 {{name}}
</p>
```
![https://ithelp.ithome.com.tw/upload/images/20190920/20120107WZlXY7lwsS.png](https://ithelp.ithome.com.tw/upload/images/20190920/20120107WZlXY7lwsS.png)




# 資料綁定
使用花括號 (` {{ }} `)可以綁定資料，這是Angular綁定顯示資料的方法。


除了綁定顯示的資料以外，還有屬性的綁定與雙向的資料綁定，明天會來談談如何綁定資料用處理資料的方法


# 小結


今天學到:
* 如何使用 Angular CLI 建立元件
* 認識元件內的結構
* 將元件加入頁面
* 修改元件，並做簡單的資料綁定