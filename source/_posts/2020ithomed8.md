---
title: DAY8- 工欲善其事，必先利其器。弄個舒服的VS Code
date: 2021-01-11 21:23:56
tags: [vscode]
---
# DAY8- 工欲善其事，必先利其器。弄個舒服的VS Code

前端工程師可以使用的編輯器有很多選擇，像是sublime、Atom、webstorm等等好用的編輯器。

編輯器是工作中最重要的軟體，一天工作當中，使用最長的時間非編輯器莫屬，因此選個喜歡的編輯器，然後把它弄得舒舒服服地樣子，是一件非常重要的事情

編輯器要選就選喜歡的，在這邊推薦我用起來最舒服的VS Code

## VS Code下載與安裝

直接到官網下載安裝即可，沒有什麼特別的步驟，一直按下一步就安裝完成了如果使用Mac的話，也可以使用 brew cask的方式安裝

[VS Code下載](https://code.visualstudio.com/)

## 快速打開VS Code的技巧

在windows中，只要檔案總管在 `code .` 就可以快速在這個目錄打開VS Code

{% asset_img 1.png %}

在Terminal也可以中，也可以到目錄下輸入 `code .` ，在該目錄打開VS Code

{% asset_img 2.png %}

## VS Code Insider

VS Code還有insider版本，就是預覽版本的意思，可以先使用到未來的版本，可能可以搶先體驗到新功能。Insider版本和正式版本的icon不一樣，是綠色的。

雖然說預覽版本可能存在不穩或是有問題的狀態，但是依筆者使用好幾年的經驗，幾乎沒有遇過有問題的情形，還可以故作神秘跟周遭的人預言未來新功能😀

有興趣的話可以玩玩看

VS Code Insider下載

## 實用的快速鍵

裡面有很多實用的快速鍵，以下列出我常常用到覺得很方便的快速鍵。甚至很多快速鍵不只有VS Code可以使用，在作業系統或瀏覽器上同樣適用

畢竟記住一些常用方便的快速鍵，是有助於提升開發效率的，也可以一直將手放在鍵盤上，不必一直移動到滑鼠。

註:在這邊寫的快速鍵為windows的，如果使用mac，將ctrl換成command即可

- ctrl+p: 搜尋專案內的檔案
- ctrl+tab:切換頁籤(在chrome同樣可以切換頁籤)
- ctrl+l:選取一整行
- ctrl+enter:插入新的一行
- ctrl+shift+K: 直接刪除整行
- alt + 上或下：將目前這行或區塊往上或往下
- ctrl+D :選取這份檔案裡面相同的文字
- alt+shift+F:自動格式化程式碼，將程式碼變成漂漂亮亮的樣子

### F2-修改function命名

在Javascript或Typescript中，對function按 `F2`，可以重新命名，並且會自動將所有用到的也一併重新命名。

{% asset_img 3.png %}

### F12-尋找使用function的地方

在Javascript或Typescript中，對function點 `F12` 可以找到使用這個方法的function

{% asset_img 4.png %}

## 實用的套件

### Chinese (Traditional) Language Pack for Visual Studio Code

如果英文版本的VS Code看不習慣，這裡有中文套件，可以將VS Code改成中文版的。

[vs code 中文套件](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hant)

### Live Share

微軟官方推出的即時分享程式碼的神器。現在越來越流程遠端工作，無法面對面看程式碼。當遇到問題的時候，最快的方法就是開程式碼給別人看，這時候就可以使用這個套件。它可以將你的vs code分享給別人看，也可以讓別人直接編輯你的程式碼，非常方便

l[ive share連結](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack)

### Tech Debt Metrics

{% asset_img 5.png %}

這個套件可以告訴你的程式碼哪裡有壞味道，安裝完之後，在每個函式上面就會有關於這個函式的評分，會分別給予A、B、C、D等分數，點下去之後，就可以看到評分的細節，它會告訴你他基於什麼理由給予這樣的評分。雖然說不是絕對的標準，但是可以讓自己心裡有個底，這裡可能有些壞味道

### TODO Highlight

寫程式的時候總有一些還未完成的事項要提醒自己未完成。就可以加上TODO，提醒自己要做，這個套件會加上螢光色，讓你更好找到

{% asset_img 6.png %}

[TODO Highlight連結](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

### indent-rainbow

將程式碼的縮排加上不同顏色，除了美觀外，更是為了可以清楚看見結構的層次

{% asset_img 7.png %}

### GitLens — Git supercharged

Gitlens是一套強大的git工具，可以追蹤這段程式碼最後誰修改過，總共有多少人修改過。這樣發生問題的時候，會更容易知道發生什麼問題，這個問題要問誰等等。

{% asset_img 8.png %}

### 常用熱鍵

cmd 熱鍵等同於 windows 中的 ctrl

- cmd + p：快速開起檔案
- cmd + Enter：插入一行空白行
- alt + shift + F：自動重新格式化 HTML
- ctrl + ` ：開啟 Terminal
- cmd + D ：選取相同字串
- cmd + L ：選取整行
- alt + 上或下：將目前這行或區塊往上或往下
- 熱鍵表及修改 Keymap：[https://code.visualstudio.com/docs/getstarted/keybindings](https://code.visualstudio.com/docs/getstarted/keybindings)

示範安裝啟用 Coding Style：[https://wcc723.github.io/tool/2017/11/09/coding-style/](https://wcc723.github.io/tool/2017/11/09/coding-style/)