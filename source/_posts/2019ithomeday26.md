---
title: (DAY-26) Nestjs 管道(Pipe) 2- 轉換資料-Angular 與 Nestjs 共舞
date: 2019-10-12 16:40:12
tags: [nestjs]
---
上一篇提到使用管道來驗證資料，在傳送資料進入到控制器之前，先驗證資料是否正確，以前做無謂的功或者避免因為缺少資料讓後面的流程爆炸。
管道除了用來驗證資料以外，也可以用來轉換資料。


# 什麼時候會用到管道來轉換資料
管道在轉換的時候，可以完全覆蓋原本傳送過來的值。就可以想像到一種使用情境：例如從客戶端傳送過來的參數，可能不甚準確、或有遺漏，導致無法使用參數獲得想要的結果。為了不讓參數變得毫無作用，可以使用管道將參數轉換成合法且可以使用的型態，`填補了客戶端和伺服器端之間的空白`


# 建立轉換的管道
## 建立管道
本次要來建立一個轉換整數的管道，名為：parseInt

```
nest generate pipe parseInt
```

## 使用管道轉換資料

```
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

這是一個很簡單的轉換，將輸入的值轉換，使用 `parseInt`的方法。將輸入的內容轉換成十進位的整數，如果輸入的內容不能轉換成十進位的整數，就拋出錯誤


# 在控制器使用管道


修改取得指定文件編號的方法
```
@Get('/:id')
getDocument(@Param('id', new ParseIntPipe()) id, @Response() res) {
    this.documentService.getDocumentData().subscribe(data => {
        let resData = data.filter(data => data.id === id)
        res.status(HttpStatus.OK).json(resData);
    })
}
```

其中修改的部分

```
@Param('id', new ParseIntPipe()) id
```

這一段的意思是，取得參數id，也就是取得特定文件的編號。並且使用管道- ParseIntPipe轉換資料，而且給予這個參數名稱同樣叫作id
如此一來，當getDocument方法啟動取得參數之前，就會先被管道轉換成我們要的資料，而不再是從客戶端直接傳送過來的資料。


最明顯的證據可以看到這一行
```
 let resData = data.filter(data => data.id === id)
```

還記得在控制器的篇章怎麼寫的嗎?

```
 let resData = data.filter(data => data.id === Number(param.id))
```

因為從客戶端傳過來的參數一定會被轉換成字串，所以要在控制器自行轉成數字的型態才能比較。
使用管道轉換資料之後，因為管道已經幫我們轉換成數字，所以不必再轉換成數字，可以直接使用


使用postman測試
以下使用三組參數來測試
* 2.000
* 2.14159
* aaa


前兩組的測試結果應該要正確顯示萊布尼茲的單子論，最後一組的結果應該出現錯誤


參數輸入2.000
![https://ithelp.ithome.com.tw/upload/images/20191012/20120107oQfdQqJa2E.png](https://ithelp.ithome.com.tw/upload/images/20191012/20120107oQfdQqJa2E.png)

參數輸入2.14159
![https://ithelp.ithome.com.tw/upload/images/20191012/20120107FvQQgIXzJX.png](https://ithelp.ithome.com.tw/upload/images/20191012/20120107FvQQgIXzJX.png)

參數輸入aaa
![https://ithelp.ithome.com.tw/upload/images/20191012/20120107GX55FldIML.png](https://ithelp.ithome.com.tw/upload/images/20191012/20120107GX55FldIML.png)


# 使用情境


有時候客戶端和伺服器端的溝通總會出現許多不明意外的錯誤，例如明明要傳1，傳過來會變成1.00，這樣導致花了很多時間除錯，所以為了避免這種意外，理論上客戶端和伺服器端都要有這種防錯的措施，就可以避免很多這種非預期的意外
(對! IE我就是說你，有時候頁面送出整數偏偏要給我偷加成小數)


# 範例
今天的範例內容可以github上面看到:[範例內容](https://github.com/tso1158687/hello-nest-iron)


# 小結
今天學到的事情有：
* 什麼時候會用到管道來轉換資料
* 如何使用管道轉換資料