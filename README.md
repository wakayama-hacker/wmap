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

## special gulp plugin

### usage

```
// gulpfile.js

const gulp = require('gulp')
const csv2json = require('./lib/wnew_csv2json')

gulp.task('default', () => {
  gulp.src('./example/**/*.csv')
    .pipe(csv2json())
    .pipe(gulp.dest('./dest'))
})

```
### input

```
menu,title,lat,lng,content
串本,橋杭岩,33.488547,135.795751,これは橋杭岩です。
串本,潮岬,33.437084,135.755906,本州最南端の潮岬です。
白浜,円月島,33.690140,135.337222,円月島です。
公衆トイレ,大島ポケットパーク公衆トイレ,33.463798,135.798294,ポケットパークの公衆トイレです。
```

### output

#### menu.json

```
["串本", "公衆トイレ", "白浜"]
```

#### 串本.json, 公衆トイレ.json, 白浜.json

example for 串本.json

```
[
  ...
  {
    totle: "橋杭岩",
    lat: "33.488547",
    lng: "135.795751",
    content: "これは橋杭岩です。"
  },
  ...
]
```
