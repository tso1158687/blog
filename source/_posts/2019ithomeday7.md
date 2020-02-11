---
title: (DAY-7) Angular的事件綁定介紹與應用-Angular 與 Nestjs 共舞
date: 2019-09-23 16:21:33
tags: [angular]
---
在前幾邊介紹到`插值法`、`ngFor`、`ngIf`、`ngSwitch`等等方法，最主要都是顯示資料的應用。最後介紹到雙向綁定-ngModel，修改資料時會修改綁定的資料外，也會修改畫面顯示的資料。現在要更進一步，把`ngModel`修改的資料推送到原始的資料陣列，就要使用事件方法來修改

# 事件綁定

事件綁定會偵聽某些事件，比如按鍵、滑鼠移動、點選等等
下圖取自於Angular官網
![https://ithelp.ithome.com.tw/upload/images/20190923/20120107zZLJ4VI6vB.png](https://ithelp.ithome.com.tw/upload/images/20190923/20120107zZLJ4VI6vB.png)

事件綁定使用掛號（）表示綁定的事件，括號裡面表示綁定事件的類型，例如上圖為綁定點擊事件。右邊為事件應該出發的方法，方法會定義在ts檔案裡面的function裡面。
因此，上面這個圖片就是這樣子：
有一個Save的按鈕，綁定著click事件，如果使用者點擊這個按鈕，則會觸發onSave的function。


Angular所綁定的事件，除了`點擊(click)`事件以外，支援`所有DOM事件`，像是：`失去焦點(blur)`、`滑鼠移入(mouseover)`、`滑鼠移出(mouseout)`等等事件。


# 事件綁定的應用
了解事件綁定的用法之前，還是繼續之前的英雄的例子，再來看到昨天的英雄們：
```
  heros = [
    { name: '兩津勘吉', age: 35 },
    { name: '秋本麗子', age: 25 },
    { name: '野比大雄', age: 12 },
    { name: '江戶川柯南', age: 8 }
  ];
```
昨天還有使用ngModel，做一個雙向綁定的輸入框：
![https://ithelp.ithome.com.tw/upload/images/20190923/20120107u8BRUWZ5ZH.png](https://ithelp.ithome.com.tw/upload/images/20190923/20120107u8BRUWZ5ZH.png)



今天要來為輸入框新增一個”加入英雄"按鈕，將新的英雄加入英雄列表當中。
## 加入新的英雄
每個英雄的需要名字和年齡，因此我們新增兩個輸入框，一個填寫新英雄的姓名，一個填寫新英雄的年齡


另外還要新增一個”加入英雄”的按鈕，準備透過點擊按鈕加入新英雄。
`html`
```
<p>
加入新的英雄：
</p>
姓名：<input type="text" [(ngModel)]='newHero.name' >
年齡：<input type="text" [(ngModel)]='newHero.age' >
<button>加入英雄</button>
```



在輸入框input裡面，利用上一篇所學到的`ngModel`綁定輸入的值。利用一個newHero的物件，去儲存新英雄的姓名和年齡。


再來為按鈕加上click點擊事件，並且指定點擊之後，觸發addHero事件
```
<p>
加入新的英雄：
</p>
姓名：<input type="text" [(ngModel)]='newHero.name' >
年齡：<input type="text" [(ngModel)]='newHero.age' >
<button (click)="addHero()">加入英雄</button> // 加入點擊事件，點擊後觸發addHero事件
```



再來到元件的ts檔案事件
`typescript`


新增事件之前，別忘記先定義我們用來新增英雄的物件newHero：
```
newHero={name:'',age:''}
```

新增事件：
```
addHero() {
    this.heros.push(this.newHero)
    this.newHero={name:'',age:''}
}
```

addHero事件觸發之後，將newHero物件內容推到heros物件裡面，之後再將newHero物件的內容清空
hero物件裡面如果有新內容，ngFor的指令便會更新，將新內容顯示出來（ngFor檢測到新內容的機制稱為`ngZone`，不過這個不在我們的討論範圍


如此一來，新增英雄的流程就完成了啦
輸入姓名及年齡，點擊加入英雄的按鈕之後，便會加入到列表之中。
![https://ithelp.ithome.com.tw/upload/images/20190923/20120107t6ToYvMNkk.png](https://ithelp.ithome.com.tw/upload/images/20190923/20120107t6ToYvMNkk.png)



# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d7?file=src/app/app.component.ts)
# 小結
今天學到的事情有：
* 認識事件綁定
* 事件綁定如何與ngModel 結合