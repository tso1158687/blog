---
title: Angular 如何整合 Google Maps - 比較篇
date: 2021-05-30 11:37:17
tags: [angular,google maps]
---
# Angular 如何整合 Google Maps - 比較篇

Angular和Google Maps都是google推出的自家產品，一個是前端框架、一個是地圖服務。但是兩者一直沒有很好的結合，想要整合這兩者，必須自己想辦法、各顯神通去整合

目前在Angular使用google maps有下列三個方法

- Maps Javascript API
- AGM (Angular Google Maps)
- Angular Google Maps component

# 三大套件比較

以下以Angular的角度，來分析這幾個套件的優劣

## Maps Javascript API

### 優點

- Google Maps 團隊原生支援，所有套件的基礎，都是包裝官方API整合而生
- 最廣泛通用的格式，不限定 Angular，所有框架都可以使用，無痛轉換
- 官方說明文件詳細豐富，基本上只要複製貼上都可以使用

### 缺點

- 為 Javascript ，非Typescript，如果要使用Typescript，享受Typescript的好處的話，需要自行額外整合
- 沒有與Angular整合，如果要利用Angular生命週期或資料綁定等方法去操作的話，需要花額外大量時間整合

## AGM (Angular Google Maps)

### 優點

- 整合了 Angular，並且封裝得很好，使用上友善方便
- 大量利用 Angular 的特性，使用上幾乎沒有學習成本
- Typescript型別定義完整，對於開發速度很有幫助

### 缺點

- 基本用法很簡單，但是如果要深度客製化的話，因為文件稀少，難度會變得很高，需要自己去翻原始法，自己會意使用方法，難度會呈現指數成長
- 此套件為開發者自行發起的專案，很難保證是否一直持續穩定更新，保證相容性。現在最新的版本已經幾乎快要一年沒有更新，跟 Angular Ivy 已經有相容性的問題了

## Angular Google Maps component

### 優點

- Angular 官方團隊開發，與AGM一樣，封裝良好，可以與Angular各種特性良好結合
- 更新速度快，與新版本發布速度一致，不用擔心不相容或是成為孤兒版本
- 文件齊全，客製化非常簡單

## 缺點

- 惰性載入 (Lazy Loading)有點麻煩也有點愚蠢
- 不同環境的切換管理也很麻煩

# 套件選擇

介紹完三個套件的優缺點之後，如果要我推薦使用一套的話，我的推薦順序會是這樣:

Angular Google Maps component > Maps Javascript API > AGM (Angular Google Maps)

首先，我非常強烈推薦使用Angular官方的套件，原因非常簡單，就是他整合的非常好，安裝完就可以直接使用，幾乎沒有任何學習成本。唯一麻煩的地方就是，管理不同環境和惰性載入有點麻煩，但總體來說，瑕不掩瑜，不是致命的缺點，只是有點麻煩，也有辦法可以自己手動繞過去。

再來會推薦使用地圖原生的 Maps Javascript API，原因是這是地圖團隊官方的套件，參考範例和文件是最豐富的，幾乎每一種客製化的範例都可以在上面找到並且直接複製使用。但有個明顯的缺點就是，Javascript與Angular並無整合，如果要使用各種生命周期或事件，需要自己另外花時間去整合，這個就很考驗開發者的功力

最後比較不推薦的是 AGM，AGM雖然和angular整合程度很好，但是缺點很致命，並沒有持續在更新，與新版的Angular整合還有些問題，建議如果沒有使用過的話，那也不必使用了。但是，如果是舊版的Angular (Angular Ivy之前)，並且原本就有使用的話，那還是非常推薦使用。畢竟最麻煩的地方就是整合 Angular，如果已經有第三方整合好了，而且功能又完整的話，這還是一個很強大的套件。

下一篇，將介紹如何安裝與使用 Angular Google Maps component ，並且如何自己管理不同環境的切換

# 參考

- [Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview)
- [AGM (Angular Google Maps)](https://angular-maps.com/)
- [Angular Google Maps component](https://github.com/angular/components/blob/master/src/google-maps/README.md)