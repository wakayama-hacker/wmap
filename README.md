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

### CSVファイルの例

`./data`フォルダ以下にCSVファイルを置いてください。
CSVファイルの項目には、`menu`という列が必要です。
CSVファイルは分割することができます。（`串本.csv`、`白浜.csv`など）

```
menu,title,lat,lng,content
串本,橋杭岩,33.488547,135.795751,これは橋杭岩です。
串本,潮岬,33.437084,135.755906,本州最南端の潮岬です。
白浜,円月島,33.690140,135.337222,円月島です。
公衆トイレ,大島ポケットパーク公衆トイレ,33.463798,135.798294,ポケットパークの公衆トイレです。
```
