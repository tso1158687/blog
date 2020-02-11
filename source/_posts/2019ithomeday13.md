---
title: (DAY-13) Angular的路由(Router)-管理與切換頁面的好幫手-Angular 與 Nestjs 共舞
date: 2019-09-29 16:40:12
tags: [angular]
---
到目前為止，我們所做的一切內容，都是做在首頁。現在要來做更多頁面來顯示英雄的細節資料
# 事前準備
在開始之前，先修改一下原本的英雄資料，多一個description欄位，對於英雄有更多的描述，為了可以點擊英雄，看到英雄的詳細資料。
另外還多加了一個id，作為英雄唯一的識別代號，也是為了能讓切換頁面的時候，可以使用id來對應頁面應該顯示的資料。
```
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "name": "兩津勘吉",
      "age": 35,
      "description": "閃啦閃啦!撞到不負責"
    },
    {
      "id": 2,
      "name": "秋本麗子",
      "age": 25,
      "description": "阿兩~~"
    },
    {
      "id": 3,
      "name": "野比大雄",
      "age": 12,
      "description": "哆啦A夢~~~"
    },
    {
      "id": 4,
      "name": "江戶川柯南",
      "age": 8,
      "description": "真相只有一個"
    }
  ]
}
```
# 使用路由
## 建立路由模組
```
ng generate module <module-name>
```
一般而言，會習慣命名`moduleName-routing`，moduleName就是這個路由要使用在哪個群組

因此現在要建立一個appModule的路由:
```
ng generate module app-routing --flat --module=app
```

## 定義路由內容
## 註冊路由
設定好路由之後，必須將路由註冊到某個模組。註冊的意思是告訴這個模組，如果要切換頁面的時候，請參考我的路由設定
現在要來設定`appModule`的路由，因此打開`app.module.ts`
```
import { AppRoutingModule } from './app-routing.module';
```
在appModule匯入路由模組
```
@NgModule({
imports: [ BrowserModule, FormsModule,HttpClientModule,AppRoutingModule ], //匯入AppRoutingModule

declarations: [ AppComponent, HelloComponent, HeroComponent, HeroDetailComponent, HeroListComponent ],

bootstrap: [ AppComponent ],

providers: [DataService]

})
```

## 設定路由
回到本篇重點:`app-routing.module.ts`
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router’; //匯入Angular處理路由的模組
import { HeroDetailComponent } from './hero-detail/hero-detail.component’ //匯入路由所要控制的元件
import { HeroListComponent } from './hero-list/hero-list.component’ //匯入路由所要控制的元件


const routes: Routes = [
    {
        path: '', component: HeroListComponent,
    },
    {
        path: ':id', component: HeroDetailComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```
首先先看到匯入的部分：
* 匯入Angular內建處理路由的相關功能：`Routes` 和 `RouterModule`
* 匯入路由所要控制的相關元件

再來看到路由的相關設定Routes，Routes是一個陣列，處理在不同位置的時候要顯示什麼元件，最基本必備的參數有`path`和`component`兩個參數

* path路徑為空，意思是在根頁面的時候的時候，例如本機的環境`localhost:4200`一進去的頁面，就會讀取HeroListComponent
* path路徑為`:id`，有一個冒號代表這是一個變數，冒號後面代表面數名稱。例如打開`localhost:4200/1`，就會讀取HeroDetailComponent，並且在元件得到`{id:1}`這樣的物件去做其他操作。
* path的路徑也可以設定常數，例如:path:’hello-hero’，這樣的常數，那麼路由只要配對到字串，也會讀取相對應的元件

最後就是匯入Angular內建的路由模組，以及路徑的設定，最後匯出路由模組，提供給appModule使用
```
@NgModule({
imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]

})
```

這樣一來，一個基本簡單的路由就完成了，下一篇將會實際設定，如何切換頁面，顯示英雄的詳細資料

# 線上範例
今天的範例內容可以在這裡看到:[範例內容](https://stackblitz.com/edit/angular-iron-jason-d13?file=src%2Fapp%2Fapp-routing.module.ts)

本次的範例內容包含下一篇實際操作的部分，可以先看看設定好之後，要如何實際處理切換頁面的設定喔


# 小結
今天學到的事情有：
- 為什麼需要Router
- 如何建立Router
