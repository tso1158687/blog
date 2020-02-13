---
title: (DAY-27) Nestjs 異常過濾器(Exception filters)-Angular 與 Nestjs 共舞
date: 2019-10-13 16:40:12
tags: [nestjs]
---
# 什麼是異常過濾器
Nestjs 有一個框架層級的異常處理機制，負責捕捉所有的異常狀態。如果有異常狀態沒有被處理的話，那麼Nestjs的異常處理器便會發出回應，說明某些地方異常出錯了。

![https://ithelp.ithome.com.tw/upload/images/20191013/20120107EsMBXcVK6X.png](https://ithelp.ithome.com.tw/upload/images/20191013/20120107EsMBXcVK6X.png)

因此當有錯誤是沒有被處理的時候，就會回傳預設的錯誤訊息：

```
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

當然，除非是預期之外的錯誤，不然基本上所有可以預期的錯誤都是要去處理的


# 使用異常處理器
Nestjs內建`HttpException`的class去處理捕捉到的異常，可以將捕捉到的異常轉換成相對應的錯誤訊息
如果要使用HttpException，則引入
```
import {HttpException} from '@nestjs/common'
```

現在來測試異常處理器，修改一下取得所有文件的API，假設不管三七二十一，直接拋出錯誤
```
@Get()
getAllDocuments(@Response() res) {
    throw new HttpException('禁止使用', HttpStatus.FORBIDDEN);
}
```

測試一下，錯誤訊息如下
```
{
  "statusCode": 403,
  "message": "禁止使用"
}
```
![https://ithelp.ithome.com.tw/upload/images/20191013/20120107ihtRr7pHE9.png](https://ithelp.ithome.com.tw/upload/images/20191013/20120107ihtRr7pHE9.png)

這是最簡單的自訂錯誤的方法，也可以自訂更多的錯誤訊息

```
@Get()
getAllDocuments(@Response() res) {
    throw new HttpException({
        status: '朕知道了',
        error: '錯誤訊息',
    }, 404);
}
```

測試一下
```
{
  "status": "朕知道了",
  "error": "錯誤訊息"
}
```
![![https://ithelp.ithome.com.tw/upload/images/20191013/20120107Xx7ZbN70TH.png](https://ithelp.ithome.com.tw/upload/images/20191013/20120107Xx7ZbN70TH.png)](http://)


如果覺得這樣的錯誤訊息還是不夠的話，那麼還可以更進階的自訂。因為HttpException是一個class，所以可以自己建立一個class使用`super`來擴充原本的HttpException
```
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

# 更多的例外錯誤處理
除了HttpException之外，Nestjs還有內建很多常見的錯誤處理，減少自行處理的麻煩
* BadRequestException
* UnauthorizedException
* NotFoundException
* ForbiddenException
* NotAcceptableException
* RequestTimeoutException
* ConflictException
* GoneException
* PayloadTooLargeException
* UnsupportedMediaTypeException
* UnprocessableException
* InternalServerErrorException
* NotImplementedException
* BadGatewayException
* ServiceUnavailableException
* GatewayTimeoutException


＃自訂異常過濾器


如果不想使用內建的異常過濾器，想更擁有更多自訂的空間，那麼也可以自己做一個異常過濾器
## 建立自訂過濾器
```
Nest generate filter <filterName>
```

建立一個稱為custom的過濾器
```
nest generate filter custom
```

自訂異常過濾器
```
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

// 捕捉錯誤異常
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 取得內容
    const response = ctx.getResponse(); // 取得回應
    const request = ctx.getRequest(); // 取得請求
    const status = exception.getStatus();




    // 自訂回應內容
    response
      .status(status)
      .json({
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```
* `@Catch()`裝飾器可以告訴Nestjs這個過濾器的內容要綁定到HttpException上面


# 在控制器套用自訂異常過濾器
匯入`@UseFilters`
再度測試取得所有文件的getAllDocuments方法
```
@Get()
@UseFilters(CustomFilter)
getAllDocuments(@Response() res) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

使用postman測試
![https://ithelp.ithome.com.tw/upload/images/20191013/20120107dJgKQ0JGXL.png](https://ithelp.ithome.com.tw/upload/images/20191013/20120107dJgKQ0JGXL.png)



# 在整個系統使用異常過濾器
如果不只在某個控制器使用自訂過濾器而是要在整個系統使用，也可以把自訂的異常過濾器拉到系統層級
`main.ts`
```
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 使用系統層級的過濾器
  await app.listen(3000);
}
bootstrap();
```

# 範例
今天的範例內容可以github上面看到:[範例內容](https://github.com/tso1158687/hello-nest-iron)


# 小結
今天學到的事情有：
* 什麼是異常過濾器
* 如何使用內建的異常過濾器
* 如何自訂異常過濾器