---
title: angular的input和output
date: 2018-04-16 00:36:22
tags: [angular]
---
angular的基本精神就是就是把每個不同的功能都拆成一個個元件(component)，就像樂高積木一樣，不管要組成什麼模型，都是一塊一塊磚堆砌起來，最終再將不同部位組合成一個完善的成品。像這樣拆成一個個小的元件有很多好處，例如:每一個元件的東西都不多，因此維護的時候比較容易；另外，每一個元件都是獨立的，因此在修改元件時，不需要擔心會影響到其他的元件，唯一需要做的是，要讓各個元件之間的溝通管道暢通，因此元件之間如何傳遞資料就是一件非常重要的事情了。

### 範例說明
本次範例以父元件`parent.html`和`parent.ts`與子元件`child.html`和`child.ts`兩個元件之間的資料傳遞做說明。

### parent.ts
首先先搞定`parent.ts`

```
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // 設定初始值
    showValueFromChild = '如果子元件傳送資料出來就會改變';
    parentValue = '我是父元件';

    // 父元件得到output資料要執行function
    // event為output傳出的資料
    getChildValue(event) {
    this.showValueFromChild = event;
    }
}
```

首先先將初始值設定好
showValueFromChild:是從子元件獲得資料之後，將獲得的資料綁定在父元件上
parentValue:設定父元件的值，之後要傳到子元件裡面，供子元件接收使用

另外還有一個function
getChildValue:子元件output出來的東西。子元件output出來的東西不成直接設定一個值綁定，而必須以`function`的形式處理。output出來的東西都會帶一個參數，裡面有傳送出來的資料，如果需要使用傳送出來的資料就可以帶一個`參數`在其中，例如本範例的event。只要有資料傳送出來，馬上就與showValueFromChild綁定，顯示子元件的資料。

## parent.html

```
<hr>
<h1 style="color:red">我是父元件</h1>
<hr>
<div>
    <h3>
    在父元件輸入改變子元件的內容
    </h3>
    <input type="text" [(ngModel)]="parentValue">
</div>
<hr>
<div>
    <h3>
    在父元件顯示子元件的內容
    </h3>
</div>

<div style="color:blue">
{{showValueFromChild}}
</div>
</div>
<hr>
    <h1 style="color:red">
    我是子元件
    </h1>
<hr>
<!-- $event可獲得output傳出來的資料 -->
<app-child [valueFromParent]="parentValue" (getOutputValueFromChild)="getChildValue($event)"></app-child>
```

再來是parent.html，這一頁是我們最終要看到成果的頁面。
第一個26行最重要的就是引入子元件，有子元件才有辦法和父元件互動，先暫時不要理會app-child裡面的設定。
再來使用input，並且使用ngModel將輸入的資料綁定到剛剛設定的parentValue上面
最後div裡面放置{{showValueFromChild}}為顯示子元件資料的地方

### child.ts

```
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
     selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
    // 設定初始值
    childOutputValue = '我是子元件';
    // 新增一個要傳送出去的發射器
    @Output() getOutputValueFromChild = new EventEmitter();

    // 獲得父元件input進來的資料
    @Input() valueFromParent;
    
    constructor() {}

    ngOnInit() {}
    getOut() {
        this.getOutputValueFromChild.emit(this.childOutputValue);
    }
}
```

進入子元件的設定，首先是child.ts
同樣先設定初始值
childOutputValue:設定子元件的值，之後要output到父元件

再來就是子元件跟父元件比起來比較不一樣的地方，有兩個特別的裝飾器`@Output`和`@Input`
先從比較簡單的@Input談起
顧名思義，@Input就是把`外部的內容引進到該元件`，供該元件使用，如範例，將valueFromeParent引入使用。於是就可以在裡面操作valueFromChild。但是有時候引進來之後，可能不想使用原本命名的名稱，想幫他起一個新的名字，這個也是沒問題的。
同樣以範例為例，如果要起一個新的名字，只要把引入的東西寫在括號裡面，新的命名寫在括號之後就可以囉，如@Input('valueFromChild') wow，於是引入的valueFromChild這個值在child.ts裡面就有一個全新的名字wow

再來是比較複雜的@Output，Output比較特別，`必須要透過EventEmitter將資料傳送出去`，姑且就稱為發射器。用一個比較簡單的例子做比喻的話，發射器很像在送貨的宅配人員，主動把東西送到你家，並且在你家樓下呼喊通知你東西到了，你聽到宅配人員呼喊，你才知道東西到了，並且去領取你的東西。發射器就是一個通知父元件東西已經到了的角色。因此在例子當中，我們建立一個發射器叫作getOutputValueFromChild，並且利用getOut的function，將childOutputValue傳送出去。

### child.html

```
<h3>在子元件輸入改變父元件內容</h3>
<input type="text" [(ngModel)]="childOutputValue">
<button (click)="getOut()">出去!</button>
<h3>在子元件顯示父元件內容</h3>
<div style="color:blue">
{{valueFromParent}}
</div>
```

最後就是子元件的chid.html

先建立input，並且利用ngModel綁定childOutputValue，然後在建立一個按鈕，綁定剛剛寫的getOut的function，只要點擊按鈕，就會觸發getOut的function，再觸發裡面的發射器，將input綁定的childOutputValue傳送出去。
再來下面就是顯示綁定從父元件進來資料valueFromParent


### 最重要的input&output設定

基本的設定完成之後，再來就是最重要、先前先忽略的在父元件引入子元件時的設定

```
<app-child [valueFromParent]="parentValue" (getOutputValueFromChild)="getChildValue($event)"></app-child>
```

在這裡，有兩個重要的問題要釐清。
第一:input和output要如何表示、如何分辨?
第二:父元件和子元件的綁定要如何表示、如何分辨?

第一個問題
還記得前面說到，input只能輸入數值，和某個資料綁定，因此必須使用`中括號-[...]`，來`綁定資料`，所以中括號代表input；相反的，output不能輸出數值，只能用發射器傳送出來，傳送出來必須以function的形式處理傳送出來的東西，因此必須以`小括號(...)`，來`處理事件`，所以小括號代表output

第二個問題
還記得ngModel如何綁定元件嗎?

```
[(ngModel)]="xxxxx"
```

左邊是directive，右邊是要綁定在`該元件的內容`。
相同的原理，等號的右邊就是要綁定該元件的內容，而`此處所說的該元件，就是我們操作的父元件`，因此`等號的右邊的內容是針對父元件操作`；相反，`等號的左邊的內容是針對子元件的操作`。

### 總結
以上簡單幾個步驟，就可以完成angular最基本的input和output囉