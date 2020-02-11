---
title: (DAY-6) Angular元件資料的顯示與應用2- ngSwitch, ngModel-Angular 與 Nestjs 共舞
date: 2019-09-22 16:16:01
tags: [angular]
---
在上一篇提到如何使用`ngFor`顯示多筆資料和使用`ngIf` 控制條件決定顯示與否，這一篇要來介紹另一個更加複雜的情況，如果是多個條件的情況要如何控制顯示？


# 使用ngSwitch
ngSwitch就和Javascript的switch一樣。


Javascript的switch語法是這樣:
```
switch(expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
    // code block
}
```

用成簡單的白話來說是這樣：
* 如果情況x的時候做某件事情;
* 如果情況y的時候做某件事情;
* 如果沒有任何一個符合的情況就執行default預設情況。


Angular的ngSwitch用法基本上一樣：
```
<container-element [ngSwitch]="switch_expression">
  <!-- 依照情境的不同顯示不同的元素 -->
  <some-element *ngSwitchCase="match_expression_1">...</some-element>
  <some-element *ngSwitchCase="match_expression_2">...</some-element>
  <!--如果沒有任何一個符合的情況顯示預設的元素 -->
  <some-element *ngSwitchDefault>...</some-element>
</container-element>
```

再繼續以上一篇的例子應用ngSwitch
```
  heros = [
    { name: '兩斤勘吉', age: 35 },
    { name: '秋本麗子', age: 25 },
    { name: '野比大雄', age: 12 },
    { name: '江戶川柯南', age: 8 }
  ];
```

在上一篇有提到，如果未成年的英雄，我們使用`ngIf`隱藏不讓他出現，在這裡改變一下做法，未成年的英雄我們照樣顯示年齡，但是對於名字作保護不顯示出來。因此12歲的大雄顯示小英雄;而8歲的柯南顯示小小英雄。

```
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

![https://ithelp.ithome.com.tw/upload/images/20190922/20120107mlONJjDFTq.png](https://ithelp.ithome.com.tw/upload/images/20190922/20120107mlONJjDFTq.png)


# 使用ngModel執行雙向綁定

到目前為止介紹的事都是如何處理顯示的資料，這都只是顯示資料，這些都只是顯示資料的單向綁定。還需要一個可以輸入與修改英雄的功能，也就是可以輸入什麼，資料就改變成什麼的功能，這樣的功能稱為雙向綁定。
`[(ngModel)] 是 Angular 的雙向資料繫結語法`。


## 匯入 ngModel 所屬的模組-FormsModule
在使用雙向綁定的ngModel之前，得先做一些設定，必須將ngModel的這個功能所屬的`FormsModule`匯入，才可以正常使用。
因此打開根模組`app.module.ts`

```
import { FormsModule } from '@angular/forms';
```

然後把 FormsModule 新增到 @NgModule 元資料的 imports 陣列中，這裡是該應用所需外部模組的列表。
```
imports: [
  BrowserModule,
  FormsModule
],
```

這樣一來就大功告成可以開始使用ngModel的功能了。


## 使用ngModel


先在`ts`檔案宣告一個新的屬性newHeroName
```
newHeroName=" "
```

再來在`html`檔案裡面新增一個input輸入框，並且使用`ngModel`綁定輸入框輸入的值
```
<input type="text" [(ngModel)]='newHeroName' >
```

顯示新輸入英雄的名字:
```
<p>新的英雄名稱:{{newHeroName}}</p>
```

綜合起來程式碼會長成這樣:
```
<input type="text" [(ngModel)]='newHeroName' >

<p>新的英雄名稱:{{newHeroName}}</p>
```

輸入什麼下面就會顯示什麼
![https://ithelp.ithome.com.tw/upload/images/20190922/20120107Jus8T1gRGH.png](https://ithelp.ithome.com.tw/upload/images/20190922/20120107Jus8T1gRGH.png)

修改新英雄的名字
![https://ithelp.ithome.com.tw/upload/images/20190922/20120107IqJWQCv5gs.png](https://ithelp.ithome.com.tw/upload/images/20190922/20120107IqJWQCv5gs.png)

雙向綁定的功能這樣就完成了!


# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d6?file=src/app/app.component.html)
# 小結
今天學到的有:
* 使用ngSwitch依照條件顯示不同的內容
* 使用ngModel雙向綁定顯示與修改資料

下一篇將繼續討論ngModel如何觸發功能並且新增與修改原有的資料!