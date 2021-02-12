---
title: Day18-SOLID原則-里氏替換原則(Liskov Substitution Principle)
date: 2021-01-11 21:24:36
tags: [solid]
---
# Day18-SOLID原則-里氏替換原則(Liskov Substitution Principle)

# 什麼是里氏替換原則

> 子型別必須遵從父型別的行為進行設計

解釋只有一句話這麼簡單。

- 子型別要完全實作父型別的方法
- 子型別要能完全替代父型別，且不能出現錯誤或異常

# 里氏替換原則的例子-矩形vs正方形

## 矩形和正方形的定義

矩形的定義為:定義為有一個角是直角的平行四邊形，即包含正方形和長方形

正方形的定義為:四個邊都等長的矩形

## 以矩形和正方形為例子

從定義來看，矩形為正方形和長方形的父型別；反之正方形為矩形的子型別

假設有一個矩形的class ，必須輸入他的長和寬。並且有一個利用長和寬取得面積的方法

```jsx
class Rectangle {
  height;
  weight;
  constructor(height, weight) {
    this.height = height;
    this.weight = weight;
  }

  getArea() {
    return this.height * this.weight;
  }
}
```

當我想取得矩形的面積時候

```jsx
const rectangle1 = new Rectangle(10, 20);
console.log(rectangle1.getArea()); // 200
```

再來建立一個正方形的class，它是繼承矩形而來的class。正方形和矩形一樣都有取得面積的方法。但是正方形的取得面積的方法多了一個檢查，長和寬需要一致，以符合三角形的定義

```jsx
class Square extends Rectangle {
  constructor(height, weight) {
    super(height, weight);
  }

  getArea() {
    if (this.height !== this.weight) {
      return "長和寬需一致";
    } else {
      return super.getArea();
    }
  }
}
```

當我想要取得正方形的面積的時候

```jsx
const square1 = new Square(10, 20);
console.log(square1.getArea()); // 長和寬需一致
const square2 = new Square(20,20);
console.log(square2.getArea()) // 400
```

有沒有發現到，當父類別的矩形和子類別的正方形輸入一樣的參數的時候，竟然得到不一樣的結果

```jsx
const rectangle1 = new Rectangle(10, 20);
console.log(rectangle1.getArea()); // 200

const square1 = new Square(10, 20);
console.log(square1.getArea()); // 長和寬需一致
```

一樣的參數父類別得到面積而子類別拋出錯誤訊息。對父類別來說，這個就是一個不可預期的結果。就是因為子類別並沒有完全遵守父類別的行為。

## 所以應該要怎麼做

既然發現了正方形在實作矩形取得面積的方法會有不同的行為而發生不可預期的結果。可以從源頭找起，是不是父類別設定長和寬的時候，就需要增加一個檢查長和寬的功能。讓這個矩形的父類別可以涵蓋更全面更廣泛

# 里氏替換原則的優點

- 增加程式碼的健全度，在使用不同的子類別的時候，可以大幅度的保證彼此之間的相容性。只要父類別可以使用，基本上子類別也可以使用
- 子類別如果要新增功能，獨立在父類別的功能之外，才不會在搬移到其他子類別的時候發生奇怪的問題，也可以將功能切分乾淨，區分職責