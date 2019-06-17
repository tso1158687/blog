---
title: 使用trim()去除多餘空白
date: 2018-09-06 23:33:12
tags: javascript
---
### trim
有時候使用者可能在輸入前或輸入後不小心按到空白，可是不小心按到空白建，如果沒有仔細看是很難看出來的。但是有時候多按一個空白，對程式來說影響可是很大的，例如在比對字串的時候"我是一個字串"和" 我是一個字串 "就是不一樣的東西，因此在送出使用者所輸入的資料之前，檢查與驗證這些資料就是一件很重要的事情。這時候就有一個非常好用的function-`trim()`

trim可以修剪字串前後的空白，因此假設有字串為
```
var string="       我是一個有很多空白的字串         "
```

使用trim之後的效果
```
string=string.trim()
// string="我是一個有很多空白的字串"
```
這真的是一個很方便的功能呢，而且IE9以上就有支援這個功能，所以基本上不必擔心會有什麼問題

### 參考資料
[W3C](https://www.w3schools.com/jsref/jsref_trim_string.asp)
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)

