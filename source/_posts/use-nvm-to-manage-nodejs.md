---
title: 使用nvm來管理nodejs吧!
date: 2019-08-19 23:31:29
tags: [nodejs]
---

# 為何使用 NVM:
nodejs 已經是前端開發必備工具，例如:啟動本機伺服器、許多框架或套件的依賴等等。但是最大的問題是，每個框架或套件對於 nodejs 的版本要求不同。以目前遇到的困難來說，目前同時維護 angularjs 和 angular 兩種不同的框架，兩種框架在啟動本機伺服器的要求分別是 nodejs 8.x 和 nodejs 10.x。

這樣造成的困擾是:一台電腦只能安裝一種版本的 nodejs，假如我安裝 nodejs 8.x 在我的電腦上，我只能啟動 angularjs 專案，如果我要啟動 angular 專案，我就必須移除 nodejs 8.x 之後，再安裝 nodejs 10.x，反之亦然。這樣反反覆覆的動作花費不少時間，因此便產生一個疑問，有辦法快速切換 nodejs 的版本嗎?

有的，使用 nvm 吧!

# 安裝 NVM:
node version manager 簡稱 nvm，是個管理 nodejs 版本的工具，可以使用指令快速切換不同版本的 nodejs。

## step1:
[下載 nvm](https://github.com/coreybutler/nvm-windows/releases)

## step2:
安裝 nvm，安裝步驟和一般應用程式一樣，不過需要特別注意的是，這個程式有一個特別的 bug，就是`不可以安裝在有空格的路徑`。以我一開始安裝的路徑為例:

```
C:\Users\jason desk
```

安裝路徑有一個空白，在使用的時候就會出錯，所以一定要特別注意，要安裝在沒有空白的路徑。

## step3:
安裝完畢之後開始使用 nvm。nvm 會取代原本有安裝的 nodejs，所以已經安裝過的 nodejs 要重新安裝一次，安裝指令非常簡單，只要輸入:

```
nvm install <version>
```

因此假設我要安裝 nodejs 10.16.3 的版本，就輸入指令就會開始安裝

```
nvm install 10.16.3
```
{% asset_img nvm1.png %}
step4:
安裝完畢之後，只要輸入:

```
nvm use <version>
```

這樣就可以切換版本，因此輸入

```
nvm use 10.16.3
```

輸入之後，就可以使用指定版本的 nodejs，為了驗證是否有切換成功，可以輸入

```
node --version
```

來看看目前使用的版本是否一致
{% asset_img nvm2.png %}

同理而言，如果要使用別的版本的 nodejs，只要重複照上述步驟再安裝一次後，就可以使用 `nvm use` 的指令去切換囉
