---
title: DAY19-SOLID原則-介面隔離原則(Interface Segregation Principle)
date: 2021-01-11 21:24:40
tags: [solid,鐵人賽2020]
---
# DAY19-SOLID原則-介面隔離原則(Interface Segregation Principle)

# 什麼是介面隔離原則

> 一個類別不應該被強迫實作一個它不需要的方法

意思就是說，一個類別不應該去實作它不需要去執行的方法。感覺有點廢話，又把引言說了一次，直接來看看例子感受一下吧

# 介面隔離原則的例子

本次例子以Typescript為範例，Typescript更能凸顯出介面隔離原則的重要性。

假設有一個車子的介面，必須實作以下這些方法:

```tsx
interface Car {
  startEngine(): void;
  colseEngine(): void;
  greeting(): void;
  enableDebugMode(): void;
}
```

分別有兩個對象去實作車子的介面:駕駛和工程師

```tsx
class driver implements Car {
  startEngine() {
    console.log("啟動車子");
  }
  colseEngine() {
    console.log("關閉車子");
  }

  greeting() {
    console.log("歡迎搭車");
  }

  enableDebugMode() {
    console.log('錯誤，無權存取')
  }
}

class engineer implements Car {
  startEngine() {
    console.log("啟動車子");
  }
  colseEngine() {
    console.log("關閉車子");
  }

  greeting() {
    console.log("歡迎搭車");
  }

  enableDebugMode() {
    console.log("啟動工程模式");
  }
}
```

實際執行的結果

```tsx
const driver1 = new driver();
const engineer1 = new engineer();
console.log(driver1.enableDebugMode()); // 錯誤，無權存取 
console.log(engineer1.enableDebugMode()); // 啟動工程模式
```

從這個例子可以看出， `enableDebugMode` 這個功能本來只專屬工程人員使用，不開放給一般駕駛使用。但是因為Car的介面有這個，所以駕駛不得不實作這個功能，然後丟出錯誤。

實作了之後再拋出錯誤，實在一個很彆扭的行為。會這麼彆扭的原因就是介面 `Car` 所要實作的方法，並不是通用，大家都得實作的方法。導致實作他的對象被迫以奇怪的方式實作。

因此如果要遵守介面隔離原則的話，可以將介面抽離，讓不同需要的人分別實作

```tsx
interface Car {
  startEngine(): void;
  colseEngine(): void;
  greeting(): void;
  
}

interface DebugMode{
enableDebugMode(): void;
}
```

如此一來，駕駛和工程人員就可以分別去實作不同的東西

```tsx
class driver implements Car {
  startEngine() {
    console.log("啟動車子");
  }
  colseEngine() {
    console.log("關閉車子");
  }

  greeting() {
    console.log("歡迎搭車");
  }
}

class engineer implements Car,DebugMode {
  startEngine() {
    console.log("啟動車子");
  }
  colseEngine() {
    console.log("關閉車子");
  }

  greeting() {
    console.log("歡迎搭車");
  }

  enableDebugMode() {
    console.log("啟動工程模式");
  }
}
```

# 介面隔離原則的優點

將介面隔離出來的優點是可以不用被迫去實作不需要用到的方法。如果看到一堆強迫被執行的功能又要以奇怪的方式繞過，在維護上可以說是極難維護。而且如果沒有留下註解之類的話，還要自行花費大量時間抽絲剝繭。那倒不如一開始就將介面隔離，使用好的介面、擁有好的架構。