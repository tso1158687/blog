---
title: (DAY-12) Angular-RXJS非同步事件的好幫手2-Angular 與 Nestjs 共舞
date: 2019-09-28 16:40:12
tags: [angular]
---
上一篇提到什麼是RXJS和RXJS的基本觀念，這一篇要來實際操作RXJS。

在進入實際操作之前，還要來提RXJS方便的地方-`運算子(Operators)`

# 什麼是運算子
針對可被觀察的對象(Observable)所要傳遞的內容再做進一步的處理，因為觀察不一定需要所有的資料，可以在到觀察者之前，預先做處理。

![https://ithelp.ithome.com.tw/upload/images/20190928/20120107Opk5oytoti.png](https://ithelp.ithome.com.tw/upload/images/20190928/20120107Opk5oytoti.png)

以生活中的例子舉例：
假設感冒了去看醫生，在看到醫生之前。會有護理人員幫你預先做一些處置。假如發燒了，會先幫你量體溫;假如一直咳嗽，會先問你可多久了，有沒有痰之類的問題。
這樣一來，進去診療室，醫護人生可以直接告訴醫生狀況，醫生就可以很快速遞掌握病情，加快整個整療的速度。

在這個例子中，可被觀察對象(Observable)就是病人。而護理人員就是運算子(Operators)預先做各種處置，篩選出重要的資訊。而醫生就是觀察對象(Observer)，可以直接得到他判斷病情所需要的關鍵資訊。

以前兩天取得的英雄列表的API為例子：
```
{
  "status": 200,
  "data": [
    {
      "name": "兩津勘吉",
      "age": 35
    },
    {
      "name": "秋本麗子",
      "age": 25
    },
    {
      "name": "野比大雄",
      "age": 12
    },
    {
      "name": "江戶川柯南",
      "age": 8
    }
  ]
}
```


實際上，我們就像例子中的醫生一樣，並不需要所有的資訊。我們所需要的只有data裡面的英雄資料，這時候就可以使用運算子處理，將不必要的資料去掉，只留下需要的資料
匯入map運算子：
```
import { map } from 'rxjs/operators'
```
使用map運算子處理資料：
```
this.dataService
  .getData()
  .pipe(map(e => e.data)) // 使用map運算子
  .subscribe(data => {
    this.heros = data; 
  });
```
在這裡使用`map`運算子，就和Javascript的map一樣，可以過濾掉不必要的資料。在這裡不再特別說明map的使用方法，只針對運算子的使用方法特別說明：
* 所有的運算子都會包在pipe的方法之中，pipe可以想像成是一種管道，幫你做資料處理、轉換的管道
* Angular已經整合RXJS的主要功能，所以在使用RXJS的時候，不必特別匯入或設定。
* 運算子一次不只能用一個，可以用好多個，自由的搭配
* 使用運算子的時候要個別匯入想要使用的運算子。匯入的方法為：
```
import { 運算子名稱 } from 'rxjs/operators'
```
# 常用到的運算子
RXJS目前大約有一百個運算子。不過不用擔心，下圖是外國網友統計出大家常用的運算子，常用的運算子大約只有21個。
![https://ithelp.ithome.com.tw/upload/images/20190928/20120107Nv5FJ6UC6A.png](https://ithelp.ithome.com.tw/upload/images/20190928/20120107Nv5FJ6UC6A.png)


所以不必擔心一定要把一百多個運算子學完才能使用RXJS，就好像數學學了那麼多公式，最終最常用的只有加減乘除，忘記公式，還是可以運用加減乘除的各種組合，求得我們所需要的答案。記得公式只要讓你運算起來可以更快一點。

今天的重點在範例內容，範例內容裡面有很多RXJS的運算子運用，可以試著把註解打開，看看右下角的console顯示的內容有沒有什麼變化
* take
* takeLast
* skip
* skipLast
* map
* mapTo
* filter
* Merge

![https://ithelp.ithome.com.tw/upload/images/20190928/20120107CEUdu0Nsnb.png](https://ithelp.ithome.com.tw/upload/images/20190928/20120107CEUdu0Nsnb.png)

# 線上範例
今天的範例內容可以在這裡看到:
* [範例內容1（搭配運算子使用取得英雄列表）](https://stackblitz.com/edit/angular-iron-jason-d12?file=src/app/app.component.ts)
* [範例內容2（運算子使用的範例）](https://stackblitz.com/edit/angular-kq19yh?file=src/app/rxjs/rxjs.component.ts)

# 小結
今天學到的事情有：
* 什麼是運算子
* 如何使用運算子
* 認識常用的運算子

透過短短的兩篇介紹，快速介紹RXJS重要的基本觀念與使用方法，希望可以很快地好好地處理非同步事件。