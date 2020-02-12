---
title: (DAY-18) Angular的表單管理-響應式表單(Reactive Form)-建構篇-Angular 與 Nestjs 共舞
date: 2019-10-04 16:40:12
tags: [angular]
---
上一篇建立起響應式表單(Reactive Forms)，看起來和一般的表單沒有不一樣。這一篇將來實際應用，顯示響應式表單厲害之處。
在開始之前，先介紹表單控制元件(FormControl)的幾種狀態


# 表單控制元件的狀態
依照元件的狀態:
* prisrine:原始狀態，沒有被修改過
* dirty:非原始狀態，有被修改過，即使修改成原始狀態的值也一樣


依照元件的有效性:
* valid:如果有驗證條件，內容為有效的內容;如果沒有驗證條件，內容預設有效
* invalid:輸入內容為驗證不符合的內容


依照元件的碰觸:
* touched:元件已經被碰觸過
* untouched:元件尚未被碰觸過


透過以上三種狀態，可以取得元件的狀態，做出不同的變化。

# 表單設計目標解說
![https://ithelp.ithome.com.tw/upload/images/20191005/20120107lOk8WWaUpL.jpg](https://ithelp.ithome.com.tw/upload/images/20191005/20120107lOk8WWaUpL.jpg)

這是今天的目標：
1. 帳號、密碼、信箱為必填欄位，如果沒有填寫，輸入框外框變成紅色，並且出現提示訊息
2. 密碼欄位除了必填以外，還至少填寫六個字元
3. 信箱必須符合、email的格式
4. 設計一個暗語的欄位，如果輸入對暗語”secret"，下方就會顯示一排藍色的秘密文字，如果輸入錯就會隱藏
5. 如果暗語輸入對，就會將想說的話清空。
# 表單必填欄位的設定
先設定CSS，如果表單驗證錯誤，將外框變成紅色


`css`
```
input.ng-invalid.ng-touched{ //注意這行
  border:1px solid red
}
```
如果表單驗證錯誤，那麼一定符合以下條件：
* 表單要被處碰過(ng-touched)
* 表單內容為不合法的內容(ng-invalid)
表單控制元件的狀態改變的時候，會自動加上相對應的CSS屬性，因此可以用自動加上的屬性，幫輸入框加上紅框。


再來設定驗證條件
`ts`
別忘記載入相關元件
```
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
```

表單的設定

```
this.applyForm = this.fb.group({
    userName: ["可以預設資料", Validators.required],
    password: ["", [Validators.required, Validators.minLength(6)]],
    secret: [""],
    talk: ['說點什麼'],
    email: ["", [Validators.required, Validators.email]]
});
```
還記得上一篇有提到，建立響應式表單的控制元件時使用陣列建立，陣列中的`第一個值為預設值`，如果沒有填寫的話為`null`


現在延續昨天的內容，陣列中的第二個值為控制元件的驗證規則。例如可以使用`Validators.required`表示為必填的欄位，如果驗證的規則不只一個，可以用陣列再將驗證規則包起來。
像是password密碼欄位，除了必填之外，還可以使用`Validators.minLength(6)`表示最少要六個位元，而email信箱欄位，則可以使用`Validators.email`表示填寫格式必須是電子郵件的格式


加入驗證錯誤的訊息
`html`
```
<div>
    帳號*: <input type="text" formControlName="userName">
    <span *ngIf="applyForm.get('userName').invalid && applyForm.get('userName').touched">請輸入帳號</span>
</div>
```
以帳號欄位為例，在這裡使用span元素，並且搭配`ngIf`判斷式，如果控制元件驗證不通過，就會顯示帳號。條件是:此欄位為不合法，且此欄位已經被觸碰過


在html頁面，取得表單的狀態為:
```
formGroup.get('formControl').xxxxx
```

# 取得控制元件的變化-valueChanges
今日的目標之一: 設計一個暗語的欄位，如果輸入對暗語”secret"，下方就會顯示一排藍色的秘密文字，如果輸入錯就會隱藏
也就是說，必須監聽暗語的欄位，監聽輸入的內容，如果內容符合條件，執行某種動作；反之，內容不符合某種條件，執行某種動作


響應式表單有一個很方便的功能可以監聽欄位的變化-`valueChanges`
```
const secret$ = this.applyForm.get('secret') //取得secret的控制元件
secret$.valueChanges.subscribe(e => { // 監聽secret控制元件的變化，如果有變化，將變化的值傳遞出去
    console.log(e)
    if (e === 'secret') {
        this.showSecret = true
    } else {
        this.showSecret = false
    }
})
```
* 先取得secret的控制元件
* 使用valueChange的功能，valueChage本身也是一個可被觀察的對象(observable)，所以使用訂閱(subscribe)訂閱去取的變化內容


在此例子中使用變數showSecret去控制祕密的內容是否顯示
```
<p *ngIf="showSecret">
  <span style="color:blue">這是一個隱藏的秘密</span>
</p>
```

# 修改表單-patchValue
另外一個目標: 如果暗語輸入對，就會將想說的話清空。
(這個題目發想可能有點爛，不過可以舉個例子:現實生活中，可能買某樣東西送一樣二選一的贈品，如果選擇A的話又選擇B的話，在選擇的同時，要把另一樣東西的數量強制修改為0)
```
if (e === 'secret') {
    this.showSecret = true
    this.applyForm.patchValue({
        talk: ''
    })
}
```

patchValue的使用方法很件單，就是使用patchValue的方法，並且用物件的方式表達要修改的欄位與修改的值
patchValue僅會修改在物件中的欄位，如果不在物件中的欄位，就不會被變更到


# 重置表單-reset
將表單的內容送出之後，要將表單的內容重置為初始狀態，這時候就可以使用`reset`方法

```
this.applyForm.reset({
      userName:'',
      password:'',
      secret:'',
      talk:'',
      email:''
})
```

將表格的所有狀態改為初始狀態(例如有沒有被點過、資料驗證有沒有過的狀態)
如果沒有設定參數，會把表格裡面所有的值改為null，但是如果輸入參數，可以預設所需要的值
也許會有疑問，reset和patchValue兩者有什麼不一樣。兩者都可以修改表單的資料，最大的差異是:
* patchValue只修改表單的值，不會修改表單的狀態
* reset除了修改表單的值，同時也會修改表單的狀態，將表單的狀態修改為初始狀態(例如:已經觸碰的touched變成為觸碰的untouched)
# 線上範例
今天的範例內容可以在這裡看到:範例內容


# 小結
今天學到的事情有：
* 響應式表單使用技巧
* 認識表單元件的狀態
* 使用`valueChanges`偵測表單異動
* 使用`patchValue`修改表單的值
* 使用`reset`重設表單