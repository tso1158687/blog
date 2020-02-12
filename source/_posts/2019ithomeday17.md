---
title: (DAY-17) Angular的表單管理-響應式表單(Reactive Form)-建構篇-Angular 與 Nestjs 共舞
date: 2019-10-03 16:40:12
tags: [angular]
---
響應式表單(Reactive Form)是Angular內建的表單模組。

# 為什麼需要響應式表單
* 以資料驅動(data driven)的方式關注表單的資料
* 關注點分離，將畫面與邏輯分離，不會混合在一起
* 內建各種驗證規則，可以應付大多數場合

還有一個最大的優點，就是響應式表單之所以稱為響應式（Reactive)的原因，

表單所有的內容都是可被觀察對象，也就是說，當表單的內容發生變更，不論要驗證還是動態增減內容，通通只要訂閱就可以取得變更的內容。
完全不用去煩惱發生變更要如何觸發變更，要如何傳遞變更的資料。

# 事前準備
只要載入響應式表單的模組就可以囉!
`app.module.ts`
```
import { ReactiveFormsModule } from '@angular/forms'; //匯入ReactForms模組

@NgModule({
    imports: [
        // 其他模組 ...
        ReactiveFormsModule
    ],
})
export class AppModule { }
```
載入ReactiveForms模組之後，就可以開始使用囉。

# 使用響應式表單
首先先匯入相關的功能，`FormBuilder` 和 `FormGroup`

另外先匯入`Validators` 驗證相關的功能，在下一篇會用到。
```
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
```
再來開始建立一個簡單的註冊表單，稱這個表單為applyForm
`ts`
```
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms”; // 匯入表單相關功能
@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    applyForm: FormGroup; // 定義一個表單稱為applyForm，並且表單的型別為FormGroup，也就是表單的集合。
    constructor(private fb: FormBuilder) { } // 將表單相關元件啟動，並給予名稱fb
    ngOnInit() {
        this.applyForm = this.fb.group({ // 在元件啟動的時候建立每個表單的控制元件
            userName: ["可以預設資料"],
            password: [""],
            email: [""]
        });
    }
}
```
以上是快速建立響應式表單的範例，以下分別解說：
* 首先先匯入`FormBuilder` 和 `FormGroup` 建立響應式表單的相關功能
* 宣告一個表單的屬性，並將屬性類型指定為`FormGroup`，也就是每個表單的控制元件的集合
* 在元件的建構式裡面，將建立表單的`FormBuilder`加到元件之中，並且給他另外一個別稱fb
* 在元件啟動的時候，利用FormBuilder幫applyForm建立控制元件
* 控制元件稱為`formControl`
* 一堆控制元件也就是`formGroup`
* 控制元件建立的方法以物件的形式建立，key為控制元件的名稱,value裡面的陣列第一個值為預設值，如果沒有填寫就會是`null`

響應式表單這樣就建立完成了，接下來將這些值綁定到頁面上面
`html`
```
<!-- 綁定表單名稱 -->
<form [formGroup]="applyForm"> 
    <!-- formControlName 為剛剛建立的表單控制元件名稱 -->
    <div>
        帳號: <input type="text" formControlName="userName">
    </div>
    <div>
        密碼: <input type="password" formControlName="password">
    </div>
    <div>
        信箱: <input type="text" formControlName="email">
    </div>
</form>
```
* 在form裡面綁定剛剛所建立的表單名稱`[formGroup]=“applyForm"`
* 在表單裡面，使用`formControlName`將剛剛所建立的控制元件綁定上去

一個簡單的響應式表單就建立完成了，可以看到剛剛userName的預設值成功顯示出來。
![https://ithelp.ithome.com.tw/upload/images/20191003/20120107owzCRbVDrV.png](https://ithelp.ithome.com.tw/upload/images/20191003/20120107owzCRbVDrV.png)
# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d17-reactive-form)

# 小結
今天學到的事情有：
* 為什麼需要響應式表單
* 如何使用響應式表單

今天建立起來的表單看起來和普通的表單沒有什麼不一樣，明天將更進一步利用今天建立起來的表單做各種變化，感受響應式表單流厲害之處。
