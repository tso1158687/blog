---
title: (DAY-24) Nestjs 服務 (Service)-Angular 與 Nestjs 共舞
date: 2019-10-10 16:40:12
tags: [nestjs]
---
# 為什麼需要服務


在Angular的篇章提到元件(Component)和服務(Service)的差別，元件應該專注在處理顯示頁面的邏輯；服務應該專注在處理資料的取得資料、解析資料等等複雜的業務邏輯。


同樣的概念在Nestjs同樣適用，控制器(Controller)應該專注在如何接收從客戶端傳來的資料，取得資料之後，就應該將資料轉拋到`服務(Service)`去處理。


# 如何建立服務
建立服務的指令和Angular建立服務的指令一樣
```
nest generate service <serviceName>
```

在這裡建立一個名為document的service
```
nest generate service document
```

建立完之後得到一個空白的服務
```
import { Injectable } from '@nestjs/common';




@Injectable()
export class DocumentService {}

```
在Nestjs CLI建立服務的同時，也會同時將建立起來的服務宣告註冊到根模組
`app.module.ts`


引入 DocumentService 
```
import { DocumentService } from './document/document.service';
```

註冊到根模組
```
@Module({
  imports: [....],
  controllers: [........],
  providers: [AppService, DocumentService],
})
```

# 在控制器裡注入服務
回到昨天的documentController
```
export class DocumentController {
    constructor(
        private documentService: DocumentService,
    ) { }
..........
}
```
和Angular注入服務的方法一樣，在建構式當中，將服務加入進來，就可以使用囉!


# 設計與使用服務


首先先將上一篇定義的假資料從控制器搬移到服務
```
import { Injectable } from '@nestjs/common';




@Injectable()
export class DocumentService {
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
        
    }
}

```




接下來建立一個取得所有資料的方法讓控制器呼叫，當控制器呼叫取得所有文件的方法的時候，返回假資料
```
getDocumentData(){
    return this.data
}
```

由於假資料是直接寫在服務裡面，所以沒有非同步的問題，但是之後如果實際串接資料庫，服務在呼叫資料庫查詢資料的時候，就是一個非同步的事件。因此先在這裡改為非同步的方法傳送假資料。
Nestjs同樣整合了`RXJS`，所以一樣可以使用在前幾篇學到的RXJS的`可被觀察對象(Observable)`與`訂閱(Subscribe)`的方法來處理非同步事件
於是稍微修改一下
```
getDocumentData(){
    return of(this.data)
}
```

`of` 是RXJS建立可被觀察對象的方法之一，of可以將裡面的參數轉換成可被觀察的對象
> 使用of需要引用RXJS資料庫，如果沒有自動匯入的話請手動匯入
```
import { of } from 'rxjs';
```

# 修改控制器取得服務的內容


既然服務裡面取得所有資料的方法是使用可被觀察(Observable)的對象的話，那麼控制器就需要訂閱(Subscribe)去取得內容
以取得所有資料為例
```
@Get()
getAllDocuments(@Response() res) {
    this.documentService.getDocumentData().subscribe(data=>{
        res.status(HttpStatus.OK).json(data);
    })
}
```

其他的方法修改方式也相同


使用postman測試，成功使用控制器去呼叫服務取得資料
![https://ithelp.ithome.com.tw/upload/images/20191010/20120107f2yaH5vvDi.png](https://ithelp.ithome.com.tw/upload/images/20191010/20120107f2yaH5vvDi.png)



# 範例
今天的範例內容可以githib上面看到:[範例內容](https://github.com/tso1158687/hello-nest-iron)


# 小結
今天學到的事情有：
* 為什麼需要服務
* 為什麼建立服務
* 如何使用服務
* 如何從控制器呼叫服務