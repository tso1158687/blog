---
title: 如何在SPA網站使用gtag
date: 2018-04-29 23:52:37
tags:
---


### 使用說明
#### 1.在`header`後的第一行加上`gtag`程式碼

```
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=gtagID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
</script>
```

一般來說，這段監測程式碼加上去，就可以正確地偵測到網站使用的情形了。
但是對於像angularjs、angular等這種SPA的網站來說，卻有一個大問題。就是在網站內切換網頁的時候，並不是真正的對伺服器發出request，而是透過javascript判斷切換router，而產生相對應的內容。因為對gtag來說，因為沒有發出request，他並不會知道你切換網頁了。可是這樣我們就永遠只會得到跟目錄下的資料，無法準確地得知使用者使用網站的情形，所以還需要下列步驟

#### 2.在`app.js`裡面

#### 2-1在angular.run的地方載入`$location`, `$window`

#### 2-2在angular.run裡面加入以下程式碼

```
$rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
    if ($location.$$host !== 'localhost' && process.env.NODE_ENV === 'production') {
        $window.gtag('config', 'gtagID', {'page_path': $location.path()})
    }
})
```
#### 簡單說明:
rootscopr監測到router切換成功，會進入判斷式判斷網址是不是localhost。
如果不是就會呼叫ga的function，告訴它已經切換網頁了
這樣就會正確抓到使用者在各個頁面下的資料了

### 參考資料
中文:
https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications

英文:
https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications