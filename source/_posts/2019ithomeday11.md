---
title: (DAY-11) Angular-RXJS非同步事件的好幫手-Angular 與 Nestjs 共舞
date: 2019-09-27 16:40:12
tags: [angular]
---
在上一篇，使用httpClient取得API資料的時候，看到一段陌生的程式碼
```
  ngOnInit() {
  //  this.heros = this.dataService.getData()
    this.dataService.getData().subscribe(res => {
      console.log(res) //可以打開console看看資料室什麼
      this.heros = res.data
    
    })
  }
```
在上一篇提到`subscribe`是RXJS處理非同步事件的語法，必須要有訂閱(subscribe)才會處理非同步事件。

在這一篇，我們要來討論上一篇提到的。
`呼叫API取得資料`就會將事情變得比較複雜。就得面對然後處理以下兩件事情:
1. 處理AJAX行為
2. 處理非同步事件



第二點，要如何好好地處理非同步事件。再好好地處理非同步事件之前，就先必須了解什麼是RXJS。

# 什麼是RXJS?

先來看看官網如何介紹RXJS:
> An API for asynchronous programming with observable streams

在這裡可以看到幾個關鍵字：`asynchronous`、`observable`、`streams`，將會從這幾個關鍵字，簡單快速介紹RXJS

## asynchronous (非同步、異步)

在真實的前端世界，要取得任何資料或是資訊的動作都是非同步(Asynchronous)。比如說我們希望拿到一個檔案，要先發送一個請求，然後必須等到檔案回來，再執行對這個檔案的操作。這就是一個非同步的行為，而隨著網頁需求的複雜化，我們所寫的 JavaScript 就有各種針對非同步行為的寫法，例如使用 callback 或是 Promise 物件甚至是新的語法糖 async/await —— 但隨著應用需求愈來愈複雜，撰寫非同步的程式碼仍然非常困難。

## streams (資料流)
什麼是資料流，來看看維基百科對於資料流的定義:
> A stream is a sequence of data elements made available over time. A stream can be thought of as items on a conveyor belt being processed one at a time rather than in large batches. — Wikipedia

也就是說，資料流就是`時間序列上的一連串資料事件`(資料會依照時間先後順序排序，而非直接當作一整大包資料處理)

資料的先後順序是一件很重要的事情
先後順序非常重要，不可以插隊


將資料流的觀念套到前端，如何獲得資料流?
* 來自一筆或多筆資料
* 來自陣列的資料
* 來自事件(ex:點擊事件)
* 來自Promise
* …….更多



## observable (觀察者)
什麼是觀察者，就必須先提到`觀察者模式(Observable Pattern)`
觀察者模式就是:
`當Observable（可被觀察的對象）發生事情，Observer(觀察者）就可以做出反應。`

所以觀察者模式一定要有可被觀察對象。當有人(稱為觀察者)想要呼叫可被觀察對象，這個動作就會稱為`訂閱(Subsribe)`

如果以生活中的例子舉例:
* 我想要看報紙，要先跟報社訂報紙才會收到報紙
* 訂閱或按讚某個粉絲團，當粉絲團有新消息才會通知我



在兩個例子中，誰是可被觀察對象(Observable)?誰是觀察者(Observer)?如果想通了，就可以掌握觀察者模式的概念了。

再次將觀察者模式的觀念套用到前端，前端如何實行觀察者模式?

### 可被觀察對象 (Observable)
當變數或資源發生變動時，由變數或資源自動告訴我發生變動了
* 當發生變動 => 非同步：不知道什麼時候發生變動，反正就是發生變動跟我說
* 由變數自動告知我 => 不必煩惱要如何告訴我程式碼變動



### 觀察者 (Observer)
當Observable發生變動，觀察者可以做的事情:
* next=>成功的時候做什麼
* error=>失敗的時候做什麼
* completed=>不論成功或失敗，都要做什麼



### 訂閱 (subscribe)
監聽Observable的動作稱為訂閱 (subscribe)，有可被觀察對象，要有觀察者訂閱才會產生動作
例如:一個乏人問津的粉絲團，沒有人按讚或沒有人訂閱，自然不會有人收到粉絲團的最新消息。

# 小結
今天學到的事情有：
* 什麼是RXJS
* 什麼是asynchronous (非同步、異步)
* 什麼是streams (資料流)
* 什麼是observable (觀察者)

明天將進入RXJS實際應用