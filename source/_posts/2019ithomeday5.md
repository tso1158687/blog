---
title: (DAY-5) Angular元件資料的顯示與應用- ngFor, ngIf-Angular 與 Nestjs 共舞
date: 2019-09-21 23:54:39
tags: [angular]
---
在上一篇有提到，可以使用花括號(`{{ }}`)綁定值，這個有正式的名稱，稱為`插值法(Interpolation)`
花括號裡面寫的屬性，Angular會搜尋對應的內容並且替換
# 插值法(Interpolation)
## 插值法的基本用法
例如:


`main.component.html`

```
<p>
  我的名字是 {{name}}
</p>
```

Angular將會尋找稱為name的屬性，並且將值替換上去


`main.component.ts`
```
name = 'jason'
```


因此最後會顯示為:

```
我的名字是 jason
```


插值法不僅能顯示文字的內容，也能使用在顯示圖片

```
<div><img src="{{itemImageUrl}}"></div>
```


這樣圖片的路徑就會隨著屬性itemImageUrl的不同跟著變動。


## 插值法的更多應用


可以做簡單的數學運算:

```
<p>1 + 1 的答案是 {{1 + 1}}</p> // 2
```


### 可以呼叫方法
```
<p>今天是 {{getWeekDay('六')}}</p> //今天是星期六
```

```
  getWeekDay(weekDay){
    return `星期 ${weekDay}`
  }
```


### 可以二元判斷

```
<p>今天是 {{goodDay? '晴天':'雨天'}}</p> // 晴天
```

```
goodDay = true
```


# 使用ngFor顯示多筆資料


假設現在有一筆陣列的資料
```
  heros = [
    { name: '兩斤勘吉', age: 35 },
    { name: '秋本麗子', age: 25 },
    { name: '野比大雄', age: 12 },
    { name: '江戶川柯南', age: 8 }
  ];
 ```


這時候就可以使用ngFor來顯示英雄的名字與年紀
```
<h1>
  使用ngFor顯示陣列內容
</h1>
```


```
<div *ngFor="let hero of heros">
    <div>
        名字: {{hero.name}}
    </div>
    <div>
        年齡: {{hero.age}}
    </div>
    ===========
</div>
```

顯示出來的內容:
![https://ithelp.ithome.com.tw/upload/images/20190921/20120107doUwzyG57p.png](https://ithelp.ithome.com.tw/upload/images/20190921/20120107doUwzyG57p.png)



# 使用ngIf顯示隱藏資料
ngIf可以依照條件顯示或隱藏內容
再繼續剛剛的例子，假如被抗議不能顯示未成年的英雄的姓名及年齡，那麼就必須使用條件將未滿18歲的英雄隱藏起來，這時候就可以使用ngIf去做判斷


如果here.age大於18，結果為true就會顯示，反之，hero.age小於18，結果為false，就會移除不顯示
```
<h1>
  使用ngFor顯示陣列內容
</h1>
```



```
<div *ngFor="let hero of heros">
  <div *ngIf="hero.age > 18">
    名字: {{hero.name}}
  </div>
  <div *ngIf="hero.age > 18">
    年齡: {{hero.age}}
  </div>
  ===========
</div>
```
顯示出來的內容:
未滿18歲的大雄與柯南就被移除了
![https://ithelp.ithome.com.tw/upload/images/20190921/20120107QGugUH3NkE.png](https://ithelp.ithome.com.tw/upload/images/20190921/20120107QGugUH3NkE.png)



# 小結
* 插值法的基本用法，顯示綁定的資料
* 插值法的更多用法，除了顯示綁定的資料，亦可以做簡單的運算、方法及二元判斷式
* 使用`ngFor`處理多筆資料
* 使用`ngIf`處理資料顯示的條件