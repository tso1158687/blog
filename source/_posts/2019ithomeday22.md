---
title: (DAY-22) 建立 Nestjs 環境與專案-Angular 與 Nestjs 共舞
date: 2019-10-07 16:40:12
tags: [nestjs]
---
Nestjs 安裝環境非常簡單，就和Angular 一樣，擁有一套完整的CLI處理大小事，可以快速產生專案，並且設定好所有的配置，直接進入開發。

如果之前已經有安裝過Angular，則當前的環境可以直接安裝Nestjs沒有問題。
如果不確定，請確認Nodejs的版本是不是大於8.9

# 安裝Nestjs CLI

```
npm i @nestjs/cli -g
```
# 啟動Nestjs 專案

安裝完畢之後，使用CLI指令啟動新專案:
```
nest new <project-name> 
```
在此建立一個新專案，稱為hello-nest

```
nest new hello-nest
```
專案建立完成之後，啟動Nestjs專案
```
cd hello-nest
npm run start:dev
```
後面多一個`:dev`代表啟動的是開發模式，開發模式就是只要專案內容有變更，就會自動重新打包並啟動最新內容，是開發的時候非常方便實用的指令 。
![https://ithelp.ithome.com.tw/upload/images/20191008/201201078vqXe4fba8.png](https://ithelp.ithome.com.tw/upload/images/20191008/201201078vqXe4fba8.png)


看到這串訊息就表示Nestjs成功啟動，為了確定是否成功，使用postman測試，輸入`localhost:3000`，看到回傳訊息：Hello World!
代表啟動成功囉!
![https://ithelp.ithome.com.tw/upload/images/20191008/20120107fH2HCZGLCv.png](https://ithelp.ithome.com.tw/upload/images/20191008/20120107fH2HCZGLCv.png)

如果想要看多更多啟動或打包等指令，可以到package.json看，專案已經有先預設好一些常用的指令，如果不喜歡可以在這邊調整或增減自己喜歡的指令

![https://ithelp.ithome.com.tw/upload/images/20191008/20120107m5OQ8AyguQ.png](https://ithelp.ithome.com.tw/upload/images/20191008/20120107m5OQ8AyguQ.png)

# Nestjs CLI 指令

Nestjs簡單來說可以視為後端版本的Angular，不須擔心需要重新學習新的指令。在Angular篇章學習的概念和用法幾乎都可以套用在Nestjs。
就算是Nestjs CLI指令也幾乎和Angular CLI指令一模一樣，例如想要產生一個服務 (Service)

Angular 的指令是這樣:
```
ng generate service xxx
```
只要把代表Angular的前綴ng替換成nest就可以了
```
Nest generate service xxx
```
# 小結
今天學到的事情有：
* 如何安裝Nestjs CLI
* 如何啟動Nestjs專案
* 如何使用Nestjs CLI 指令


