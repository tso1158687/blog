---
title: DAY7-CSS結構化與命名技巧
date: 2021-01-11 21:23:52
tags: [CSS,OOCSS,鐵人賽2020]
---
# DAY7-CSS結構化與命名技巧

CSS的優點就是很容易上手，很好使用，無論怎麼命名、怎麼使用，只要對應的到都可以。甚至如果有相同的命名，還會去計算權重，使用權重最高的那個。幾乎不用擔心會出錯，頂多出現的效果還想的不一樣而已。

但是缺點和優點一體兩面，簡單好上手的優點在結構化和維護的觀點來看，反而成了缺點。

# CSS的結構化設計

## OOCSS (Object Oriented CSS)

也就是物件導向式的CSS設計。將結構和樣式分離，例如可以看以下bootstrap的例子

{% asset_img 1.png %}

- 結構: 像 `btn` 這個class就是代表結構，規範有的按鈕都應該長什麼樣子，像是按鈕的圓角(border-radius)要多少、文字與外框的間距(padding)多少、按鈕與其他的元素要間隔多少距離(margin)，這些都是按鈕通用的結構樣式。
- 樣式:像 `btn-primary` 、 `btn-secondary` 等樣式，則是規範不同樣式的按鈕各自的樣子，像是使用btn-primary就會有藍底白字的按鈕、btn-secondary就會有灰底白字的按鈕。

結構型的CSS可能會是一組CSS，訂定好一個東西應該要有的樣子，像是

```scss
.btn{
    padding: 10px;
    margin:4px;
    min-width: 35px;
    border: 1px solid #ffffff;
    border-radius: 4px;
}
```

但是樣式型的CSS則相反，盡量越簡單越單純越好

```scss
.btn-primary {
  color: #ffffff;
  background-color: #40809d;
}

.btn-secdonary {
  color: #ffffff;
  background-color: #7d7d7d;
}

.btn-large {
  font-size: 1.5em;
}

.btn-small {
  font-size: 0.8em;
}
```

樣式型CSS越單純，越容易排列組合重複利用。

# CSS的命名原則

程式的命名不論在什麼語言都是一個很重要的課題。命名這個動作雖然很簡單，但是怎樣的命名可以讓大多數人一看就清楚明白命名的內涵是什麼可是一項高難度的技巧。甚至有好多書籍或文章都在探討要如何好好**命名**。

### 不要使用太過泛用的命名

例如使用class `highlight` 去代表強調的樣式，就可以在樣式檔案到處看到這樣的樣式

```scss
// 第1行
.highlight{
    color:red
}

// 第50行
.tab .highlight{
    color:blue;
}

// 第100行
.link .highlight{
    color:yellow
}

// 第500行
.highlight{
    color:green !important
}
```

用到最後都會搞不清楚到底最後使用的是哪一種highlight樣式。找到快要瘋掉，就只能開大絕加上 `!important` 解決一切所有事情。但是如果每次都開大絕，到處都加了important，就一點都不important，還能再加一個嗎?當然不行

因此建議命名的時候可以多描述一點，這樣可以更好區分各種不同的highlight，也可以避免命名一樣互相蓋來蓋去的情況

```scss
.text-highlight {
  color: blue;
}

.link-highlight {
  color: yellow;
}
```

### 使用抽象的命名

通常網頁設計會有主配色、副配色等搭配。例如主配色是藍色、副配色是紅色

```scss
.blue-color{
    color: blue;
}

.red-color{
    color:red
}
```

這樣直接使用配色的顏色作為CSS的名稱使用，可能在使用當下不會發現什麼太大的問題。但是如果之後要改版，將主配色換成綠色、副配色換成黃色。那麼將 `.blue-color` 裡面的顏色改成綠色，命名起來，就不是那麼名副其實了。

為了避免這個問題，請使用樣式的功能來命名。這個同樣可以參考bootstrap的做法。

{% asset_img 2.png %}

bootstrap在處理這方面的問題，是以樣式的功能來命名，例如 `text-primary` 、 `text-danger` 分別用來代表主配色和表示危險的顏色。至於主配色是什麼或危險的顏色是什麼，就可以定義在裡面。變動的時候，只要修改內容，也不會影響其意義。

是一個很好管理樣式的作法

## CSS設計的參考

在筆者學習各種CSS結構化與命名技巧的過程中，大多是看bootstrap的原始碼得到許多靈感。

[bootstrap參考](https://github.com/twbs/bootstrap/blob/main/scss/_buttons.scss)

另外除了OOCSS之外，還有更多不同的CSS設計原則，像是 `SMACSS` 、 `BEM` 、 `CSS in JS` 等各種不同的方法，可以多比較多使用看看

---

參考文章:

[https://cythilya.github.io/2018/06/05/css-methodologies/](https://cythilya.github.io/2018/06/05/css-methodologies/)

[https://wcc723.github.io/css/2016/12/04/oocss-three/](https://wcc723.github.io/css/2016/12/04/oocss-three/)