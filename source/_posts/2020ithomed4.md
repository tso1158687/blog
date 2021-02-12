---
title: DAY4-Javascript Set和Map (上)
date: 2021-01-11 21:23:39
tags: [javascript, es6]
---

# DAY4-Javascript Set 和 Map (上)

Set 和 Map 是 Javascript ES6 內建的標準物件。可以幫助我們處理更多不同情境的問題。

Set 關心的是值(value)，並且值是不是唯一；而 Map 關心的是鍵(key)和值(value)之間的關係。這兩種物件結構分別有不同的使用情境。

## Set

set 翻成中文就是集合的意思。Set 物件可讓你儲存任何類型的唯一值（unique）。也就是說，相同的內容不論輸入幾次，都只會只有一個在裡面不會重複出現

### add

新增值到集合中

```js
var mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
```

範例中新增了兩次 5，但是不會出現重複的 5 在裡頭

### delete

從集合中刪除值

```js
var mySet = new Set();
mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.delete(5); // Set [ 1 ]
```

### size

取得集合中元素的數量

```js
var mySet = new Set();
mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.size(); // 2
```

### has

集合中是否存在某值，如果存在，返回 `true` ；反之不存在，返回 `false`

```js
var mySet = new Set();
mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.has(1); // true
mySet.has(2); // false
```

### clear

清除集合所有的東西

```js
var mySet = new Set();
mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.clear(); // Set []
```

## Set 組合使用

既然是集合，就有兩個集合之間的比較應用，分別是交集、對稱差、聯集、差集

![DAY4-Javascript%20Set%E5%92%8CMap%20(%E4%B8%8A)%20c10e1fcac83c47bc85da739181788b43/Untitled.png](<DAY4-Javascript%20Set%E5%92%8CMap%20(%E4%B8%8A)%20c10e1fcac83c47bc85da739181788b43/Untitled.png>)

以下範例都以這兩個集合為範例

```js
let setA = new Set([1, 2, 3, 4]);
let setB = new Set([3, 4, 5, 6]);
```

### 交集

交集就兩個集合互相比較，如果值皆存在兩個集合當中，則為兩個集合的交集

```js
function intersection(setA, setB) {
  let intersection = new Set();
  setA.forEach((e) => {
    if (setB.has(e) === true) {
      intersection.add(e);
    }
  });
  return intersection;
}
console.log(console.log(intersection(setA, setB))); // 3,4
```

### 聯集

聯集也就是不分青紅皂白將兩個集合加入新的集合裡面，因為集合的值不會重複，所以得到的結果也就是聯集

```js
function union(setA, setB) {
  let union = new Set(...setA);
  setB.forEach((e) => {
    union.add(e);
  });
  return union;
}
console.log(union(setA, setB)); // 1,2,3,4,5,6
```

### 對稱差

對稱差用白話文翻譯的話就是:聯集減掉差集，得到的結果也就是對稱差

```js
function subtraction(setA, setB) {
  let baseSet = union(setA, setB);
  let intersectionSet = intersection(setA, setB);

  intersectionSet.forEach((e) => {
    baseSet.delete(e);
  });
  return baseSet;
}
console.log(subtraction(setA, setB)); // 1,2,5,6
```

### 差集

差集用白話文翻譯就是:A 集合減掉交集，得到的結果也就是 A 集合的差集

```js
function difference(setA, setB) {
  let difference = new Set(setA);
  let unionSet = intersection(setA, setB);
  unionSet.forEach((e) => {
    difference.delete(e);
  });
  return difference;
}
console.log(difference(setA, setB)); //1,2
```

## 範例

今天的範例[程式碼](https://stackblitz.com/edit/typescript-ystqju)

[https://ithelp.ithome.com.tw/articles/10214228](https://ithelp.ithome.com.tw/articles/10214228)

[https://pjchender.github.io/2018/07/30/js-javascript-map/](https://pjchender.github.io/2018/07/30/js-javascript-map/)

[https://pjchender.github.io/2018/07/30/js-javascript-es6-中的箭頭函式-arrow-function-和它對-this-的影響/](https://pjchender.github.io/2018/07/30/js-javascript-es6-%E4%B8%AD%E7%9A%84%E7%AE%AD%E9%A0%AD%E5%87%BD%E5%BC%8F-arrow-function-%E5%92%8C%E5%AE%83%E5%B0%8D-this-%E7%9A%84%E5%BD%B1%E9%9F%BF/)
