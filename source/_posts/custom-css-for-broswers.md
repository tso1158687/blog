---
title: 針對不同的瀏覽器自訂不同的CSS
date: 2018-04-03 00:27:02
tags: [css]
---

不同的瀏覽器對於同樣的 CSS 屬性會有不同的渲染方法，舉一個簡單的例子，對一個 inline-block 的容器設定寬度，safari 計算寬度的方式就和別人不一樣；又或者對 IE 設定 line-height，IE 渲染的方式也跟其他人不一樣，這樣其實對於前端的人造成很大的困擾。

因此就想到可不可以針對不同的瀏覽器套用特定的 CSS，針對那些實作起來不一樣的瀏覽器微調。找到一篇文章[在 css 中判断浏览器类型的 5 大方法盘点](https://www.iwwenbo.com/css-ie-browser-check/)，裡面寫了好多種方法可以判斷不同瀏覽器載入不同 CSS 的方法。以下分享其中一種我覺得最簡單也是最有彈性的方法:

### 使用 media query 判斷瀏覽器:

media query 常用來判斷瀏覽器的尺寸之外，也可以針對某個屬性查詢，如果有某個屬性的話，就套用哪些 CSS。於是就可以查詢某些瀏覽性特有的屬性，如果查到就是該瀏覽器(因為其他瀏覽器不會有)，就可以套用針對的設定

### 針對 IE10、IE11 的查詢語法

```
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  p {
  color: red; //要套用的屬性
  }
}
```

PS:如果是針對 IE7,8,9 這個我就真的不知道該怎麼辦了

### 針對 safari

```
@media screen and (-webkit-min-device-pixel-ratio:0) {
  p {
    color: red;
  }
}
```

### 針對 firefox

```
@-moz-document url-prefix() {
  p {
    color: red;
  }
}
```

雖然也有針對 chrome 判斷的語法，但基本上應該是沒有用到的機會，畢竟 chrome 是最積極實作與標準化各種 CSS 的屬性，所以很難會有只有 chrome 有，而其他人沒有，只針對 chrome 設定的場合。
