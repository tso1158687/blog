---
title: 如何偵測使用者的裝置是否為行動裝置
date: 2019-03-10 23:47:54
tags: [javascript,es6]
---
如何為不同裝置的使用者量身打造專屬的頁面?一般而言以解析度作為判斷的依據。如果裝置的寬度大於或小於某個解析度就會切換至不同的模式。例如:bootstrap判斷的解析度斷點以`576(xs)`、`768(sm)`、`992(md)`三種大小來分別判斷為手機、平板、電腦三種裝置。這樣的做法有個缺點:假設使用者使用電腦時將頁面的寬度縮小至992以下，頁面因為判斷到觸發的斷點而切換至平板模式。可是今天有個需求是這樣，部分的功能我只對手機的使用者開放或隱藏，也就是說:不論電腦或平板的使用者將頁面如何縮放，即使判斷到手機的斷點，仍舊開放或不開放某個功能給使用者使用。因此以使用者的螢幕寬度作為判斷，不是一個很牢靠的判斷方式。

既然無法使用css的media query去判斷頁面的寬度作為依據的話，只好使用javascript去偵測使用者的裝置是什麼了。於是在stackoverflow找到解決辦法:

{% asset_img 01.png %}

這個辦法蠻聰明的，偵測瀏覽器的`userAgent`有沒有包含行動裝置的關鍵字，如果偵測到相關的關鍵字。則返回`true`，反之返回`false`。利用得到的布林值就可以很輕易地使用判斷式去判斷某些專屬的功能可不可以被執行。

### stackoverflow的解決辦法
```
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
```

這樣問題就決了。可是這樣的寫法有點複雜又不簡潔，例如在if判斷式中，幾乎每個判斷式都長得一模一樣navigator.userAgent.match(xxx)，只有判斷的關鍵字不一樣。重複做了七次一樣的事情除了看起來不舒服占了很多行數之外，在維護方面，非常難以維護。接下來還要想辦法讓這個判斷的功能更優雅、更簡潔一點，造福未來維護的自己。


### step1:

既然同樣的事情要重複做七次，那麼馬上想到使用迴圈去做重複的事情。於是先把要檢查的裝置轉換成陣列儲存起來。
```
function isMobileDevice(){
    var mobileDevices = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
}
```

### step2:
再來新增一個變數，用來儲存判斷之後的結果，預設為false，不是行動裝置
```
function isMobileDevice(){
    var mobileDevices = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
    var isMobileDevice=false
}
```

### step3:
接下來開始實作迴圈的功能。如果判斷到符合關鍵字則將isMobileDevice的變數改為true，是行動裝置
```
function isMobileDevice(){
    var mobileDevices = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
    var isMobileDevice=false
    for(var i=0;i<mobileDevice.length;i++){
        if(navigator.userAgent.match(mobileDevice[i])){
            isMobileDevice=true
        }
    }
}
```


### step4:
最後只要把結果返回，一切就大功告成啦!
```
function isMobileDevice(){
    var mobileDevices = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
    var isMobileDevice=false
    for(var i=0;i<mobileDevice.length;i++){
        if(navigator.userAgent.match(mobileDevice[i])){
            isMobileDevice=true
        }
    }
    return isMobileDevice
}
```

這樣看起來是不是比原本的還要直覺、簡潔了呢?還有更直覺、更美觀的寫法!
使用`ES6`吧!

### 使用es6-step1:
使用const取代var讓變數的意義與作用範圍更明確
```
function isMobileDevice() {
    const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
}
```

### 使用es6-step2:
原本使用for迴圈的目的，在於歷遍陣列中所有的裝置，只要其中有任何一個裝置符合，isMobileDevice就為true，反之為flase。我們最終要的結果，就是要知道`isMobileDevice是true或false`
`只要能達成目的，也就是取得isMobileDevice的值`，過程中使用什麼方法則顯得不那麼重要。所以就可以捨棄for迴圈的方法，改使用es6的`some()`一樣可以達成目的，而且更輕鬆喔。

```
function isMobileDevice() {
    const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
    let isMobileDevice = mobileDevice.some(e => navigator.userAgent.match(e))
    return isMobileDevice
}
```
少去繁雜的迴圈與判斷式，整個程式看起來更簡潔，並且維持一樣的效果，這樣就大功告成啦!

### 總結:
最初的目的只是想找找有沒有更精準判斷使用者裝置是否為行動裝置的方法，雖然在stackoverflow上面找到不錯的解決辦法，但是總不能只是一個會複製貼上的傢伙，還是要有一點自己的主見。想到有更好的寫法，於是一步一步記錄下我的思考過程。方法雖然沒有很難，但是也花了一兩年的時間不斷地在練習和消化，希望可以分享給大家一起參考、一起學習。
