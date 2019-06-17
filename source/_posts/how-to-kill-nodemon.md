---
title: 強制結束nodemon的小技巧
date: 2019-06-08 22:50:45
tags: [nodejs]
---
在開發express的應用程式的時候，nodemon是一個非常方便好用的開發工具。可以隨時監聽專案的變化，如果專案有變化的時候，可以自動重新打包執行，免去重複下指令的動作。但是常常遇到一個問題，在執行nodemon的時候，如果沒有正常程序關閉nodemon的時候，就算command line已經關閉，nodemon還是會持續在背景執行，port就會一直被占用，無法釋出。之前一直無法解決port被占用的問題，只好重新開機。但是這樣一直重開機，不是一個非常好的辦法，查了好久，終於找到一個關閉nodemon在背景運作的指令，只要在command line輸入，就可以完全關閉背景運作，把port釋放出來囉。

```
taskkill /im node.exe /F
```