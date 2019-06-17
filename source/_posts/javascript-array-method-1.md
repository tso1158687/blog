---
title: javascript常用的陣列操作1
date: 2018-04-23 00:18:53
tags: [javascript]
---
```
let fruits=['apple','banana','orange']
```

### 新增元素
直接新增元素進去

```
fruits[fruits.length]='mango';
// ['apple','banana','orange', 'mango']
```

因為陣列是從0開始，所以直接塞長度進去，會在最後一個
或是使用`push`，`push`會將新增的東西從陣列的最後開始新增

```
fruits.push('mango')
// ['apple','banana','orange', 'mango']
```
### 刪除元素

如果要移除陣列的最後一個元素使用`pop`

```
fruits.pop() 
// ['apple','banana','orange']
```

### 在首位插入元素:unshift

```
fruits.unshift('mango');
// ["mango", "apple", "banana", "orange"]
```


### 在首位刪除元素:shift

```
fruits.shift();
// ["apple", "banana", "orange"]
```

### 從指定位置新增、刪除元素:splice

```
splice(index,n)
```

splice必須要帶兩個參數`index`和`n`
index代表起始的位置，例如2，就代表從陣列的第三個位置開始(請注意陣列序列從0開始)
n代表要新增或刪除元素
0代表新增元素
大於0代表刪除元素，且數字代表刪除元素個數

### 新增元素

```
friuts.splice(1,0,"grape","blueberry ")
//在第二個位置之後，新增兩個元素，grape和blueberry
// ["apple", "grape", "blueberry", "banana", "orange"]
```

### 刪除元素

```
// 接續剛剛新增的內容
friut.splice(1,3)
// 在第二個位置(包含第二個位置)，刪除三個元素
// ["apple",  "orange"]
```

### 合併陣列:concat

```
objectArray.concat(array1,array2)
```

objectArray為目標陣列
```
let fruits=['apple','banana','orange']
let foods=['rice','noodle','beefnoodle']
let dinner
dinner=food.concat(fruits)
// ['rice','noodle','beefnoodle', 'apple','banana','orange']
```


### 分割陣列

```
slice(index,n)
```

`slice`和`splice`長得蠻像的，一開始我一直搞錯，直到後來才發現他們不一樣。
slice是分割陣列，可以擷取需要的部分

```
let myFavoriteFruits
myFavoritesFruits=fruits.slice(1,2)
// ['banana','orange']
```
從第一個位置擷取兩個元素，注意，一樣`包含自己`。

### 分隔陣列

```
objectArray.join()
```
將陣列分隔開來轉為字串，預設不填寫則以`逗號(,)`分隔

```
fruits.join()
// "mango", "apple", "banana", "orange"
fruits.join("!")
// "mango"! "apple"! "banana"! "orange"
``` 