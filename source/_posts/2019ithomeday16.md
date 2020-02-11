---
title: (DAY-15) Angular的資料轉換-管道(pipe)-自訂管道-Angular 與 Nestjs 共舞
date: 2019-10-02 16:40:12
tags: [angular]
---
上一篇提到如何使用Angular內建的管道。Angular內建的管道固然很實用，但是不能涵蓋全部的使用情境，如果沒有涵蓋到，就自己來定義一個管道吧

# 事前準備
```
heros = [
    { name: '大雄', score: 0 },
    { name: '靜香', score: 90 },
    { name: '胖虎', score: 50 },
    { name: '小夫', score: 70 },
    { name: '小杉', score: 100 },
]
```
現在要來做一個轉換的管道來顯示考試結果
- 超過80分顯示:高分
- 超過60分、未滿80分:低分及格
- 未滿60分:不及格

# 如何建立自訂的管道
## 建立管道
```
ng generate pipe <pipeName>
```
建立score管道
```
ng generate pipe score
```
Angular CLI 建立管道的時候，會自動宣告新建立的管道。(如果沒有可以自行宣告)
`app.module.ts`
```
@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, HelloComponent, ScorePipe], // 宣告score pipe
    bootstrap: [AppComponent]
})
```



接下來來到score pipe
`score.pipe.ts`
```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'score'
})
export class ScorePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return null;
    }
}
```
這是一個新建立好，空白的管道
```
@Pipe({
    name: 'score'
})
```
@pipe裡面有一個`name`的屬性，指定管道的名字。Angular CLI在建立的時候，會自動填上名字。如果不喜歡可以在這裡修改。

再來看到管道的轉換內容:
```
export class ScorePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return null;
    }
}
```

可以看到有一個`transform`的方法轉換資料，此方法接受兩個參數:`value`,`args`
- value:為原始資料，是必填選項
- args:為管道的參數
透過value參數取得原始資料，然後做處理之後，最後`return`返回處理後的結果。

因此就來寫一個簡單的分數轉換:
```
export class ScorePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value >= 60 && value < 80) {
            return "低分及格";
        } else if (value > 80) {
            return "高分";
        } else {
            return "不及格";
        }
    }
}
```

使用簡單的if判斷式，判斷結過之後，將轉換的結果return返回。

回到html頁面，套上score pipe看看結果
```
<div>
    <h2>自訂管道</h2>
    <span *ngFor="let hero of heros">
        <p>{{hero.name}}</p>
        <p>原始分數:{{hero.score}}</p>
        <p>轉換結果:{{hero.score | score}}</p>
        ================
    </span>
</div>
```


一個簡單的轉換分數的管道就完成了!

# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d15?file=src%2Fapp%2Fscore.pipe.ts)

# 小結
今天學到的事情有：
- 如何建立管道
- 如何自訂管道

