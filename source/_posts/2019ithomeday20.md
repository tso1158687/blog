---
title: (DAY-20) Typescript 介紹-型別(Type)與介面(Interface)-Angular 與 Nestjs 共舞
date: 2019-10-06 16:40:12
tags: [typescript]
---
Angular的介紹到此告一段落了。Angular與Typescript有非常深度的整合。因此Typescript也是必須要認識的相關基礎。現在要來介紹- Typescript

# 什麼是Typescript?
Typescript官方的定義是：
> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

簡單翻譯成中文就是：`Typescript是Jacascript的超集合且可以編譯成純粹的Javascript，可以運行在任何瀏覽器、伺服器、系統，是一個開源專案`

也就是說Typescript的基礎建構在Javascript之上，完全相容於Javascript，並且延伸擴展了一些東西。
現在就要來介紹Typescript闊展了什麼和基本觀念。

# 型別
Typescript的每項屬性都必須宣告型別，宣告型別有助於開發者兩者屬性的樣子，也可以讓編譯器在編譯的時候，確認屬性在使用的時候，是否和宣告時的類別一致，減少錯誤發生的可能性。

## 布林:boolean
```
let success: boolean = true;
```
## 數字:number
```
let count: number = 20;
```
## 字串:string
```
let message: string = "Hello world";
```
## 陣列:array
以下兩種都是宣告陣列的方法
```
let ages: number[] = [31, 20, 65];
let ages: Array<number> = [31, 20, 65];
```
## tuple(這個不知道中文該怎麼稱呼，或許稱為陣列組)
```
let x: [string, number];
x = ["age", 40]; // ok
x = [40, "age"] ; // error
```
## 任意:any
```
let some: any = "some";
some = 10000;
some = false;
let success: boolean = some;
let count: number = some;
let message: string = some;
```
any就是現在javascript的變數型別，也就是說變數的型別可以任意轉換，可以一下子是字串、一下子是數字。這樣的好處是在開發的時候可以加快開發的速度，因為可以不必在意變數的型別，隨意轉換也不會有問題；但是以長遠的角度來說，不果不規範變數的型別，讓變數可以任意轉換，很容易在非常細微看不出來的地方轉換失敗或是意外的結果，反而要花更多時間去除錯，因此非常不推薦使用any。

## 空值:void
```
function doSomething(): void {
 // 做些事情
}
```
最常用在function裡面，表示這個function執行完並不會return任何東西

## Nullable
使用 null 和 undefined 來定義型別
```
let u: undefined = undefined;
let n: null = null;
```
`undefined` 和 `null` 是`所有類別的子型別`。
```
let x: string = 'foo'; 
x = null; // error 
let y: string | null = 'foo'; 
y = null; // ok
```
## 任意型別推導
如果在宣告的時候沒有特別指定型別，那麼Typescript會自動推導出型別（除非指定型別為any）
```
let food = 'apple'
apple = 7
// Type 'number' is not assignable to type 'string' 
```
因為在宣告food變數的時候，實際上等同於
```
let food:string = 'apple'
```
會自動依照宣告的類型推導出宣告的內容為字串型別。

# 介面(Interface)
## 什麼是介面
介面(Interface)是定義一個物件的類別。也就是說一個物件在實作的時候，應該要長得怎麼樣。這樣說可能有一點抽象，舉一個生活一點的例子：
假設定一個人的臉部，一定要有：眼睛、鼻子、嘴巴、耳朵。
如果在生成一個人的臉部的時候，就會檢查臉部的介面，如果沒有眼睛、鼻子、嘴巴、耳朵，就不可以稱為臉部，這個就是介面的作用。

## 使用介面
一個簡單的介面的例子：
```
interface Person {
    name: string;
    age: number;
}


let jason: Person = {
    name: 'jason',
    age: 25
};
```

訂立一個稱為Person的介面。在定義jason的物件的時候，參考Person的定義，必須要有為字串型別的name與數字型別的age。
因此如果如果宣告的時候少了任一個就會報錯
```
let eric: Person = {
    name: 'eric',
};
// Property 'age' is missing in type '{ name: string; }'.
```
### 非必填的屬性
可能不是所有的物件對於某個屬性都是必須擁有的，就可以使用`問號`表示非必填的屬性。
意思就是：沒有這個屬性沒有關係，但是如果有的話就會檢查。
```
interface Person {
    name: string;
    age?: number;
}
```

如此一來，age對屬性就變成非必填，這樣上方的物件eric就可以通過檢查，不會報錯了。

# 小結
今天學到的事情有：
* 什麼是Typescript
* Typescript的型別
* Typescript的介面
