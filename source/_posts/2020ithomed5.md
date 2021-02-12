---
title: DAY5-Javascript Set和Map (下)
date: 2021-01-11 21:23:43
tags: [javascript, es6]
---

# DAY5-Javascript Set 和 Map (下)

## Map

Map 是一種資料結構，和前一天所介紹的加工資料的方法 map()是完全不一樣的東西喔。

和 Set 不一樣，Map 重視鍵和值(key/value)之間的關係，對於兩者之間關係的操作是使用 Map 的重點。

Map 的用法基本上和 Set 差不多，一樣都有新增、取得、刪除、數量、是否存在、清除等用法，只不過 Set 新增內容是 add；而 Map 新增內容是 set，其他方法基本上大同小異。

### 建立 Map

```tsx
let fruitMap = new Map();
```

在建立的時候，可以給予初始值，使用陣列

```tsx
let fruitMap = new Map([
  ['a', 'apple'],
  ['b', 'banana'],
  ['c', 'cherry'],
]);
```

### set

新鍵與增(key/value)值到 Map 中

```tsx
let fruitMap = new Map();
fruitMap.set('a', 'apple');
fruitMap.set('b', 'banana');
fruitMap.set('c', 'cherry');
```

### get

取得鍵相對應的值

```tsx
let fruitMap = new Map();
fruitMap.set('a', 'apple');
fruitMap.get('a'); // apple
```

### delete

從 Map 中刪除某一對鍵與值

```tsx
let fruitMap = new Map();
fruitMap.set('a', 'apple');
fruitMap.set('b', 'banana');
fruitMap.set('c', 'cherry');
fruitMap.delete('c'); // 刪除c和cherry這組
```

### size

取得 Map 中的數量

```tsx
let fruitMap = new Map();
fruitMap.set('a', 'apple');
fruitMap.set('b', 'banana');
fruitMap.set('c', 'cherry');
fruitMap.size; // 3
```

### has

取得 Map 中，某個鍵是否存在。如果存在返回 `true` ，反之返回 `false`

```tsx
let fruitMap = new Map();
fruitMap.set('a', 'apple');
fruitMap.has('a'); // true
fruitMap.has('f'); // false
```

### clear

清空 Map 所有東西

```tsx
let fruitMap = new Map();
fruitMap.set('a', 'apple');
fruitMap.set('b', 'banana');
fruitMap.set('c', 'cherry'); // []
```

## 實用例子-取代 switch case

switch case 方便的地方在於，可以依照各種不同的情境去寫不同的對應情況，如果對應不到，也會有預設情況。但是缺點在於如果情境很多的時候，程式碼會很長一串，極為冗長，而且不好管理。

以下是一個輸入水果種類，就會告訴告訴你現在一斤多少錢。如果沒有販售，則會告訴你現在無販售的方法。

### 取得水果的價錢-switch case 版本

```jsx
function getFruitPriceBySwicth(fruit) {
  switch (fruit) {
    case '橘子':
      console.log('橘子一斤200元');
      break;
    case '蘋果':
      console.log('蘋果一斤100元');
      break;
    case '香蕉':
      console.log('香蕉一斤80元');
      break;
    default:
      console.log(`不好意思，我們沒有賣${fruit}`);
  }
}
getFruitPriceBySwicth('西瓜'); // 不好意思，我們沒有賣西瓜
getFruitPriceBySwicth('橘子'); // 橘子一斤200元
```

### 取得水果的價錢-map 版本

```jsx
function getFruitPriceByMap(fruit) {
  let fruitPriceMap = new Map([
    ['橘子', 200],
    ['蘋果', 100],
    ['香蕉', 80],
  ]);
  let price = fruitPriceMap.get(fruit);
  let result = price
    ? `${fruit}一斤${price}元`
    : `不好意思，我們沒有賣${fruit}`;
  console.log(result);
}
getFruitPriceByMap('西瓜'); // 不好意思，我們沒有賣西瓜
getFruitPriceByMap('橘子'); // 橘子一斤200元
```

兩個方法的結果都是一樣的。

使用 map 的好處就是，程式碼明顯短多了，而且更加容易維護。如果未來要增加或減少水果的種類，只要修改 friutPriceMap 這個物件，其他的地方都不需要修改。

但是如果使用 switch case 不論增加或減少都要修改 case，要修改的地方就不只一行了。
