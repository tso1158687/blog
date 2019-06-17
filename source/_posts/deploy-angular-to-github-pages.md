---
title: 如何把angular專案建成並快速推到github pages
date: 2018-06-13 00:19:24
tags: [angular,github]
---
因為參加六角學院的鐵人賽，所以要把寫好的專案build起來再放到github的page上面的時候，遇到一些困難，所以記錄下來提醒自己，也希望看到這篇文章的人可以避掉這個困難

當你在本地端的angular專案開發完畢之後，準備編譯成最終完成品的時候，有一個很容易忽略，但卻非常重要的小陷阱(至少本人踩到這個雷花了很久的時間在找答案)

這個非常小非常小的陷阱在`index.html`中的

```
<base href="/">
```

這是告訴angular，這個專案的跟目錄的位置在什麼地方，預設是在跟目錄，但是我們放在github page上面的檔案不一定會建立在跟目錄下面，例如我就開了一個f2e-w1的repo放第一個禮拜挑戰的內容，因此我的github page的網址就會是[https://tso1158687.github.io/f2e-w1/](https://tso1158687.github.io/f2e-w1/)

這個就是問題了，我的github page的網站跟angular專案設定的網址不一致，因此將angular專案部屬到github上面之後，畫面會一片空白，打開開發者模式會看到一堆錯誤，都是angular找不到檔案的錯誤，所以沒有內容可以顯示

{% asset_img angular-github-error.jpg %}

為了避免這樣的情形發生，在build專案的時候，只要將base href設定一下，改為自己要部屬的網站的網址就不會有這樣的錯誤了

```
ng build --prod --base-href "網址"
```

以我的專案為例，就是輸入

```
ng build --prod --base-href "https://tso1158687.github.io/f2e-w1/" 
```

另外還有一個要介紹很方便的功能是`angular-cli-ghpages`，可以快速將build好的專案快速推到github page上面，可以節省很多手動推送和眼殘點錯檔案的風險

安裝[angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages)的方法很簡單，只要輸入指令就安裝完畢了

```
npm i -g angular-cli-ghpages
```

當專案build完之後，輸入

```
ngh --dir dist/專案名稱 --repo=git@github.com:帳號/專案名稱.git --no-silent
```

同樣再以我的例子為例，就是

```
ngh --dir dist/f2e-w1 --repo=git@github.com:tso1158687/f2e-w1.git --no-silent
```

他就會自動幫你建立`gh-pages`的分支，並將編譯好的結果推上去，這個分支是`孤兒分支(orphan branch)`，所以也不用擔心影響到主分支的檔案喔