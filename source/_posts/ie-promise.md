---
title: 如何解決IE無法使用promise的問題
date: 2019-01-03 23:53:39
tags: [ie,javascript,es6]
---
今天還是關於IE的問題。`promise`是javascript es6中處理異步事件非常好用且非常重要的方法。如果沒有promise，就得花費人生大把時光去處理煩人的異步事件。(雖然現在有更好用的rxjs去處理，但不可諱言，promise還是一個很重要的方法)。可惜的是，這麼好用的方法IE不支援。

{% asset_img promise.jpg %}

IE不支援promise怎麼辦?當所有方法用盡之後，自幹才是最後一個選擇，在自幹之前，別人一定也遇過相同的問題，一定會有別人提供的好方法、好解法。在決定要動手之前，先去找找別人做過的方法，可以為自己省下很多時間。
一般來說，遇到這樣的問題，如果有使用打包的套件，可以在打包的時候將javascript轉換成es5，這樣IE就認得ES5的語法，就可以使用了。如果覺得設定轉換成ES5很麻煩呢?那麼可以試試別人寫好的第三方套件，直接引入，解決!
```
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise"></script>
```

#### 參考資料
[IE11 ReferenceError: 'Promise' is undefined](https://github.com/benjamincharity/angular-flickity/issues/82)
