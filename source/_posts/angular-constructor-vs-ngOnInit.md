---
title: 實驗探討angular中的constructor與ngOnInit有什麼差別
date: 2020-03-02 16:02:23
tags: [angular]
---
Angular中的元件(component)啟動的時候，分別會觸發兩個事件:
- constructor
- ngOnInit
constructor是javascript中`class`產生出來時候會執行的建構式
ngOnInit則是Angular眾多`生命週期`中的其中之一，會在元件(component)啟動的時候觸發，

針對這兩個來做個簡單的實驗與比較。
## 比較一：元件啟動的時候，ngOnInit和constructor啟動順序
分別對ngOnInit和constructor下console觀察兩者顯示的先後順序
```
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor() {
    console.log('constructor啟動了')
   }
  ngOnInit() {
    console.log('ngOnInit啟動了')
  }
}
```
看一下測試結果:
{% asset_img oninitvsconstructor1.png %}

### 小結一
呼叫順序為constructor先再ngOnInit

## 比較二:分別在constructor和ngOnInit賦予變數值
先定義三個變數，分別都給予初始值文字"noValue"
```
normalValue='noValue'
constructorValue="noValue"
ngOnInitValue="noValue"
```
將三個變數顯示在頁面上面
```
normalValue的值:{{normalValue}}

constructor的值:{{constructorValue}}

ngOnInit的值:{{ngOnInitValue}}
```

{% asset_img oninitvsconstructor2.png %}

接下來，分別在不同階段賦予這三個變數其他文字，如果是從constructor賦值，顯示文字:「從constructor取值」；同樣地，如果從ngOnInit賦值，顯示文字:「從ngOnInit取值」

```
export class TestComponent implements OnInit {
  normalValue='noValue'
  constructorValue="noValue"
  ngOnInitValue="noValue"
  constructor() {
    console.log('constructor啟動了')
    this.constructorValue='從constructor取值'
    this.normalValue='從constructor取值'
   }
  ngOnInit() {
    console.log('ngOnInit啟動了')
    this.ngOnInitValue='從ngOnInit取值'
    this.normalValue='從ngOnInit取值'
  }
}
```

看一下結果:
{% asset_img oninitvsconstructor3.png %}

### 小結二
不論在constructor或在ngOnInit賦值都是沒有問題的。
如果在constructor和ngOnInit連續賦值的話，就會依照小結一的結論照順序賦值，最後得到ngOnInit給予的值。

## 比較三:從外部輸入值到元件當中
元件的值可以使用`@Input`方法，從外部輸入數值。
例如，從外部輸入變數name的值為「Angular」，分別在constructor和ngOnInit下console觀察變數name的狀態
```
export class ChildComponent implements OnInit,OnChanges {
  @Input() name
  child
  constructor() {
    console.log(this.name)
   }

  ngOnInit() {
    console.log(this.name)
  }
}
```

看一下結果:
{% asset_img oninitvsconstructor4.png %}

constructor取不到變數內容，是undefined；而ngOnInit正確取到輸入的內容。

從這個比較可以推論出，因為元件的內容輸入的時機涉及Angular元件的設計，所以將納入Angular的生命週期裡面，但是constructor僅是class中的方法，不在Angular的掌控範圍之內，無法得到Angular生命週期的內容。

### 小結三
如果從外部輸入內容，因為牽涉到Angular的生命週期，內容必須在ngOnInit裡面取得，無法在constructor取得

## 比較四:從注入的服務取得服務資料
元件的值也可以從`服務(service)`取得，於是建立一個服務，並且建立一個方法，會返回一串文字「get something from service」
在此建立兩個變數「serviceContentA」和「serviceContentB」，分別在constructor和ngOnInit呼叫服務並且賦值，觀察是否能正確取得值
```
export class ChildComponent implements OnInit,OnChanges {
  serviceContentA
  serviceContentB
  constructor(
    private appService:AppService
  ) {
    this.serviceContentA=appService.getSomethingFromService()
    console.log('serviceContentInConstructor:',this.serviceContentA)
   }

  ngOnInit() {
    this.serviceContentB=this.appService.getSomethingFromService()
    console.log('serviceContentInngOnInit:',this.serviceContentB)
  }
}
```
看一下結果
{% asset_img oninitvsconstructor5.png %}

### 小結四
服務不論在constructor或ngOnInit賦值，都可以正確取得值

結論:

- 觸發順序為construcor再ngOnInit
- 元件內部都操作，例如：在元件內部賦值或是從服務取值，不論在constructor或ngOnInit是沒有差別的
- 元件外部輸入內部的操作，例如：使用`@Input`方法，只有ngOnInit可以正確取到值

因此ngOnInit和constructor雖然都會在啟動時觸發，推薦各自最安全也最不會出問題的使用時機。
- ngOnInit:處理預設值與初始動作
- constructor:處理注入各種元件的工作，避免處理注入以外的工作。因為不在Angular生命週期裡面，Angular掌握不到。



本次實驗的範例[程式碼](https://stackblitz.com/edit/angular-ngoninit-vs-constructor?file=src%2Fapp%2Fchild%2Fchild.component.ts)



