---
title: graphql安裝與設定 apollo-angular篇
date: 2021-04-05 12:17:38
tags: [angular,graphql]
---
# 安裝apollo-angular

基本上安裝方法依照[apollo angular教學](https://apollo-angular.com/docs/get-started)上面指示的方法安裝。官方有提供兩種安裝方法，一種是透過 `ng add` 的方式自動化安裝，一種是手動安裝。

## 使用ng add安裝

輸入:

```
ng add apollo-angular
```

Angular Schematics 就會處理好所有安裝和設定步驟，就可以直接使用了

## 手動安裝

### 安裝apollo-angular

但是在安裝的時候，發現官方提供的schematics在最新版本的angular使用會有問題，會發生錯誤之後就直接結束了，沒有辦法安裝下去，所以在等待官方修復之前，只能手動進行安裝

安裝apollo angular相關套件

```
npm install apollo-angular @apollo/client graphql
```

因為graphql需要用到 `AsyncIterable` 的功能，所以要去 `tsconfig` 設定，讓typescript在編譯的時候可以支援這個功能。

以angular 10為例，修改 `tsconfig.base.json` ，就可以修改整個專案的編譯選項

```json
{
  "compilerOptions": {
    // ...
    "lib": [
      "es2017",
      "dom",
      "esnext.asynciterable"
    ]
  }
}
```

這樣就安裝完apollo-angular，接下來就只要設定就好了

### 設定apollo-angular

按照官方的教學，他會在 `app.module` 裡面去設定相關連線的選項，不過因為只是簡易的使用教學，在此設定並無問題。但是建議建立一個graphql module去統一管理與graphql有關的東西會比較好

建立graphql module

```json
ng g m graphql
```

建立完之後，在graphql module設定連線選項

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
						// 輸入graphql位置，此為官方提供的範例位置
            uri: 'https://48p1r2roz4.sse.codesandbox.io/', 
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule {}
```

設定完之後，在app module匯入graph module就完成了

```js
@NgModule({
    declarations: [AppComponent],
    imports: [
      ...
      GraphqlModule,
    ],
    bootstrap: [AppComponent],
  })
export class AppModule {}
```

# 設定Subscription

graphql除了查詢(query)和變更(mutation)以外，還允許使用雙向連線websocket的方法去建立。

如果要使用websocket的方式連線，還需要安裝[subscription-transport-ws](https://github.com/apollographql/subscriptions-transport-ws)

```js
npm install --save subscriptions-transport-ws
```

### 修改graphql module支援websocket的連線方式

現在graphql有http和websocket兩種連線方式，因此需要個別設定不同連線的參數，並且設定何時要使用http去請求資料，何時使用websocket去請求資料。

```js
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const http = httpLink.create({
          uri: `http://xxxxxxxx`,
        });

        const ws = new WebSocketLink({
          uri: `ws://xxxxxxxxxxxxx`,
          options: {
            reconnect: true,
            lazy: true,
            connectionParams: {
                Authorization:'yyyyyy'
            },
          },
        });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          ws,
          http
        );

        return {
          cache: new InMemoryCache(),
          link,
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule {}
```

在websocket連線設定的地方有幾個參數

```js
const ws = new WebSocketLink({
    uri: `ws://xxxxxxxxxxxxx`,
    options: {
        reconnect: true,
        lazy: true,
        connectionParams: {
            Authorization: "yyyyyy",
        },
    },
});
```

- reconnect:如果斷線的話，會自動重新連線
- lazy:不會在頁面啟動的時候就發起連線，而是在請求第一個websocket連線的時候，才會開始連線
- connectionParams:連線時的參數，如果連線需要帶驗證資訊，就可以加在這裡，附帶驗證資訊