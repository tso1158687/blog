---
title: (DAY-8) Angular元件的互動-元件的輸入與輸出@Input, @Output-Angular 與 Nestjs 共舞
date: 2019-09-24 16:29:29
tags: [angular]
---
在第二篇，為什麼選擇選擇Angular的文章提到，Angular的其中之一個優點是高度模組化，可以像樂高一樣，高度與其他元件結合與抽離。而高度模組化的訣竅在於，每一個元件都是一個獨立的個體，可以決定有什麼元件的資料可以輸入:同樣地，也可以決定有什麼元件的資料或方法可以輸出。


如何設計元件的輸入與輸出，將會影響到元件的模組化的實用性與可維護性，因此本篇將要來探討如何設計元件的輸入與輸出。


# 準備新的元件
本篇的教學例子還是使用英雄的例子為例繼續：
```
  heros = [
    { name: ‘兩津勘吉', age: 35 },
    { name: '秋本麗子', age: 25 },
    { name: '野比大雄', age: 12 },
    { name: '江戶川柯南', age: 8 }
  ];
```


在先前的例子當中，都將所有的內容寫在`app.component之中`
![https://ithelp.ithome.com.tw/upload/images/20190924/20120107Z6Fff4AZRA.png](https://ithelp.ithome.com.tw/upload/images/20190924/20120107Z6Fff4AZRA.png)



這個頁面可以分為兩個部分，一個是輸入英雄資料、加入英雄的部分，如上圖圖片紅色線條框起來的部分;另外一個部分是下方顯示英雄的部分。
現在要將紅色框起來的部分，也就是輸入英雄、加入英雄的部分獨立出來到新的元件，我們稱這個元件為`hero component`
![https://ithelp.ithome.com.tw/upload/images/20190924/20120107epX6fSweC7.png](https://ithelp.ithome.com.tw/upload/images/20190924/20120107epX6fSweC7.png)





> PS:還記得如何產生元件嗎？
```
ng generate component hero
```


再來將加入英雄部分的html程式碼貼到hero.component.html上面
為了方便辨識，將原本的newHero的物件，更名為inputDefaultHero
`hero.component.html`
```
<p>加入新的英雄：</p>
姓名：<input type="text" [(ngModel)]='inputDefaultHero.name'>
年齡：<input type="text" [(ngModel)]='inputDefaultHero.age'>
<button (click)="addHero()">加入英雄</button>
```

最後將hero component放在app component裡面
`app.component.html`
```
<h1>
    使用ngFor顯示陣列內容
</h1>
<app-hero></app-hero> 
<div *ngFor="let hero of heros">
    <div>
        名字:
        <span [ngSwitch]="hero.age">
            <span *ngSwitchCase="12">
                小英雄
            </span>
            <span *ngSwitchCase="8">
                小小英雄
            </span>
            <span *ngSwitchDefault>
                {{hero.name}}
            </span>
        </span>
    </div>
    <div>
        年齡: {{hero.age}}
    </div>
    ===========
</div>
```

這樣就完成準備動作，成功地將原本的元件內容分離開來，放到新的元件裡面，讓整個畫面看起來和原本的一模一樣。只不過現在元件之間，並沒有溝通的方式，所以沒有辦法將hero component新增的內容傳送出去給app component。同樣也沒有辦法從app component將資料輸入到hero component。


# 將資料輸入元件
要讓外部元件的內容輸入到元件裡面，Angular有一個稱為`@Input的裝飾器`，可以讓你從外部輸入到資料到元間裡面
> 如果沒有聽過裝飾器的人也不用太多擔心，先能用再說，之後再知道它是什麼也不遲，可以想像是一個function，幫我們處理了一些事情


首先先在`hero.component.ts`匯入Input
```
import { Component, OnInit, Input } from '@angular/core’; // 匯入Input
```

在元件裡面寫了輸入的資料，在本元件裡面要如何稱呼，在這裡為了方便觀察變化，將輸入的資料稱為inputDefaultData
```
export class HeroComponent implements OnInit {
    @Input() inputDefaultHero //@Input() 裝飾器表示資料從外部輸入

    constructor() { }

    ngOnInit() {
        console.log('取得從外部元件的資料')
        console.log(this.inputDefaultHero)
    }
}
```
為了方便檢視資料的狀態，還另外在`ngOnInit`，也就是元件啟動時下了兩個console，給大家看看資料的狀態。


接著回到app component
在`app.component.ts`裡面，先定義好一組新的英雄
```
newHero = { name: '漩渦鳴人', age: 15 }
```

再來到`app.component.html`設定要輸入什麼資料，在這裡要輸入的資料是newHero這個物件
```
<app-hero [inputDefaultHero]="newHero"></app-hero> //輸出newHero物件到hero component之中
```
將newHero物件輸入到hero component之中，而hero component將由inputdefaultHero的屬性去接收到newHero物件的資料。


這麼一來就可以看到newHero物件輸入到hero component成功囉

![https://ithelp.ithome.com.tw/upload/images/20190924/20120107ZaByJcITjE.png](https://ithelp.ithome.com.tw/upload/images/20190924/20120107ZaByJcITjE.png)


# 將資料輸出元件
在hero component裡面輸入要新加入的英雄資料之後，要輸出到app component接收資料，並且新增到英雄列表當中。
和input相對就是output
同樣要先在`hero.component.ts` 匯入output相關功能
```
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; //匯入Output 和 EventEmitter
```
有沒有注意到，除了匯入Output還匯入了一個稱為EventEmitter的東西。因為Angular的設計，將元件的東西匯出都當成一個事件來處理，因此我們需要匯入EventEmitter幫我們處理匯出的事件。
因此定義了一個 `outputAddHero` 的事件，並且讓它等於一個要輸出的事件
```
export class HeroComponent implements OnInit {
  @Output() outputAddHero = new EventEmitter<any>() // @Output()裝飾器 表示這是一個要輸出的事件
  @Input() inputDefaultHero

  constructor() { }

  ngOnInit() {
    console.log('取得從外部元件的資料')
    console.log(this.inputDefaultHero)
  }
  addHero() {
    console.log('將元件的資料output傳送出去')
    this.outpuftAddHero.emit(this.inputDefaultHero)
    this.inputDefaultHero = { name: '', age: '' }
  }
}
```
在點擊`加入英雄`的按鈕後，會觸發addHero的function，這時將新英雄的資料` inputDefaultHero `當成事件的參數傳遞出去。


接著回到app component
在`app.component.ts`，元件的資料以事件的形式傳送出來，因此同樣也要以事件的形式來接收傳送出來的資料，將接收的事件稱為`getNewHeroFromAnotherComponent`
```
  getNewHeroFromAnotherComponent(newHero){ // 資料以參數的形式傳送出來，同樣也要以參數的形式接住
    console.log('app component')
    console.log(newHero)
    this.heros.push(newHero)
  }
 ```
資料以參數的形式傳送出來，同樣也要以參數的形式接住，因此newHero的參數，就可以順利接受到新英雄的資料，而將新英雄的資料推到英雄陣列當中，並且顯示出來。


回到`app.component.html`，同樣要設定好，發送出來的事件要由誰接收。
```
<app-hero [inputDefaultHero]="newHero" (outputAddHero)="getNewHeroFromAnotherComponent($event)"></app-hero> //別忘了$event參數，不然接收不到傳送出來的資料
```
hero component的outputAddHero的事件傳送出來後，會由我們剛剛定義的 getNewHeroFromAnotherComponent的事件接收到資料


最後就來試試看加入英雄的功能有沒有將新英雄加入到列表當中吧
![https://ithelp.ithome.com.tw/upload/images/20190924/20120107UtcsskJahx.png](https://ithelp.ithome.com.tw/upload/images/20190924/20120107UtcsskJahx.png)



# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d8?file=src/app/app.component.ts)
本篇範例寫了一些console.log可以讓大家看看元件之間的互動狀況，可以點選下面的小箭頭看看console的內容
![https://ithelp.ithome.com.tw/upload/images/20190924/20120107QfKpT4v2Zk.png](https://ithelp.ithome.com.tw/upload/images/20190924/20120107QfKpT4v2Zk.png)

# 小結
今天學到的事情有：
* 為何需要元件的互動
* 如何使用＠Input將資料輸入元件
* 如何使用@Output搭配EventEmitter將元件的資料發送出去
* 實際應用元件的輸入與輸出的功能




元件的內容就在這邊告一段落，明天將會進入新的章節