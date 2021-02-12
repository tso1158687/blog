---
title: Day16-SOLID原則-單一職責原則(Single Responsibility Principle)
date: 2021-01-11 21:24:28
tags: [solid]
---
# Day16-SOLID原則-單一職責原則(Single Responsibility Principle)

# 什麼是SOLID原則

SOLID原則分別是針對物件導向的五個設計原則取其第一個字母的縮略詞

- Single-responsibility principle (SRP) 單一職責原理
- Open–closed principle (OCP) 開閉原則
- Liskov substitution principle (LSP) 里氏替換原則
- Interface segregation principle (ISP) 介面隔離原則
- Dependency inversion principle (DIP) 依賴反向原則

# 為什麼需要SOLID原則:

工程師的職責就是把指定的功能使用程式碼去實現。雖然很多時候迫於時間的壓力或是其他外部因素，可能都是先求有再求好。先求可以實現功能，再求可穩定運作且可維護。

一開始的時候，對於求有這件事情或許多工程師不會太難。但是對於求好這件事情就會感到比較困難。畢竟什麼是好，這個好的不同人有不同的想法。

但大抵而言，大家追求的好差不多就是這幾件事情:

- 程式碼功能清晰
- 程式碼架構清晰
- 程式碼易於維護
- 程式碼易於修改

針對求好這件事，可以參考SOLID原則，提出一點想法。

# 單一職責原理

> 一個功能類別應該只有單一職責

假設有一個功能是要寄信有啟用的客戶。

程式碼如下:

```jsx
function sendMailToActiveClients(clients) {
   clients.forEach(client=>{
        if(client.isActive){
            sendMail(client)
        }
   })
}
```

上面的程式碼用白話文來說就是: `對客戶列表跑迴圈，如果客戶是有啟用的，則寄信給客戶`

從白話文可以知道這個功能做了這幾件事情:

- 尋找有啟用的客戶
- 寄信給客戶

這個功能做了兩件事情，和單一職責原則不符合，應該讓一個功能只有一個職責，所以依照單一職責原則重新改寫一下程式碼:

```jsx
function sendMailToActiveClients(clients) {
    const activeClients=getActiveClient(clients)
    activeClients.forEach(client=>{
        snedMail(client)
    })
}

function getActiveClient(clients) {
    const activeClient=clients.filter(client=>client.isActive)
    return activeClient
}
```

改寫過後的程式碼將尋找有啟用的客戶和寄信給客戶兩件事情分開。一次只做一件職責的事情

# 單一職責原則的優點

## 提升可讀性與維護性

因為一個功能只做一件事情，所以可以很清楚明白這個功能在做什麼事情。也因為只做一件事情，所以程式碼可以縮短許多，比較簡短也更容易閱讀。

更容易閱讀也意味著更容易維護，因為知道在做什麼，目的也很明確

## 減少修改影響的範圍

因為職責單一，功能也就單一，所以修改的時候可以更清楚影響的範圍在哪裡，影響的範圍也比較小。

如果職責不夠單一，裡面包含一個以上的功能，常常會發生很多不在預期範圍內的影響，例如改A功能影響B功能，修改好B功能後，反而換C、D功能壞掉。

只要職責更單一，就可以大幅降低修改的成本和影響