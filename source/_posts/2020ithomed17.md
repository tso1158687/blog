---
title: Day17-SOLID原則-開閉原則(Open–closed Principle)
date: 2021-01-11 21:24:31
tags: [solid,鐵人賽2020]
---
# Day17-SOLID原則-開閉原則(Open–closed Principle)

# 什麼是開閉原則

> 軟體實體應該對擴展開放，對修改關閉

開閉原則的解釋就是這麼簡單。

以現實中遇到實現開閉原則的例子為例: Chrome 和 VS Code都是實現開閉原則的最好例子。

Chrome 和 VS Code都有新增擴充套件(extension)的功能，安裝擴充套件可以新增一些功能。

Chrome 和 VS Code允許新增套件增加新功能，但是不會修改到原本的功能，讓原本的功能因為加了新功能之後壞掉，這個就是開閉原則。

# 開閉原則的例子

假設有一個取得使用者資料的功能

```jsx
function getUserData() {
    this.userService.getUserData().then(userLists => {
        this.userLists = parseUserLists(userLists)
    })
}
```

這個功能也就是從API取得使用者資料後，將使用者資料解析成前端可以使用的格式。

但是假設，有一天後端API要新增一種使用者資料的格式，所以前端要新增一個方法去解析新的資料格式。

```jsx
function getUserData(newDataType) { // 新增一個參數去判斷使用何種方法解析資料
    this.userService.getUserData().then(userLists => {
        // 使用條件式決定要使用哪種方法解析資料
        if (newDataType) {
            this.userLists = parseNewTypeUserLists(userLists)
        } else {
            this.userLists = parseUserLists(userLists)

        }
    })
}
```

使用最簡單的解法，傳入一個參數，再用條件式去判斷要使用何種方法去解析使用者的資料。

這樣的解法固然是一種可以滿足需求的方法。可是以開閉原則的角度來看，卻不是一種太好的做法。

根據開閉原則，新增方法不應該去修改到原本的方法，影響到原本的功能。對內修改應該要封閉，對外應該要開放。

所以根據開閉原則，不該去更新原本解析資料的方法，而是應該去修改 `pareUserLists` 這個方法，例如:

```jsx
function parseUserLists(userLists, dataType) {
    return userLists = dataType ? parseNewTypeUserList() : pareOldTypeUserList();
}
```

這樣一來就可以實現解析不同格式的資料，同時不會更改到原本已經寫好的功能

# 開閉原則的優點

1. 確保原本的方法不會更動到，可以確保運作過程與之前一致
2. 切分職責更加清楚，也更有彈性，之後會更好維護