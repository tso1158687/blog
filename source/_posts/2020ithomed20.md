---
title: DAY20-SOLID原則-依賴反向原則(Dependency Inversion Principle)
date: 2021-01-11 21:24:44
tags: [solid,鐵人賽2020]
---
# DAY20-SOLID原則-依賴反向原則(Dependency Inversion Principle )

# 什麼是依賴反向原則

> 高層模組不應依賴低層模組，它們都應依賴於抽象介面。

> 抽象介面不應該依賴於具體實作，具體實作應依賴抽象介面。

# 依賴反向原則的例子

## 要如何從台北到板橋

![Untitled.png](Untitled.png)

根據google map的建議，從台北到板橋站可以搭乘台北捷運板南線。

## 從台北到板橋有幾種方法

但是從台北到板橋只有搭捷運一種方法嗎?

看看台北地區軌道路網圖，從台北到板橋不只有搭捷運一種方法而已。除了搭捷運外，還可以搭乘台鐵、高鐵

![Untitled%201.png](Untitled%201.png)

```tsx
class Mrt {
  destination;
  constructor(destination) {
    this.destination = destination;
  }
  getStationList() {
    let stationList = ["西門", "龍山寺", "江子翠", "新埔", "板橋"];
    console.log(`我要去${this.destination},沿途經過:`);
    stationList.forEach(station => {
      console.log(station);
    });
  }
}
```

```tsx
class Passenger {
  goTostation() {
    console.log("去車站");
  }
  getOnTheTrain() {
    let station = new Mrt("板橋");
    console.log(station.getStationList());
  }
}
```

這樣的關係就是 *乘客依賴著捷運*，乘客是高層模組，捷運是低層模組

假設有一名乘客要搭車從台北到板橋

```tsx
let passenger1 = new Passenger();
console.log(passenger1.getOnTheTrain()); 
// 我要去板橋,沿途經過:
// 西門
// 龍山寺
// 江子翠
// 新埔
// 板橋
```

可是如果有一名乘客他趕時間，他只是想從台北到板橋，不一定要搭捷運，只要能到板橋的方法都好，他選擇票價最貴但是最快的高鐵

高鐵也是交通工具和捷運有一樣的功能，所以直接繼承捷運的類別

```tsx
class Hsr extends Mrt {
  
  getStationList(){
    super.getStationList()
    console.log('不好意思我們沒有停西門、龍山寺、江子翠、新埔')
  }
}
```

同樣台鐵也是交通工具，也直接繼承捷運的類別

```tsx
class tra extends Mrt {
  
  getStationList(){
    super.getStationList()
    console.log('不好意思我們沒有停西門、龍山寺、江子翠、新埔，我們還另外停了萬華')
  }
}
```

可以看到繼承越來越多，不能通用的例子也越來越多，繼承並沒有輕鬆許多，反而要去處理更多的例外。

看出問題在哪裡了嗎?

## 怎麼從台北到板橋最好

乘客想要的就只是從板橋到台北，至於怎麼從板橋到台北則不是重點，只要能到就好。

換句話說，乘客所依賴的應該是抽象的交通工具，而並非實際的捷運。只要是交通工具，不論是高鐵、台鐵、捷運都好。

```tsx
class Transportation {
  destination;
  stationList;
  constructor(destination, stationList) {
    this.destination = destination;
    this.stationList = stationList;
  }
  goTostation() {
    console.log("去車站");
  }
  getOnTheTrain() {
    this.stationList.forEach(station=>{
    console.log(station);
    })
  }
}
```

把抽象的細節做好，再讓細節去實作抽象的內容，這樣的話，只要遵守抽象的內容，細節隨時可以抽換

# 依賴反向原則的優點

從依賴細節到改依賴抽象的好處就是，只要符合抽象的原則，細節隨時可以替換，增加高層模組和低層模組之間的彈性

實際的例子像是[ORM](https://www.wikiwand.com/zh-tw/%E5%AF%B9%E8%B1%A1%E5%85%B3%E7%B3%BB%E6%98%A0%E5%B0%84)套件上面，我要對資料庫的任何操作，假設我要求增加某項資料，我並沒有限定一定要哪種資料庫，我就只是想要「增加」這件事情。但是如果我把這個功能依賴在mySql上面，就會導致我的功能就只能在mySql上面實現，如果哪天我要使用msSql的話，這個功能就無用了。因此orm就是幫助我們對於指令的轉換多做一層抽象的工作，讓依賴可以反轉，不依賴實體而去依賴抽象，讓我要在哪個資料庫下增加的指令都不會有問題

[https://stackblitz.com/edit/typescript-eeb7et](https://stackblitz.com/edit/typescript-eeb7et)