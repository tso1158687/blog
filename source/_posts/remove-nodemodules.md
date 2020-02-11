---
title: 如何快速移除 node modules
date: 2020-02-12 00:21:31
tags: [javascript]
---
常在測試或開發的時候，遇到詭異的狀況。通常會移除node modules裡面的東西，重新安裝相依的套件，就像電腦有問題重新開機治百病那樣。但是直接右鍵刪除node modules資料夾的時候，常常有一些莫名奇怪的問題導致刪除失敗，例如權限或是檔名太長無法刪除等等問題。

# 使用 rimraf

於是找到一個不錯的套件，可以下指令一鍵刪除node modules裡面所有的檔案
首先先安裝套件:
```
npm install rimraf -g
```

安裝完畢之後，再到要刪除的目錄下，輸入:
```
rimraf node_modules
```

輸入完之後，就會幫你把node modules刪得清潔溜溜囉!


# 參考資料:
[How to clean node_modules folder of packages that are not in package.json? - stacloverflow](https://stackoverflow.com/questions/21122342/how-to-clean-node-modules-folder-of-packages-that-are-not-in-package-json)