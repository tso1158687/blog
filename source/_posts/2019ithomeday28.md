---
title: (DAY-28) Nestjs 中介層(Middleware)-Angular 與 Nestjs 共舞
date: 2019-10-14 16:40:12
tags: [nestjs]
---
# 什麼是中介層 (Middleware)

中介層(Middleware)是在客戶端發出請求至控制器的路由之前的方法
![https://ithelp.ithome.com.tw/upload/images/20191014/20120107ZuYdkSXXHW.png](https://ithelp.ithome.com.tw/upload/images/20191014/20120107ZuYdkSXXHW.png)



中介層可以在控制器的路由收到請求之前，取得請求內容，對於請求內容做加工和修改。如果有使用過express的開發者一定對中介層不陌生，Nestjs的中間層完全等同於expres的中介層
如果沒有使用過express也不用擔心，以下是擷取於express官方網站對於中介層的介紹:
> - 執行任何程式
> - 對請求和回應做出修改
> - 結束請求和回應的生命週期
> - 如果中介層有多個的話，執行下一個中介層


# 建立中介層
使用Nestjs CLI 建立中介層
```
nest generate middleware <middlewareName>
```

在此建立一個名為log的中介層
```
nest generage middleware log
```

建立一個空白的中介層
```
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
```
特別要提到的是，`next方法呼叫之後才會繼續執行`，如果呼叫next方法的話，所有的行為就會停在這裡
# 使用中介層
## 設定中介層
建立完中介層之後，首先要先設定中介層，設定中介層使用在哪個模組
在這裡設定中介層使用在根模組`app.module.ts`
```
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
```
* 中介層使用方法跟其他的控制器、管道等等不一樣，使用`configure`' 方法去設定
* 在AppModule裡面實作NestModule介面，可以讓Typescript檢查有沒有錯誤
在configure方法裡面可以設定使用哪個中介層並且套用在哪個控制器
```
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LogMiddleware) // 使用LogMiddleware
    .forRoutes(DocumentController); // 套用在DocumentController
  }
}
```
* 使用apply方法指定使用哪個中介層
* 使用forRoutes方法決定套用哪個控制器


## 修改中介層
對中介層做小小的修改，加入console看看回不會出現東西
```
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('通過中介層')
    next();
  }
}
```

在中介層之中可以做很多事情，例如假如有請求進來的話，就可以打另外的API，紀錄API的使用狀況。


使用postman測試
![https://ithelp.ithome.com.tw/upload/images/20191014/20120107Dze73nKmPY.png](https://ithelp.ithome.com.tw/upload/images/20191014/20120107Dze73nKmPY.png)



## 中介層的更多設定
```
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LogMiddleware) // 使用LogMiddleware
    .forRoutes(DocumentController); // 套用在DocumentController
  }
}
```
中介層的`forRoutes`，不只有指定某個控制器，還有多種設定方法
* 指定控制器，EX:` forRoutes(DocumentController) `
* 指定路由，EX:` forRoutes('document') `
* 指定路由與方法，EX:`forRoutes({path: ' document ', method: RequestMethod.GET })`
* 使用萬用符號，EX:`forRoutes({ path: 'do*nt', method: RequestMethod.ALL })`，這樣的話，不論是document、doant、doaaaant都會使用到
# 範例
今天的範例內容可以github上面看到:[範例內容](https://github.com/tso1158687/hello-nest-iron)


# 小結
今天學到的事情有：
* 什麼是中介層
* 如何使用中介層
* 如何用不同的方法使用中介層