---
title: 擴充Angular的pipe
date: 2019-05-20 23:20:47
tags: [angular,pipe]
---
angular的pipe是非常好用的東西 (在angularjs類似的東西稱為filter，不過還是有差異)，可以在不改變原始資料的情況下，調整資料顯示的樣子。

angular裡面已經內建多種好用的pipe，例如:處理時間的DatePipe、處理字母大小寫的`UpperCasePipe`,`LowerCasePipe`、處理貨幣的`CurrencyPipe`

雖然有內建那麼多好用的pipe，總是有不敷使用想要自己定義一個或是想要在原本的pipe上增加更多功能。針對第一種，可以自己新增一個pipe；針對第二種，是今天要討論的主題，如何擴充一個pipe。

什麼時候會使用到擴充pipe的情境?
假設今天有一個待辦清單，紀錄著各種待辦事項和完成日期，但是不一定每一件事都有完成時間。如果當初沒有填寫結束日期，送空資料到後端，後端會將null的時間以西元1年的1月1日儲存起來。所以在前端取得待辦事項的時間資料，資料會長成0001–01–01T08:00:00，再經過pipe轉換會變成0001–01–01這樣奇怪的樣子顯示著。身為一名前端開發者，無法控制後端要如何儲存與處理這樣的資料，但是可以控制顯示給使用者看的資料，所以就來自己擴充pipe吧。
{% asset_img pipe-old.png %}

## 擴充pipe的需求是什麼?
因此我們的需求是，基於原本的datePipe，去處理西元1年1月1日的案例就好了。所以我們才會是使用原本的pipe去擴充，而不是重新再寫一個pipe，因為這樣不符合效益成本

## 如何擴充pipe?
建立一個新的pipe，在這裡稱為extend-date。在這個pipe當中，使用typescript的extends語法，將原本的datePipe作為擴充的目標，這時候就可以使用datePipe所有的方法囉。因此每當使用extend-date的pipe就如同下方的範例程式碼，在此下一個判斷式，如果原始的時間資料為西元1年1月1日，就顯示沒有結束時間；如果不是的話，就使用super語法，也就是交由原本的datePipe去處理。

```
export class ExtendDatePipe extends DatePipe implements PipeTransform {
transform(value: any, args?: any): any {
return value === '0001-01-01T08:00:00' ? '沒有結束時間' : super.transform(value, args);
  }
}
```

最後在html上面，將原本使用的datePipe改為新建立的extend-date的pipe就大功告成囉

PS:千萬不要忘記在`app.module`宣告pipe，免得angular不認得它而跳出錯誤無法使用。
{% asset_img pipe-new.png %}

[範例程式碼](https://stackblitz.com/edit/angular-extend-pipe?file=src%2Fapp%2Fextend-date.pipe.ts)