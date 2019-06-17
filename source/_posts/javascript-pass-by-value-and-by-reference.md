---
title: javascript-pass by value,pass by referance
date: 2018-09-20 23:26:41
tags: [javascript]
---
javascript中有一個很重要但是很容易被初學者所忽略的觀念:`pass by value`, `pass by reference`

假設:
```
var a=1
var b=a
// a=1
// b=1
```
此時，a和b各自是多少?
如果用邏輯表示，可以重新整理這個命題:
1.若a存在，a等於1 (a → 1 )
2.若b存在，b等於a (b → a )
-----------------------------
因此，b等於1 (b → 1 )

接下來，延續剛剛的題目
```
b=4
```
那麼此時a和b各自是多少?
```
//a=1
//b=4
```

這個應該也很好推論，因為b=4所以b=4 (tautology套套邏輯)，而a沒有變動，所以a還是為1
這是一個很簡單的題目。那麼看看下一個例子

假設:
```
var a=[1,2,3]
var b=a
a.push(4)
```
此時，a和b各自是多少
```
// a=[1,2,3,4]
// b=[1,2,3,4]
```
同樣的邏輯套用在這裡和答案竟然不一樣了，是不是很奇怪。這就是javascript所謂的`pass by value`, `pass by reference`

### pass by value
翻應成中文就是傳值的意思，變數之間的資料傳遞，都是在傳送「數值」，也是就是說
a=4
b=a，這個b等於a的時候，他並不是b就是a的意思，而是說b等於a的「數值」，a的數值是4，所以b等於4。
因此當a=5的時候，b並不會也跟著改變成5，因為b不等於a，所以不會跟著a而變動。



### pass by reference
翻譯成中文，就是「傳參考的意思」
舉一個簡單易懂的例子，這是一張柯文哲的圖片，取一個代號叫作pictureKP

{% asset_img kp1.jpg %}

```
var 柯市長=pictureKP
var 柯P=柯市長
```
因此我們可以知道`柯P=柯市長=pictureKP`

此時柯市長(注意是柯市長不是柯P)因為心情好戴了帽子

{% asset_img kp2.jpg %}

可以將柯市長戴帽子這個行為用程式表示`pictureKP.push('hat')`
所以現在柯P有戴帽子的還是沒有戴帽子的呢?
這時候應該就可以毫不猶豫說出答案，柯P當然是沒有戴帽子的，因為我們所說的柯市長或是柯P都是指向同一個人，只是用不同的名稱去稱呼他而已，所以當柯市長穿了鞋子，也就是在說柯P穿了鞋子。

這樣的做法稱為`by reference`，也就是傳參考，也就是說幫你所要指涉的東西起個名字而已
因此當`a=[1,2,3]`，`b=a`的時候，翻譯成文字就是:你可以把[1,2,3]這個陣列稱作a喔，然後你也可以把[1,2,3]這個陣列稱作b喔。
所以當a.push(4)的時候，就等同於b.push(4)，因為他們指涉是同一個陣列



所以什麼時候是by value，什麼時候是by reference
說到這裡一定有一個疑問，什麼時候
所以什麼時候by reference、什麼時候by value呢?
如果有仔細觀察的話，相信可能已經推出答案。
當變數是原始類別，例如:`數字、字串、布林`就是傳值(by value)；相對地，如果變數是`物件或陣列`就是傳參考(by reference)

相信以柯P為例子應該會清楚明白多



### 參考資料:
[[筆記] 談談JavaScript中by reference和by value的重要觀念](https://pjchender.blogspot.com/2016/03/javascriptby-referenceby-value.html)

