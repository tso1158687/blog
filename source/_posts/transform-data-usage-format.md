---
title: bytes轉換KB、MB、GB等單位 - 一個解決方法的思考模式
date: 2020-06-06 23:59:32
tags: [javascript]
---
# 容量單位轉換的方法
如何轉換電腦的容量單位？常見的容量單位有 bytes、KB、MB、GB、TB等單位。

轉換的方法為逢1024進位，例如：1024bytes=1KB、1024KB=1MB，轉換的規則並不是很困難。

而有一個需求是這樣的，後端會傳送某個裝置網路流量的使用量，單位是bytes，前端在顯示資料的時候，必須自動轉換為適當的單位，例如不能顯示1300MB這樣的結果，因為超過1024MB就必須進位到GB。所以像999MB就是可以被接受的

要如何將bytes轉換成合適的單位就是本次所要討論的課題。

第一個直覺想到最簡單的方法是用if...else if...else的方法來做轉換
# 基本方法:簡單的暴力轉換
```
function transformUsageData(value) { 
  if (value < 1024) { 
    return `${value} bytes`; 
  } else if (value < 1024 * 1024) { 
    return `${value} KB`; 
  } else if (value < 1024 * 1024 * 1024) { 
    return `${value} MB`; 
  } else { 
    return `${value} GB`; 
  } 
}

```

這是一個簡單且粗暴的方法，但是缺點顯而易見就是`if else`太多，太多的特例判斷，而非使用`判斷的通則`。於是在stackoverflow找到一個很好的解法

```
const sizes = ["Bytes", "KB", "MB", "GB", "TB"]; 
    if (bytes == 0) { 
      return "0 Byte"; 
    } 
    const i = Math.floor(Math.log(bytes) / Math.log(1024)); 
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
```

在這裡用到幾個數學方法:
- Math.floor():取得小於等於所給數字的最大整數，例如:Math.floor(5.1)=5
- Math.log():取得對數。範例中的 Math.log(bytes) / Math.log(1024) 代表取以1024為底的對數
- Math.pow():取得指數的結果，例如:Math.pow(2,10)，代表2的10次方，為1024

這個方法做了這些動作:
- 首先將需要使用到的單位放進陣列中
- 如果是0的話，那也沒有必要轉換，就直接回傳0
- 再來開始計算，資料的大小為1024的幾次方，相當於1024要乘以幾次，決定單位，然後取小於這個數字的最大整數
- 最後在使用Math.pow方法，將算出來的指數乘上去，換算出轉換之後的單位。最後我個人加上toFixed()的方法，避免換算之後除不盡，將小數點最多固定在兩位數。

如此一來就完成一個簡單的容量轉換的方法了，跟原本的方法比起來，清楚又清爽多了

# 結論
這個需求如同日常生活中所遇到的千千萬萬個需求一樣，不是特別難，有千百種方法可以達成。

可以選擇徒法煉鋼的方法去完成：直接使用if...else判斷式，手動去判斷選擇，也可以試著找出通則去完成：只用指對數的方法，去判斷相對應單位。只要能完成需求的方法都是好方法。只不過如果要提升自己的能力的話，找出通則，並且使用通則，會是一個提升自己很好的機會。

# 範例程式碼
[範例程式碼](https://stackblitz.com/edit/angular-ivy-5ajmuj?file=src%2Fapp%2Ftransform-data-usage.pipe.ts)


# 參考資料
[correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript](https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript)
