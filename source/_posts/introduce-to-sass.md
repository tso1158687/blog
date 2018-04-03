---
title: SASS入門
date: 2018-02-05 00:31:15
tags: [css,sass]
---

## 什麼是 SASS?

SASS 是一種 CSS 擴充，為 CSS 的超集合。SASS 的優點是可以解決在開發大型專案時，CSS 常常會遇到層級不明，或是不能用變數定義讓整個架構可維護性變得很差的問題。開發者只要眼睛沒有問題的話，SASS 可以將 CSS 模組化，只要修改一些變數，讓原有的模組可以有更多延伸的變化，不僅減少開發的時間，也可以增加維護時的彈性，應付更多需求。

## SASS 的使用技巧

### 1.使用變數，方便重複利用

例如風險雲的黑色標準色碼是#393B3E，就可以用變數儲存起來

```bash
$riskBlack:#393B3E;
```

如此一來，只要我需要用到黑色，我就只需要打變數，而不需要再打色碼

```bash
body {
  color: $riskBlack;
}
.menu-item {
  color: $riskBlack;
}
```

這樣做的好處是，如果有一天，春節來了，我成功地說服 PM 大大，為了增添一點喜氣，把所有的字改成紅色的時候，我就不必一個一個改到都老了，只要改 $riskBlack:red，這樣就改完了。

### 2.巢狀寫法，讓層級更分明

CSS 沒有巢狀的寫法，常常看不出彼此之間的關聯性，而且還要浪費時間重複寫同樣的東西

```bash
.parent {
  color: blue;
}

.parent .child {
  font-size: 12px;
}

.parent .child .grandson{
  border:1px solid #fff
}
```

SASS 可以使用巢狀的寫法，不但層級更明確，也不需要撰寫同樣的東西

```bash
.parent{
  color:blue;
  .child{
    font-size:12px;
    .grandson{
      border: 1px solid #fff;
    }
  }
}
```

### 3.降低 pseudo 元素撰寫的重複性，如：::before、::after、:hover，在 SASS 中使用 & 代表父元素

```bash
//星期二
.kayoubi {
  // 星期三
  &:after {
    content: "suiyoubi";
  }
  // 星期一
  &:before {
    content: "getsuyoubi";
  }
}
```

### 4.Mixin 是一段 SASS 程式碼，可以直接一整包放到別人身上

```bash
@mixin table-base {
  th {
    text-align: center;
    font-weight: bold;
  }
  td,
  th {
    padding: 2px;
  }
}

#data {
  @include table-base;
}
```

轉譯後的結果如下

```bash
#data th {
  text-align: center;
  font-weight: bold;
}
#data td,
#data th {
  padding: 2px;
}
```
