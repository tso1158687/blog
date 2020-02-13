---
title: (DAY-23) Nestjs 控制器 (Controller)-Angular 與 Nestjs 共舞
date: 2019-10-08 16:40:12
tags: [nestjs]
---
# 什麼是控制器(Controller)
還記得在Angular的時候有提到元件(Component)嗎?
元件就像樂高的一小塊積木，如果設計的好，就可以和其他元件自由組合。
一個基本的元件會包含:
* html:元件顯示的內容
* css:元件顯示的樣式
* typescript:元件的邏輯內容
![https://ithelp.ithome.com.tw/upload/images/20191009/20120107BP3f5U1Lmw.png](https://ithelp.ithome.com.tw/upload/images/20191009/20120107BP3f5U1Lmw.png)

Nestjs為後端的框架，沒有元件要處理的顯示內容與樣式，因此不稱為元件(Component)，而稱為`控制器(Controller)`。
控制器負責處理傳入的請求(request)，並且回傳對於請求的結果


# 建立控制器


利用Nestjs CLI 建立控制器，指令為:
```
nest generate controller <controllerNmae>
```

現在建立一個處理文件的控制器，稱為document
```
nest generate controller document
```

# 設定控制器
一個空白的控制器建立起來了
```
import { Controller } from '@nestjs/common';




@Controller('document')
export class DocumentController {}
```

## 設定控制器的路由
和Angular一樣，使用裝飾器來表示檔案的類型是控制器，在裝飾器裡面可以加上參數，Nestjs CLI 會自動幫我們加上參數
```
@Controller('documents')
```

參數表示API的路由，假如在本機的開發環境使用時，連接到路徑的時候，就會由控制器控制，例如:
```
http://localhost:3000/document
```

## 事前準備-定義假資料
由於只是初體驗，所以先在控制器定義假資料
```
data = [
        {
            name: '存有與虛無',
            author: '沙特',
            id: 1
        },
        {
            name: '單子論',
            author: '萊布尼茲',
            id: 2
        },
        {
            name: '物不遷論',
            author: '僧肇',
            id: 3
        },
        {
            name: '道德經',
            author: '老子',
            id: 4
        }
    ]
```

# 建立CRUD API
CRUD就是`create`, `read`, `update`, `read`四種API常見的方法，現在就要來建立這四種方法的API
在開始之前，先引入Nestjs處理好的模組

```
import { Controller, Get, Post, Patch, Delete, Param, Body, Response, HttpStatus } from '@nestjs/common';
```

從引入的關鍵字就可以看出來，今天要做的內容


## 取得所有內容
```
@Get()
getAllDocuments(@Response() res) {
    res.status(HttpStatus.OK).json(this.data);
}
```
* 在方法之前加上裝飾器，代表使用這支API的方法，例如這裡使用`@Get()`代表要使用get方法才會配對到getAllDocuments這個方法
* 在getAllDocuments加入參數`@Response()`表示這個方法是會回傳東西到客戶端，在這裡另外設定res簡稱這個方法
* 啟動getAllDocuments的方法後，就會回傳狀態碼`HttpStatus.OK`(這是一個enum，會轉換成200)，並且將假資料轉換成json格式回傳


利用postman測試
![https://ithelp.ithome.com.tw/upload/images/20191009/20120107biHUMkmcZa.png](https://ithelp.ithome.com.tw/upload/images/20191009/20120107biHUMkmcZa.png)



## 取得單筆資料
```
@Get('/:id')
getDocument(@Param() param, @Response() res) {
    let resData = this.data.filter(data => data.id === Number(param.id)) // 特別注意，所有的參數都是字串
    res.status(HttpStatus.OK).json(resData);
}
```
* 取得單筆資料，利用id作為取得的依據，所以加上id作為變數`@Get('/:id')`
* 為了取得參數，使用 `@Param()`方法取得參數，並稱呼為param。如此一來就可以使用param.id，就可以取到id參數
* 再來就是利用Javascript的filter方法做簡單的資料篩選
* 這裡有一個特別要注意的地方，所有的參數不論原本輸入什麼，都會被轉換成字串，如果要比對資料，例如本例子的數字，要將字串轉換成數字才有辦法比對。


現在來示範取得編號id為1的資料
![https://ithelp.ithome.com.tw/upload/images/20191009/20120107m3B5fnGcDI.png](https://ithelp.ithome.com.tw/upload/images/20191009/20120107m3B5fnGcDI.png)

## 新增資料
```
@Post()
addDocument(@Response() res, @Body() document) {
    // 做些什麼
    res.status(HttpStatus.CREATED).json(document);
}
```
* 新增資料使用`@Post` post方法
* 新增資料一般而言都會將新增的資料放在body裡面，所以使用`@Body()`取得新增的資料，並且使用document稱呼
* 在這裡不處理新增的細節，只專注在API處理的部分
* 新增成功後將成功的狀態改成`HttpStatus.CREATED`(201)表示建立成功，並且直接回傳新增內容。


在這裡新增一筆資料測試:
![https://ithelp.ithome.com.tw/upload/images/20191009/20120107u8ye1Ae6Fd.png](https://ithelp.ithome.com.tw/upload/images/20191009/20120107u8ye1Ae6Fd.png)

## 更新資料
```
@Patch('/:id')
updateDocument(@Param() params, @Response() res, @Body() document) {
    // 做些什麼
    res.status(HttpStatus.OK).json(document);
}
```
* 更新資料和新增資料流程一樣，只不過將post方法換成patch `@Patch() `
## 刪除資料 
```
@Delete('/:id')
deleteDocument(@Param() param, @Response() res) {
    // 做些什麼
    res.status(HttpStatus.OK).json(document);
}
```
* 刪除資料的方法也一樣，將方法換成` @Delete() `


# 範例
今天的範例內容
```
import { Controller, Get, Post, Patch, Delete, Param, Body, Response, HttpStatus } from '@nestjs/common';




@Controller('document')
export class DocumentController {
    data = [
        {
            name: '存有與虛無',
            author: '沙特',
            id: 1
        },
        {
            name: '單子論',
            author: '萊布尼茲',
            id: 2
        },
        {
            name: '物不遷論',
            author: '僧肇',
            id: 3
        },
        {
            name: '道德經',
            author: '老子',
            id: 4
        }
    ]
    @Get()
    getAllDocuments(@Response() res) {
        res.status(HttpStatus.OK).json(this.data);
    }




    @Get('/:id')
    getDocument(@Param() param, @Response() res) {
        let resData = this.data.filter(data => data.id === Number(param.id))
        res.status(HttpStatus.OK).json(resData);
    }
    @Post()
    addDocument(@Response() res, @Body() document) {
        // 做些什麼
        res.status(HttpStatus.CREATED).json(document);
    }




    @Patch('/:id')
    updateDocument(@Param() params, @Response() res, @Body() document) {
        // 做些什麼
        res.status(HttpStatus.OK).json(document);
    }




    @Delete('/:id')
    deleteDocument(@Param() param, @Response() res) {
        // 做些什麼
        res.status(HttpStatus.OK).json(document);
    }
}
```

# 小結
今天學到的事情有：
* 什麼是控制器(Controller)
* 如何建立控制器
* 如何建立CRUD的API