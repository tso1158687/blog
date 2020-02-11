---
title: (DAY-9) Angular的服務(Service)-存取資料的好幫手-Angular 與 Nestjs 共舞
date: 2019-09-25 16:40:12
tags: [angular]
---
在前幾篇，一直在討論元件(component)的各種應用。元件顯示資料的各種方法，以及最後討論到元件的資料要如何輸入與輸出。元件的討論在此告一段落，這一篇要來討論不一樣的主題-`服務(Service)`


# 為什麼需要服務
試著回想前幾篇在討論元件的時候，我們討論了什麼?
* 使用花括號(`{{ }}`)顯示綁定的資料
* 使用`ngFor`顯示多筆大量的資料
* 使用`ngIf`控制資料顯示與否
* 使用`ngSwitch`控制不同情境資料顯示的不同方式
* 使用括號`()`綁定畫面上的事件
* 使用`@Input` 與`@Output`控制資料在元件的進出
有沒有發現，當我們在討論元件的時候，都只有討論到要如何要如何顯示資料，顯示資料的各種方法與如何觸發事件去改變顯示的資料。`完全沒有討論到如何取得資料`，因為本來就不應該這麼做。


沒有討論到如何取得資料的原因是，`元件的職責本來就應該聚焦在如何顯示資料`。元件不應該直接取得資料或儲存任何資料，如果要取得或儲存資料，應該將這項工作交給專門做這件事情的`服務(Service)`


# 如何建立服務
建立服務和建立元件的指令非常類似，只要將component替換成service就好了
```
ng generate service <serviceName>
```


# 服務介紹
一個空白的服務建立起來，會長這樣。在這裡建立一個稱為data的服務
```
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root',})
export class DataService {
  constructor() { }
}
```

看起來和空白的元件非常相似，有一點不一樣的差別之處在於:
* `@Injectable({ providedIn: 'root',})` 多了這個裝飾器。意思就是這個服務是可以在任何地方地方使用的，不論哪一個元件都可以使用這個服務。這個裝飾器是一個很重要的宣告，不過一開始先不必太過在意。
* 少了元件`OnInit`等生命週期。因為服務不是負責顯示畫面的，自然不會有畫面顯示需要的生命週期。
# 如何讓元件(component)取得服務(service)的資料


直接繼續使用英雄的資料作為示範。
```
  heros = [
    { name: ‘兩津勘吉', age: 35 },
    { name: '秋本麗子', age: 25 },
    { name: '野比大雄', age: 12 },
    { name: '江戶川柯南', age: 8 }
  ];
```
原本這些都是寫在component裡面的資料，現在了解元件的職責之後，我們應該將這些資料移到服務存放，讓元件透過服務去取得資料。


## 建立服務與回傳資料的方法
建立一個DataService去存放英雄資料:

`data.service.ts`
```
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root',})
export class DataService {
  heros = [
    { name: '兩斤勘吉', age: 35 },
    { name: '秋本麗子', age: 25 },
    { name: '野比大雄', age: 12 },
    { name: '江戶川柯南', age: 8 } //宣告英雄的資料
  ];
  constructor() {}
  getData(){
    return this.heros; //呼叫getData的方法的時候，回傳英雄的資料
  }
}
```
一樣先定義英雄的資料，並且新增一個方法-`getData()`，如果有人呼叫這個方法，就會回傳英雄的資料。


## 在元件裡宣告服務並取得資料
`app.component.ts`
首先將dataService匯入
```
import { DataService } from './data.service'
```

再來將服務注入元件之中
```
export class AppComponent  implements OnInit {
  constructor(
    private dataService:DataService //在class載入時，呼叫建構式跟他說我會用到dataService
  ){}
  newHero = { name: '漩渦鳴人', age: 15 }
  heros

  ngOnInit() {
   this.heros = this.dataService.getData()
  }
  getNewHeroFromAnotherComponent(newHero){
    console.log('app component')
    console.log(newHero)
    this.heros.push(newHero)
  }
}
```


1. 在class載入時，呼叫建構式跟他說我會用到dataService，因此將dataservice的內容載入進來。前面有一個private，這是一個修飾子，表示只個這個元件可以存取這個服務
2. 同樣宣告heros的變數
3. 在元件啟動的時候，呼叫服務的getData()方法取得資料
如此一來，就順利從dataService取得英雄的資料了!



# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d9?file=src%2Fapp%2Fdata.service.ts)

# 小結
今天學到的事情有：
* 為什麼需要服務
* 如何建立服務
* 如何讓元件透過服務取得資料
