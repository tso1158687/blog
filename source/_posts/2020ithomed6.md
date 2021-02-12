---
title: DAY6-寫CSS很痛苦嗎?SCSS快速入門介紹
date: 2021-01-11 21:23:47
tags: [CSS,SCSS]
---
# DAY6-寫CSS很痛苦嗎?SCSS快速入門介紹

# 寫CSS最痛苦的事情是什麼？

介紹SCSS之前，先想想寫CSS最痛苦的地方是什麼？

- 寫法很囉唆
- 不容易維護

例如以下這個例子

```scss
div {
	color: #d7d7d7;
}

div ul{
	color: #40809d;
}

div ul span .highlight{
	color: #40809d;
}

```

## 寫法很囉唆

假如這是一個元件，裡面還有一系列的元素，彼此之間有階層的關係。如果要設計這個元素的樣式的話，就不斷重複寫。而且重複寫了幾次，寫了好幾層也不但輕易看出他們之間彼此的關係

## 不容易維護

假設顏色 `#40809d` 是主視覺的顏色。如果有一天設計師想要修改主視覺顏色。那麼身為前端工程師的我們卻沒有方法可以一鍵修改，豈不是尷尬？以這個例子為例，就要修改兩個地方。假如這份樣式原本不是自己寫的，交接時也沒有交代清楚，就不知道有多少地方要改。

## 如果用SCSS寫呢？

```scss
$primaryColor: #40809d;
div{
	color: #d7d7d7;
	ul{
		color: $primaryColor;
		span{
			.highlight{
				color: $primaryColor;
			}
		}
	}
}
```

- 巢狀的寫法，不但可以減少寫很多重複的元素，也可以讓元素之間的關係更清晰
- 使用變數定義顏色，如果修改的話，只需要修改變數的定義的話，就可以修改所有使用到這個變數的樣式。

# 什麼是SCSS?

SCSS是CSS的超集合，基本上和CSS的寫法幾乎一模一樣。只是SCSS多了變數和各種模組化的用法。讓樣式檔案經過工程化和模組化之後，不僅減少開發時間，也增加維護時的彈性，應付更多不同的需求。

## 變數

可以像Javascript一樣，將值用變數儲存起來，可以重複使用。如果要修改，只要修改變數的值後，就可以全部套用。

```scss
$primaryColor: #393b3e;
$secondaryColor: #40809d;
$tltleFontSize: 96px;
$columnGap: 4px;
```

變數除了宣告以外，也可以做運算

```scss
$standardFontSize: 96px;
h1{
  font-size: $standardFontSize;
}
h2{
  font-size: $standardFontSize / 2;
}
```

例如副標的文字大小要是主標的一半，可以使用四則運算的方式訂定規則，這樣更加容易維護。

### 使用情境

一般來說，網站大多有主視覺配色和副視覺配色等設定。可以將這些設定宣告成變數，套用在專案當中。未來如果要修改設定，只要修改變數就好，不必再到處修改

## 巢狀

### 巢狀寫法

巢狀的寫法可使使用中括號來表之間的上下關係，越多括號代表越下層

```scss
.parent{
  color:blue;
  .child{
    font-size:12px;
    .grandson{
      border: 1px solid #fff;
    }
  }
}
```

這樣的寫法編譯後等同於CSS的

```scss
.parent {
  color: blue;
}

.parent .child {
  font-size: 12px;
}

.parent .child .grandson{
  border:1px solid #fff
}
```

### 平級(&)

巢狀的寫法是指class之間有上下階層的關係，但是如果要寫平級的class，可以使用(&)代表平級

假設有一個html的結構是這樣

```html
<div class="title highlight">
  這是重點
</div>
```

想要宣告一個同時擁有title和highlight的class的樣式可以這樣宣告

```scss
.title{
    &.highlight{
        color:yellow
    }
}
```

### 偽類(:)

CSS中有許多偽類可以使用，例如input就有hover、focus等不同狀態，可以使用(:)代表偽類。更可以搭配平級的用法，一次訂好各種不同的狀態

```scss
input{
    &:focus{
        color:red
    }
    &:hover{
        color: blue;
    }
}
```

## mixin

mixin的用法很像是CSS的function或是一群值的組合

例如以下範例為一個表格的樣式設定

```scss
@mixin table-base {
  th {
    text-align: center;
    font-weight: bold;
  }
  td,
  th {
    padding: 2px;
  }
}
```

使用 `@mixin` 加名稱，來宣告一組樣式的設定

```scss
#data {
  @include table-base;
}
```

如果要使用的話，使用 `@include` 來引入設定

這樣的寫法編譯後等同於CSS

```scss
#data th {
  text-align: center;
  font-weight: bold;
}
#data td,
#data th {
  padding: 2px;
}
```

### mixin與變數的搭配

說mixin很像function，那必定得能輸入參數，並且用參數做一些事情。

```scss
@mixin version($color) {
    background-color: $color;
    ::placeholder {
        color: $color;
    }
    .top-info{
        .ui-inputgroup .ui-inputgroup-addon{
            background-color: $white;
            width: 50px;;
            i{
                color:$color;
            }
        }
        .ui-button{
            background-color: $white;
            color:$color;
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }   
}
```

例如mixin中，使用變數 `$color` 去當作參數，然後直接套用到使用到的CSS屬性。這樣要使用的時候，再由外部呼叫的時候，決定賦予這個變數什麼顏色。

```scss
@include version($darkOrange)
```

範例

[https://codepen.io/tso1158687/pen/MWyzeZj](https://codepen.io/tso1158687/pen/MWyzeZj)