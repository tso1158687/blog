---
title: script到底要放哪裡?
date: 2018-05-15 23:35:21
tags: [html]
---
## script到底要放哪裡?

一開始學網頁的時候，都會說script一定要放在head裡面，因為head裡面是宣告這個網頁各種資訊，和載入一切所有要用到的資源的地方，這樣才能讓body裡面的內容順利解析。到後來從新手變成比較不新的新手之後，就看到網路上很多文章都寫，盡量把script放在body最後面，這樣對使用者來說，瀏覽網站的體驗會比較好。雖然不知道為什麼、也感覺不出來哪裡比較好，不過看起來一樣能動，這樣也比較潮的樣子，所以就照做了。

## 瀏覽器如何解析網頁

過了幾年之後，又遇到一樣的問題，這個問題可躲不掉了，得好好研究一下。所以在重述一次題目，script到底要放在哪裡?
要回答這個問題，就必須先瞭解瀏覽器如何解析網頁。
以下有一個範例網頁

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="app.js"></script>
    <title>Document</title>
</head>
<body>
    <h1>hello，你好</h1>
</body>
</html>
```

瀏覽器會從上而下依序讀取下來

1. !DOCTYPE html 知道這是一個html
2. html lang="en" html的內容開始了
3. head 依序讀取標頭檔的內容
4. 解析到有javscript，開始讀取javascript的內容
5. 讀取body的內容，讀到h1裡面有hello，你好
6. 顯示hello，你好

看出來問題出在哪裡了嗎?問題在第四點，要先讀取完javascript的內容，才會開始解析body裡面的內容，在javascript還沒解析完之前，所看到的網頁就會是一片空白，因為還沒開始解析內容。
如果javascript的檔案很小的話，這中間的時間差不會有明顯差異。但是如果像現在大量使用javscript控制網頁內容，檔案必定不會很太小，解析需要一點時間，中間就會有一段完全空白的時間，這樣對使用者來說，鐵定是非常差的，說不定以為網頁壞掉了，就直接關掉，開發者辛苦的內容完全沒有被看到
因此才會說把script放在body最後方，就算javascript內容再大，使用者的網頁還是會先顯示出內容，再開始載入javascript的內容，這樣使用者也不會有中間不知道要幹什麼的空白時間

這就是為什麼script要放在body最後方
但是還沒結束，現在你有更好的做法，html5新增兩個script的屬性async和defer

### async 異步載入
html解析和script解析同步進行，script解析完要執行的時候，html解析會停下來等script執行完後再繼續

### defer 延緩載入
html解析和script解析同步進行，等html解析完，script才開始執行

只有文字的描述說不定很難體會，我在[growingwiththeweb](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)找到這張圖片，看了圖片就會明白了

{% asset_img script.jpg %}

至於使用和async和defer的時機，這個網站有很明確的說明:

- async:如果script是模組化且`不依賴其他的script`可以執行的話，使用async

- defer:如果script是`依賴其他script`才能執行的話，使用defer(想想這很合理，當然要等到主要的script執行完畢才有辦法執行，所以要放到最後，才能保證可以執行)