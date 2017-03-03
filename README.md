# WNEW

[![Build Status](https://travis-ci.org/wakayama-hacker/wnew.svg?branch=master)](https://travis-ci.org/wakayama-hacker/wnew)

## Build and start WNEW

```
$ cd path/to/the/project/root
$ npm install
$ npm run build
$ npm start
```

## testing

```
$ npm test
```

## data

`./data`フォルダ以下にCSVファイルを置いてください。
CSVファイルの項目には、`menu`という列が必要です。
CSVファイルは分割することができます。（`串本.csv`、`白浜.csv`など）

### CSVファイルの例

```
menu,title,lat,lng,content
串本,橋杭岩,33.488547,135.795751,これは橋杭岩です。
串本,潮岬,33.437084,135.755906,本州最南端の潮岬です。
白浜,円月島,33.690140,135.337222,円月島です。
公衆トイレ,大島ポケットパーク公衆トイレ,33.463798,135.798294,ポケットパークの公衆トイレです。
```

### 出力されるJSONファイルの例

#### menu.json

```
[
  {
    "id": 0,
    "value": "串本"
  }, {
    "id": 1,
    "value": "公衆トイレ"
  }, {
    "id": 2,
    "value": "白浜"
  }
]
```

#### 0.json

```
[
  {
    "title": "橋杭岩",
    "lat": "33.488547",
    "lng": "135.795751",
    "content": "これは橋杭岩です。"
  }, {
    "title": "潮岬",
    "lat": "33.437084",
    "lng": "135.755906",
    "content": "本州最南端の潮岬です。"
  }
]
```

#### 1.json

```
[
  {
    "title": "大島ポケットパーク公衆トイレ",
    "lat": "33.463798",
    "lng": "135.798294",
    "content": "ポケットパークの公衆トイレです。"
  }
]
```

#### 2.json

```
[
  {
    "title": "円月島",
    "lat": "33.690140",
    "lng": "135.337222",
    "content": "円月島です。"
  }
]
```
