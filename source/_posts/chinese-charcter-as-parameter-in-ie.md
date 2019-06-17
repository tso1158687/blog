---
title: 如何解決在IE使用中文字當作參數為亂碼的問題
date: 2018-12-31 14:55:28
tags: [javascript,ie]
---
最近又踩到一個IE的地雷，雖然不是很困難的問題，但是是一個非常容易誤觸的地方，記錄下來，避免之後又掉進一樣的地雷

這是一個很簡單的autocomplete的程式，使用者打關鍵字之後，將關鍵字當作參數送出到後端，取得關鍵字搜尋之後的結果，更新覆寫下拉選單

如附圖，當我打「走」，就會把 「走」字轉成參數送出去查詢，API就會回傳關鍵字的結果，並且將結果綁定到下拉選單上面，讓使用者選取。
{% asset_img ie-param1.jpg %}

因此這個程式基本上長這樣(已經省略掉與這次主題無關的內容)

```
// 關鍵字搜尋
getAutoComplete(keyword) {
    return this.$http.get(this.endpoint + '/search?keyword=' + keyword)
}
```

這樣的做法在chrome、firefox、edge上面都是可以正確執行的，但是在IE上面卻發生神奇的問題。
同樣是打「走」字，IE在送出參數的時候，送出去的參數變成亂碼。
{% asset_img ie-param2.jpg %}

為了縮小問題的範圍，確認是只要將字串當作參數傳送出去都會有問題，還是只有英文以外的字串當作參數才會有問題，因此輸入英文字串測試，發現英文字串是可以正確地傳送出去的，所以可以推定這個問題應該發生在英文以外的字串，讓IE 解析失敗。

如果要避免中文字串成為亂碼的問題，必須將中文字串轉換成`UTF-8`，就可以解決這樣的問題。
因此就必須使用到javascript的 `encodeURIComponent()`方法，可以將字串轉換成UTF-8編碼

使用 `encodeURIComponent()`

```
// 關鍵字搜尋
getAutoComplete(keyword) {
    // encoded keyword
    let encodedKeyword = encodeURIComponent(keyword)
    return this.$http.get(this.endpoint + '/search?keyword=' + encodedKeyword)
}
```

加上新的方法之後再試一次，打「出」字，可以看到IE送出的不再是亂碼，而是轉換成UTF-8編碼的文字，也就可以正確地得到API回傳的結果囉
{% asset_img ie-param3.jpg %}