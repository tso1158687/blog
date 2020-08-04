---
title: Page Visibility API - 監聽頁面是否使用的最佳解
date: 2020-08-04 23:45:29
tags: [javascript]
---
# 為何需要知道頁面是否在使用?
在影音網站或是資料即使更新的管理系統，會不斷頻繁發出請求向伺服器

# 如果要監聽頁面是否在使用應該要怎麼做?
在以前會此用focus和blur去判斷頁面是否正在使用。可是這樣的方法有兩個缺點:
1. 使用方法不直覺，有沒有焦點跟判斷是否有在使用無法直接連結
2. 方法還是有缺點，失去頁面焦點並不代表不在使用。例如將畫面分割為兩個視窗:一個視窗工作一個視窗聽音樂，會將焦點放在工作的視窗，但不代表失去焦點的音樂視窗不在使用。

# Page Visibility API
為了解決這個問題，w3c制定了Page Visibility API，來對頁面的變化做監聽。目前此API對於瀏覽器的支援度不錯，幾乎支援所有瀏覽器。連IE都在支援範圍之內

## document.visibilityState
- visible:當前頁面正在使用可見
- hidden:也就是當前頁面並沒有在使用，情況可能是:視窗已經縮小或瀏覽器的頁籤並未在使用

因此如果要知道頁面是否正在使用，即可透過此API去查詢。

## visibilitychange
此事件為得知頁面使用狀態變化的事件，如果document.visibilityState發生變化，便會觸發visibilitychange事件。
如果要使用visibilitychange事件的話
```
document.addEventListener('visibilitychange', () => { 
    if (document.visibilityState === 'visible') { 
        // 做某些事情 
    } else { 
        // 做某些事情 
    } 
});
```

要特別注意的是，當第一次頁面載入的時候，不論使用者是否正在使用頁面，都不會觸發visibilitychange事件，要和第一次的狀態不一樣之後，才會觸發該事件。

另外，如果要和RXJS結合的話，也可以使用fromEvent搭配去監聽各種事件，並做各種組合變化
```
const pageVisibilityChange$ = fromEvent(document, "visibilitychange"); 
pageVisibilityChange$.subscribe(e => { 
  const pageStatus = document.visibilityState; 
  console.log("頁面狀態變換"); 
  console.log(pageStatus); 
});
```
[RXJS範例](https://stackblitz.com/edit/rxjs-hv5hhy)
---
# 參考資料
[MDN-Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

[阮一峰的网络日志-Page Visibility API 教程](http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html)