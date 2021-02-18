---
title: DAY9-git在commit的時候，到底commit了什麼(原理篇)
date: 2021-01-11 21:23:59
tags: [git]
---
# DAY9-git在commit的時候，到底commit了什麼(原理篇)

git已經是現代軟體開發不可或缺的重要工具了，尤其是團隊合作開發git提供各種不同功能可以讓團隊的如

# git紀錄了什麼

當每次git在commit的時候，有想過git到底紀錄了什麼嗎?它怎麼可以知道你修改了那些檔案、修改的內容是什麼、在什麼分支、在哪一個點做了修改?

git在commit的時候，以物件的形式分別記錄下這幾樣東西的

- blob:紀錄檔案的內容
- tree:紀錄檔案的名稱
- commit:紀錄版本的內容
- tag:紀錄標籤的內容

git紀錄下這四種東西，形成所謂的一個commit

# git commit ID是如何產生的

例如有一個文字檔的內容如下:

```
今天是星期天，天氣好好，我的心情也很好
```

git就會根據這段內容計算出一個hash值，假設是 `AAAAA`

如果今天我修改了檔案內容:

```
今天是星期六，天氣好好，我的心情也很好
```

將內文的星期日改為星期六，因為內容不一樣，所以絕對不會有相同的hash值，假設是 `AAABB`

因此假設你想切換到上一個版本，git就會根據hash值AAAAA反推回去還原檔案的內容，如果想要回復現在的版本，同樣會根據hash值AAABB反推回去回復現在的版本內容。

這樣的機制讓不同的檔案的有一個獨立的id，不會發生不同的檔案有相同的id的問題，讓git的版控有一個堅強的基礎

在了解這個機制之後，同樣以剛剛的例子延續，如果又將內容改為一開始的內容後commit

```
今天是星期天，天氣好好，我的心情也很好
```

那麼這個最新的內容hash值會是什麼呢?

雖然這一個版本和一開始的版本內容一樣，但是commit的時間不一樣，這樣hash值會不會一樣呢?

答案是: `會`

前文說到hash值是由檔案的內容決定，完全沒有提到時間的問題，hash值是不考慮時間因素的，所以不管什麼時候commit，只要內容一樣，hash值就會一樣，因此這題的答案就AAABB

# 如何查看commit的內容

### 查看物件內容

```jsx
git cat-file -p <commitId>
```

### 查看物件類型

```jsx
git cat-file -t <commitId>
```

### 查看物件大小

```jsx
git cat-file -s <commitId>
```

![DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled.png](DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled.png)

# git檔案存在哪

當你執行 `git init` 的時候，等同於幫你建立一個預設隱藏起來的 `.git` 資料夾，記錄所有跟git有關的資訊。

![DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled%201.png](DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled%201.png)

也就是說，只要有了這個 `.git` 的檔案，你就算把資料夾下面所有的檔案刪光光，也可以透過git馬上全部恢復回來。

反過來說，如果把 `.git` 檔案刪掉的話，也就等同於失去所有版本控制的紀錄，就會變成一般的資料夾而已。

# git三大區域

![DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled%202.png](DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled%202.png)

## 工作區

顧名思義就是工作的區域，可以自由地任意修改。尚未要進入git紀錄的地方

## 索引

索引為用來保存所有要進儲存庫之前的所有檔案狀態

## 儲存庫

真正進入git紀錄的地方，不論git的抓取或推送，都是以這個區域的紀錄為準

# git reset的幾種方法

## 退回到上一個版本

如果只是想回去上一個版本

```jsx
git reset head ~
```

 

## 退回至特定的版本

```jsx
git reset <commitId>
```

如果想要退回特定的版本，可以直接輸入commit的id直接退回。

## 回復時可選擇的參數

- -hard:commit,index,working tree都退回去
- -mixed:commit、index回去，working tree不變
- -soft:commit回去，index、working tree不變

### 查看所有的版本紀錄

如果不知道想要回去的版本commit，可以使用這個指令

```jsx
git reflog
```

查看所有版本紀錄的意思就，就算將分支刪除了，你已經圖表或是log看不到那個點了，還是可以透過這個指令查出所有曾經commit過的東西。

git刪除分支或是刪除某個點的概念是這樣的。例如有個分支叫作test，刪除test分支的時候，git只是做紀錄說:以後這些點跟test無關囉，不可以再叫test了。並沒有真正刪除你commit過的任何東西。

換句話說，凡是曾經commit過的東西，永遠不會消失。就算已經把分支刪除或合併，一定都可以找的回來。

![DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled%203.png](DAY9-git%E5%9C%A8commit%E7%9A%84%E6%99%82%E5%80%99%EF%BC%8C%E5%88%B0%E5%BA%95commit%E4%BA%86%E4%BB%80%E9%BA%BC(%E5%8E%9F%E7%90%86%E7%AF%87)%20a2053bcc146a41ccb5fea648adacdccd/Untitled%203.png)

所以只要有壞味道的感覺，不論是程式碼快要寫壞了或是電腦快要當機了，甚至是地震來了，只要commit下去，就不必怕東西不見。

# git設定

git基本上不太需要設定，只需要設定好自己的個人資料就好。但是git有一個問題，就是遇到中文常常會有亂碼，如果不想要看到中文亂碼的話，可以稍微設定一下

打開command line，輸入

```jsx
npx @willh/git-setup
```

這個是由will保哥所提供的設定工具。

詳細的設定內容可以看[這裡](https://github.com/doggy8088/git-setup)

# 該不該使用GUI工具

使用git的人可以分成兩派，一派是指令派；一派是工具派。

有人認為git一定要輸入指令比較精確，因為你才會知道你在執行什麼指令。

有人認為git要使用工具比較好，因為快速方便，只要能達成目的，不必太在乎做了什麼指令。

所以到底該不該使用GUI工具呢?

答案是:都可以，用得舒服就好。

像筆者本人打字速度不快，又容易打錯字。因此對我來說，使用GUI工具是比較快速的方法。

GUI工具的本質還是指令，GUI只是幫你用圖像化的方式執行指令，所以只要懂GIT基本原理不管要打指令或GUI都可以很順利地使用

所以如果選擇使用GUI工具的朋友們在使用的時候不彷在操作的時候先停下來一下，想想看你知道這個按鈕幫你執行了什麼git的指令嗎?如果知道，代表對git的認識是足夠的。如果不知道可以試著用用看如何用指令解決這個問題。

[octtree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc?hl=en-US)

[保哥的git設定](https://github.com/doggy8088/git-setup)