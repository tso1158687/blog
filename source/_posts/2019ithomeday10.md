---
title: (DAY-10) Angular-使用HttpClient取得資料-Angular 與 Nestjs 共舞
date: 2019-09-26 16:40:12
tags: [angular]
---
在上一篇提到，所有存取資料的操作都應該在服務(Service)完成，元件(Componet)不應該負責存取資料，只應該負責如何顯示資料與畫面上的操作。


因此建立一個服務並且將英雄的資料定義在服務裡面。由元件呼叫服務，將英雄的資料傳送給元件。


到目前為止，都是將英雄的資料寫在Angular裡面，不論是寫在元件或是服務裡面。將資料寫在Angular裡面是為了方便解說各項功能的假資料。在真實的網站，所以的資料基本上都是透過`呼叫API取得`真實資料。


`呼叫API取得資料`就會將事情變得比較複雜。就得面對然後處理以下兩件事情:
1. 處理AJAX行為
2. 處理非同步事件


本篇將只會探討第一個處理AJAX行為，第二個處理非同步事件會稍微帶過，之後再來專門討論如何好好地處理非同步事件。


# 什麼是HttpClient 
HttpClient 是Angular 內建專門處理AJAX的模組，負責處理用API 溝通取得資料的複雜流程。有了這個模組，只要呼叫這個模組，就可以幫我們處理完整個複雜的流程囉


# 匯入HttpClient 
`app.module.ts`
```
import { HttpClientModule }    from '@angular/common/http';
```

並且在imports裡面，將HttpClientModule匯入
```
@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule ],// 將HttpClientModule匯入到Angular裡面
  declarations: [ AppComponent, HelloComponent, HeroComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataService]
})
```

![https://ithelp.ithome.com.tw/upload/images/20190926/20120107tNbUMms1Pf.png](https://ithelp.ithome.com.tw/upload/images/20190926/20120107tNbUMms1Pf.png)
# 使用HttpClient 取得資料
將HttpClient的模組匯入Angular當中之後，就要開始使用HttpClient在之前已經建立好的服務-dataService


`data.service.ts`
```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //匯入HttpClient模組

@Injectable({ providedIn: 'root', })
export class DataService {

  constructor(
    private http: HttpClient //將HttpClient注入
  ) { }
  getData() {
    const httpOptions = {
      headers: new HttpHeaders({ 'secret-key': '$2b$10$WwqX.02qchXGVG/hhiNyTu3caiRdObjIZcMFdFr4G1bwm9vEZMNN.' })
    }; //自己架的API需要的header，可以略過不看
    const url='https://api.jsonbin.io/b/5d8cc016ef78a919ccb52682/3'
    return this.http.get(url,httpOptions) //使用get方法取得資料
  }
}
```

1. 同樣將HttpClient模組匯入到DataService
2. 在constructor將HttpClient模組注入，並且簡稱為http
3. 修改getData的方法，利用get方法取得非同步資料


再來回到從dataService取得取得資料的`app.component.ts`
修改取得資料的方法
```
  ngOnInit() {
  //  this.heros = this.dataService.getData()
    this.dataService.getData().subscribe(res => {
      console.log(res) //可以打開console看看資料室什麼
      this.heros = res.data
    
    })
  }
```


這裡一定會覺得很奇怪，為什麼使用`subscribe`去取得資料。Angular處理非同步的事件時，使用`RXJS`來處理非同步事件。簡單來說，處理非同步事件，一定要有人訂閱(subscribe)才會開始啟動。這是RXJS的設計模式。
關於更多RXJS的部分，下一篇會再詳細介紹。
今天主要的目的，只要能成功取得API回傳的資料就好了!


成功利用HttpClient去打API取得資料
![https://ithelp.ithome.com.tw/upload/images/20190926/20120107AZ6WXCeoCP.png](https://ithelp.ithome.com.tw/upload/images/20190926/20120107AZ6WXCeoCP.png)

# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d10?file=src/app/data.service.ts)


# 小結
今天學到的事情有：
* 為什麼需要HttpClient
* 如何使用HttpClient
* 如何使用HttpClient取得外部資料
