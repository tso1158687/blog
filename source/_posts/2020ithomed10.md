---
title: DAY10-GIT常用的指令與情境 (應用篇)
date: 2021-01-11 21:24:03
tags: [git]
---
# DAY10-GIT常用的指令與情境 (應用篇)

以下介紹git最常用的四個指令，分別介紹用處與情境

- push
- pull
- merge
- rebase

# pull

```
git pull
```

pull是最常使用的指令之一，要將遠端資料庫的東西拉取到自己的本機端。

而pull這個指令是兩個指令的混合

```
git pull = git fetch + git merge
```

也就是說，下 `git pull` 的指令的時候，git會依序下 `fetch` 指令去確認遠端的狀況，如果遠端有新的東西，就會將東西抓下來，並且 `merge` 合併新的東西

## 順利的情況

如果遠端資料庫的內容比我們本機端還要前面，而且包含我們本機的內容。git就會使用快轉合併(fast-forward)，直接幫我們將本機最新的點快轉到遠端最新的點，完成!

## 不順利的情況

如果本機內容和遠端不一致的話，git就會告訴你有衝突，這時候就需要解衝突，解完之後會可以提交一個新的commit，解決衝突。

# push

```
git push
```

push是最常使用的指令之一，要把自己本機做完的東西推送到遠端。

push的時候，做了這些事情:

- 推送git物件
- 更新遠端參考
- 如果無法更新遠端參考，就會顯示推送失敗

如果成功就代表推送成功，失敗的時候表示，目前本機的分支和遠端不同步，所以無法推送到遠端，必須想辦法先解決不同步的問題之後，再重新推送一次。

這時候有兩個做法:

1. 先pull遠端的東西下來，解決不一致的地方之後，再重新push
2. 不管三七二十一，不管遠端的東西是什麼，我就是要我的東西直接上去。

第一種狀況是很正規的解法；而第二種狀況的解法，通常會發生在自己的分支在開發的時候。

```
git push -f
```

你很清楚明白，自己現在本機的東西就是最終完成你想要的。至於遠端是什麼，我一點都不在乎，就是給我推上去就對了，只要加上 `-f` ，代表 `force push` 就是以自己本機的為準，如果跟遠端發生衝突，就把它蓋過去。就可以不必去處理衝突的事情了。

**注意**:這個做法只推薦在只有自己一個人開發的時候使用，而且要很清楚自己在做什麼。如果是和別人一起開發的時候， **千萬不要**這麼做， 除了會惹人討厭之外，還會直接蓋掉別人的程式碼。

最好的辦法應該是先rebase之後，將發生衝突的那個人拉過來，一起解好衝突之後再重新推一次

# rebase

需要rebase的情境是什麼?

![DAY10-GIT%E5%B8%B8%E7%94%A8%E7%9A%84%E6%8C%87%E4%BB%A4%E8%88%87%E6%83%85%E5%A2%83%20(%E6%87%89%E7%94%A8%E7%AF%87)%20a2d6f076d87c4ce19417145e56c60a20/Untitled.png](DAY10-GIT%E5%B8%B8%E7%94%A8%E7%9A%84%E6%8C%87%E4%BB%A4%E8%88%87%E6%83%85%E5%A2%83%20(%E6%87%89%E7%94%A8%E7%AF%87)%20a2d6f076d87c4ce19417145e56c60a20/Untitled.png)

rebase翻譯成中文就是重訂基底。以上圖的情況為例。在某一個時刻，同時有兩個問題要修，分別是issue2和issue3，這兩個問題分別交給不同人去修。issue2派給A去修復，issue3則派給我來修復。

兩個人都同時在同一個點開一個新的分支分別去修復他們所負責的issue。

而A動作比較快，已經先修好他的問題，將修好的東西合併回去主線master。這時我們也要將我們已經修好的issue3合併回主線了。可是這個時候我們已經落後主線一個點。

這時候就是執行rebase的最佳時機，將自己的分支從原本master岔出的點 **移植**到master最新的那個點。這個就是rebase的用處

![DAY10-GIT%E5%B8%B8%E7%94%A8%E7%9A%84%E6%8C%87%E4%BB%A4%E8%88%87%E6%83%85%E5%A2%83%20(%E6%87%89%E7%94%A8%E7%AF%87)%20a2d6f076d87c4ce19417145e56c60a20/Untitled%201.png](DAY10-GIT%E5%B8%B8%E7%94%A8%E7%9A%84%E6%8C%87%E4%BB%A4%E8%88%87%E6%83%85%E5%A2%83%20(%E6%87%89%E7%94%A8%E7%AF%87)%20a2d6f076d87c4ce19417145e56c60a20/Untitled%201.png)

為什麼要這樣做呢?在rebase到最新的master的時候，意思等同於你將涵蓋issue2分支的內容合併進來。這時候如果發生衝突，就可以知道衝突的內容是什麼，解決衝突。

如果在rebase的時候就解決了衝突，就保證issue3在合併的時候一定不會有衝突。

rebase讓你先看到了衝突解決了衝突。因為很多時候，將分支的內容推上去遠端後，合併的人不一定是自己。可能是由主管或其他人做這項操作。如果其他人在合併的時候發生衝突，因為不是他自己做的，所以他也不知道要如何解衝突，還是只能找上你。這樣一來一往的時間，又會增加不少的時間，而且解決衝突之後的程式碼有可能經過大幅的修改，又跟你一開始提交的不一樣，因此需要重新再看一次。

為了避免這樣來來回回的麻煩，請在推送你做的東西上去之前，都務必確定從最新的主線岔出去，如果不是，請記得做好rebase的動作。

# merge

需要merge的情境是什麼呢?

![DAY10-GIT%E5%B8%B8%E7%94%A8%E7%9A%84%E6%8C%87%E4%BB%A4%E8%88%87%E6%83%85%E5%A2%83%20(%E6%87%89%E7%94%A8%E7%AF%87)%20a2d6f076d87c4ce19417145e56c60a20/Untitled%202.png](DAY10-GIT%E5%B8%B8%E7%94%A8%E7%9A%84%E6%8C%87%E4%BB%A4%E8%88%87%E6%83%85%E5%A2%83%20(%E6%87%89%E7%94%A8%E7%AF%87)%20a2d6f076d87c4ce19417145e56c60a20/Untitled%202.png)

merge翻成中文就是合併的意思，就是要將某個分支的內容合併回去。一般常見的使用情境是將開發完成的dev分支，合併回主線master分支，作為正式的版本。

merge的概念不難，但是使用情境卻不是那麼簡單。不可能合併的時候總是可以很順利地快轉合併進去。如果是從落後主線很多的地方合併進去，可能會發生很多衝突。如果是單人開發，只要把衝突解完就可以了。

如果是多人開發，請務必先依照上一段的內容，先rebase完之後，再推上去。盡量不要讓merge這個動作發生衝突。原因還是一樣，在有些開發流程，合併的動作不一定是由你本人執行，有可能是其他去執行。如果發生問題，他還是要來找你解。既然早做碗做都要做，何不一開始就先做好省得麻煩呢?

# 連猴子都能懂的Git入門指南

本篇的圖片皆取自[連猴子都能懂的Git入門指南](https://backlog.com/git-tutorial/tw/) 上面有很多精美的圖片介紹Git的使用方式，強烈推薦可以看看。