---
title: (DAY-29) Angular 與 Nestjs 前後端合體技-Angular 與 Nestjs 共舞
date: 2019-10-15 16:40:12
tags: [nestjs]
---
瞭解了這麼多Angular與Nestjs的相關知識之後，再來要想辦法將一個前端與一個後端融合在一起。
# 如何融合
要如何融合在一起呢?預計要做以下幾件事情
* Angular可以使用HttpClient去呼叫API取得所有書籍的資料
* Nestjs可以獲得Angular發送過來的請求，將書籍的資料返回
* Angular接受到Nestjs返回的資料
* Angular綁定返回的資料，使用`ngFor`顯示所有書籍的資料
# Nestjs 設定
Nestjs有一個`Serve Static`可以讓Nestjs去讀取像Angular、React、Vue 這樣的`SPA(Single Page Application)`頁面


## 安裝Serve Static
```
npm install --save @nestjs/serve-static
```

## 使用Serve Static
安裝完之後，到AppModule設定相關設定
```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'; //匯入ServeStaticModule
import { join } from 'path'; //匯入nodejs相關功能

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
在`@Module`裝飾器裡面匯入ServeStaticModule，裡面的語法的意思簡單來說就是:取得頁面的位置，頁面所在的資料夾為client


再來至`main.ts`
因為這樣的設定等於前端和後端都在同一個專案啟動，為了避免前端與後端混在一起，所以加上`api`的前綴來區分後端
```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 幫後端的API加上前綴
  await app.listen(3000);
}
```

## 設定Angular
首先先設定服務，取得資料
```
export class DataService {

  constructor(
    private http: HttpClient
  ) { }
  getData() {
    const url = 'api/document'
    return this.http.get(url)
  }
}
```
因為已經設定前綴，所以記得加上api


再來到取得資料的元件`document.component.ts`
```
ngOnInit() {
    this.dataService.getData().subscribe(e => {
        console.log('從nestjs取得api資料囉')
        console.log(e)
        this.data = e
    })
}
```
元件啟動的時候，從服務取得資料
`document.component.html`
```
<p>
  書籍清單
</p>
<ul >
  <li *ngFor="let doc of data">
    書籍:{{doc.name}}。作者:{{doc.author}}
  </li>
</ul>
```



最後將取得的資料顯示在頁面上
寫完前端的檔案，別忘了輸入以下指令
```
ng build --prod
```
將正式的檔案編譯出來，並且將編譯的檔案放到client的資料夾當中


# 測試
啟動Nestjs測試，是否取得資料
![https://ithelp.ithome.com.tw/upload/images/20191015/20120107NYATJBNq5y.png](https://ithelp.ithome.com.tw/upload/images/20191015/20120107NYATJBNq5y.png)

可以看到服務(service)成功取得資料
再來切換到netwrok頁籤，來看看API的路徑，的確就是Nestjs設定的路徑

![https://ithelp.ithome.com.tw/upload/images/20191015/20120107H61w3JLMXI.png](https://ithelp.ithome.com.tw/upload/images/20191015/20120107H61w3JLMXI.png)


# 範例
今天的範例內容可以github上面看到:[範例內容](https://github.com/tso1158687/hello-nest-iron)
 
# 小結
今天學到的事情有：
* 如何結合Angular與Nestjs
* 使用Nestjs的 Serve Static取得前端頁面
* 如何使用Angular取得Nestjs資料