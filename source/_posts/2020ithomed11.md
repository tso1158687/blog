---
title: DAY11-git cherry-pick和revert
date: 2021-01-11 21:24:07
tags: [git]
---
# DAY11-git cherry-pick和revert

上一篇介紹常用的git指令和情境，這一篇要來介紹不是那麼常用的指令，但是在某些時候，同樣非常實用的指令: `cherry-pick` 和 `revert`

# cherry-pick的意思是什麼?

cherry-pick翻譯成中文就是撿櫻桃。撿櫻桃這個詞對我們中文使用者來說可能沒有特別的涵義。但是對英語使用者來說，這是一個短語，意思是: `只挑選對自己有利的東西，忽略對只己不利的東西` 。帶有負面的意思。

如果以中文對應的熟語來講，近似於: `死道友不死貧道` 這樣的感覺。

但是在git當中，cherry-pick就沒有那麼負面的感覺，只是一個對應到相關情境的指令。

# cherry-pick

正向撿櫻桃。

## cherry-pick使用說明

將一個或多個commit提取到現有的分支

![DAY11-git%20cherry-pick%E5%92%8Crevert%20e069514d7fed49c8b722d63ef88536f3/Untitled.png](DAY11-git%20cherry-pick%E5%92%8Crevert%20e069514d7fed49c8b722d63ef88536f3/Untitled.png)

以上圖為例。假設在master新開一個dev分支，開發某個新功能。在dev分支分別提交了兩個點:99daed2...和08084a5...(以下分別簡稱為d1和d2)。兩個點分別代表不同的小功能。最後可能某些關係，dev的功能尚未開發完，還沒有辦法合併，但是要讓d1的功能先進去master。這時候就是使用cherry-pick最佳時機了。

```
git cherry-pick <commitId>
```

這時候只要在master分支對d1這個點使用cherry-pick之後，就可以將d1提取到master裡面了

## cherry-pick使用情境

cherry-pick的使用時機很常發生在開發新功能或是修復bug趕不上交付期限的時候。這時候會有兩種決定:

1. 延後整個交付期限
2. 先讓部分完成或必要的功能先合併，其餘繼續開發

第一種情況等到完成之後，再rebase最新的master之後，就可以準備合併。

第二種情況就比較複雜，因為只要分支內的某幾個點，不是要整個分支，所以不能將分支合併。這時候使用cherry-pick就可以滿足第二種情境的要求。

# revert

還原、反向檢櫻桃。因為和cherry-pick的動作相反，也有人說是反向撿櫻桃。

## revert使用說明

![DAY11-git%20cherry-pick%E5%92%8Crevert%20e069514d7fed49c8b722d63ef88536f3/Untitled%201.png](DAY11-git%20cherry-pick%E5%92%8Crevert%20e069514d7fed49c8b722d63ef88536f3/Untitled%201.png)

同樣以上取為例，上圖有四個commit，這四個點分別稱為m1、m2、m3、m4。如果想要把m3的內容剔除，就可以對m3使用revert，創造一個新的commit去刪除m3的內容

```
git revert <commitId>
```

## revert使用情境

revert使用情境和cherry-pick使用情境類似。通常發生在來不及的情況。例如在開發新功能的時候，前端跟後端都要各自開發新功能，並且一起完成之後才能算是滿足新功能的需求。

有可能前端比較順利，很快就開發完成，並且將開發好的內容合併回去master了。但是到了交付期限時，後端趕不急交付，必須延期。但是前後端的功能緊緊相依，如果沒有後端，前端的功能也無法使用。因此決定先將前端開發好的功能拔掉。此時有兩個選擇

1. 使用git reset，把不要的東西直接連紀錄都還原掉
2. 使用git revert，製造一個新的commit去還原掉某個分支的點。

第一種方法雖然快速，但是建議使用在自己個人開發的分支或專案就好。如果是團隊協作的內容，非常不推薦這樣做，因為你將某個與人協作的分支使用reset還原掉，很可能害其他人的分支跟遠端對不上，莫名其妙要去解衝突。

而且就實務上而已，通常會鎖定master功能操作的權限，如果已經合併回主線的東西，是無法透過reset的方式將原本做好的東西剔除

第二種方法就是比較清楚的方法，使用revert可以很清除明白將某個commit的點剔除，留下很清楚的紀錄，也不會讓其他人的分支不同步，造成混亂。其他人只要pull就可以把revert掉的東西抓下來了。

# 連猴子都能懂的Git入門指南

本篇的圖片皆取自[連猴子都能懂的Git入門指南](https://backlog.com/git-tutorial/tw/) 上面有很多精美的圖片介紹Git的使用方式，強烈推薦可以看看。