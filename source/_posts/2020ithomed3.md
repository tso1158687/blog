---
title: DAY3-常見的Javascript使用技巧與情境
date: 2021-01-11 21:23:35
tags: [javascript, es6,鐵人賽2020]
---

# DAY3-常見的 Javascript 使用技巧與情境

Javascript ES6 帶來很多方便且實用的新語法(其實 ES6 也不新的，但是 IE 就是不支援 😢)，

很多網站都有很詳細介紹新語法，筆者本人也是在各大網站看了好多關於新語法的介紹，每次看完都會有一種感覺:哇!好方便喔，太厲害了......但是，要用在哪呢?真的要使用的時候反而想不到到底要用什麼方法去處理，所以在此會以使用情境作為分類。

本篇的介紹的例子都會以下列的範例做示範

```ts
let people = [
  {
    name: '哆啦A夢',
    age: 10,
    weight: 129,
    height: 129,
    favorite: '銅鑼燒',
    isStudent: false,
  },
  {
    name: '葉大雄',
    age: 11,
    weight: 40,
    height: 141,
    favorite: '睡午覺',
    isStudent: true,
  },
  {
    name: '靜香',
    age: 11,
    weight: 35,
    height: 135,
    favorite: '銅鑼燒',
    isStudent: true,
  },
];

let people2 = [
  {
    name: '胖虎',
    age: 12,
    weight: 50,
    height: 150,
    favorite: '看漫畫',
    isStudent: true,
  },
  {
    name: '小夫',
    age: 11,
    weight: 40,
    height: 139,
    favorite: '玩遙控模型',
    isStudent: true,
  },
];
```

資料說明：這裡有兩群人，分別是哆啦 A 夢、大雄、靜香一群。胖虎和小夫一群。每個人分別都有：姓名、年齡、體重、身高、喜好、是否是學生等資料。

## every-如果想知道是不是所有人都是學生

情境翻譯：我想知道這群人裡面，是不是所有人都是學生。至於學生是誰並不重要，我只要知道是(`true`)或不是(`false`)

```ts
// 是否有人是學生
let allStudents = people.every((e) => e.isStudent);
console.log('是不是所有人都是學生:', allStudents); // false 哆啦A夢不是
```

## some-如果想要知道有沒有人是學生

情境翻譯：我想知道這群人裡面，有沒有人是學生（至少有一個人是學生）。至於有幾個或是那個人是誰並不重要，我只要知道有(`true`)或沒有(`false`)

```ts
// 是否有人是學生
let isSomeoneStudent = people.some((e) => e.isStudent);
console.log('是否有人是學生:', isSomeoneStudent); // true 大雄和靜香是學生
```

## filter-如果想要找出體重小於一百公斤的人

情境翻譯：如果今天去遊樂園玩，某項遊樂設施有限制體重，限制一百公斤，超過的人不能乘坐。那麼我想要知道誰的體重小於一百公斤。我需要體重小於一百公斤的人的名單（哆啦 A 夢 QQ）

```ts
let weightLessThanOneHundred = people.filter((e) => e.weight < 100);
// 哆啦A夢大於100，不應該出現哆啦A夢
console.log('體重小於100的人：', weightLessThanOneHundred);
```

## find-如果想要喜歡睡午覺的人

情境翻譯：如果今天有一個特殊的才藝比賽，要比賽睡午覺。因此我要找出喜歡睡午覺的人去參加比賽。但是因為名額只有一名，所以我要找出第一個符合條件的人

```ts
let isSomeLikeSleep = people.find((e) => e.favorite === '睡午覺');
// 大雄喜歡睡午覺
console.log('喜歡睡午覺的人：', isSomeLikeSleep);
```

### 註：有沒有發現到，filter 和 find 都是找出某個條件後的結果

但是同樣都是過濾條件後的結果，還是有使用情境上的差別的

- filter:找出出所有符合條件的結果
- find:找出第一個符合條件的結果

可以依照使用情境不同的需求，使用不同的方法

## map-如果想要將每個人的年齡都增加一歲

情境翻譯：如果一年過去了，每個人都長大一歲了，現在要將每個人的年齡資料都加加一歲

```ts
let newAge = people.map((e) => {
  e.age++;
  return e;
});
console.log('增加一歲的年齡', newAge); //每個人的年寧都增加一歲
```

map 的特點就是可以加工每一筆資料

## 這些方法都有一個特點

是否有發現到，這些方法的操作都會宣告一個新的變數去取得操作之後的結果。

# 其餘參數和展開運算子

ES6 新增的其餘參數和展開運算子是非常方便的功能，使用方法非常簡單就是三個點點點(...)

### 陣列合併-如果來了新同學...

情境說明：原本只有哆啦 A 夢、大雄、靜香三人。現在又來了新同學胖虎和小夫。因此我要加入新同學的資料，取得最新的學生名單

```ts
let allPeople = [...people1, ...people2];
// 哆啦A夢、大雄、靜香、胖虎、小夫的合併資料
```

展開運算子可以將陣列展開，如果同時展開兩個陣列，就等於將兩個陣列合併的意思，也等同 Javascript 的 `concat`方法。

## 陣列拷貝-如果需要一分新的名單又來了新的同學

情境說明：如果來了一個新同學-小衫，需要一份新的名單。但是不想要修改到舊的名單，這時候就可以使用其餘參數來拷貝陣列，避免修改到原本的資料

```ts
let newPerson = {
  name: '小衫',
  age: 11,
  weight: 41,
  height: 142,
  favorite: '睡午覺',
  isStudent: true,
};
let people3 = [...people];
people3.push(newPerson);
console.log('拷貝過後的陣列');
console.log(people); // 哆啦A夢、大雄、靜香
console.log(people3); // 哆啦A夢、大雄、靜香、小衫
```

特別注意的是：這方法只能用在物件的淺拷貝，如果要使用深拷貝，就必須使用別的方法

延伸閱讀：

- [[Javascript] 關於 JS 中的淺拷貝和深拷貝](https://larry850806.github.io/2016/09/20/shallow-vs-deep-copy/)
- [[JavaScript Weird]Day 27 觀念小叮嚀：傳值和傳參考](https://medium.com/pvt5r486/javascript-weird-day-27-%E8%A7%80%E5%BF%B5%E5%B0%8F%E5%8F%AE%E5%9A%80-%E5%82%B3%E5%80%BC%E5%92%8C%E5%82%B3%E5%8F%83%E8%80%83-57d3b3798e06) （雖然傳值、傳參考、傳位置的話題爭論不休，但是可以了解在爭論什麼事情）

### 解構賦值-過濾物件的某些屬性

使用情境：假設今天要幫哆啦 A 夢報名吃銅鑼燒大賽，但是報名的時候不需要身高、體重等資料，那麼可以使用解構賦值的方法去剔除不需要的物件屬性

```ts
let student = {
  name: '哆啦A夢',
  age: 10,
  weight: 129,
  height: 129,
  favorite: '銅鑼燒',
};

const { weight, height, ...data } = student;
console.log(data);
// { name: '哆啦A夢', age: 10, favorite: '銅鑼燒' }
```

以上是關於 Javascript ES6 依照使用情境分門別類，介紹各個方法的使用時機。希望當遇到這些使用情境的時候，可以想起：對！就是這個方法。

今天的範例都會放在[https://stackblitz.com/edit/typescript-4dy2zo](https://stackblitz.com/edit/typescript-4dy2zo)
