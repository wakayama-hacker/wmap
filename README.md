# Wmap

[![Build Status](https://travis-ci.org/wakayama-hacker/wmap.svg?branch=master)](https://travis-ci.org/wakayama-hacker/wmap)

このプロジェクトでは、 Excel や CSV のオープンデータから簡単にウェブベースのモバイルアプリを作れるようにすることを目標にしています。

* http://wmap.wacker.io/
* https://github.com/wakayama-hacker/wmap

![](https://www.evernote.com/l/ABUTItogn8FPfZuwhoTbFNnGk_l9L9oPxewB/image.png)

## このプロジェクトの特徴

* `data/` ディレクトリ内に CSV や Excel ファイルを設置して `npm` コマンドを実行するだけで、それらのデータが JSON API に変換されモバイルアプリ上に表示されます。
* `config.json` と `README.md` を編集することで、トップページやタイトルなどをカスタマイズすることができます。
* 開発環境をあらかじめ構築済みなので、プログラミング初心者でもすぐにはじめることができます。
* Riot.js の柔軟でわかりやすいカスタムタグにより、さらに一歩踏み込んだカスタマイズも可能です。

## はじめかた

Git と Node.js がインストール済みの環境であれば、以下のコマンドですぐに試すことができます。

```
$ git clone git@github.com:wakayama-hacker/wnew.git
$ cd wnew
$ npm install
$ npm run build
$ npm start
```

## データのカスタマイズ

`data/` ディレクトリに以下のフォーマットの CSV ファイル、または Excel ファイルを設置してください。

|menu|title|lat|lng|content|
|----|-----|---|---|-------|
|串本|橋杭岩|33.488547|135.795751|これは橋杭岩です。|
|串本|潮岬|33.437084|135.755906|本州最南端の潮岬です。|
|白浜|円月島|33.690140|135.337222|円月島です。|

CSV の場合、以下のようなフォーマットになります。

```
menu,title,lat,lng,content
串本,橋杭岩,33.488547,135.795751,これは橋杭岩です。
串本,潮岬,33.437084,135.755906,本州最南端の潮岬です。
白浜,円月島,33.690140,135.337222,円月島です。
```

データの編集が終わったら以下のコマンドでビルドしてください。

```
$ npm run build
```

## アプリ本体のカスタマイズ

アプリを開いてすぐに表示されるトップページは、`README.md` に記述されている内容を元に自動的に生成されます。

`README.md` を編集して、以下のコマンドを実行してください。

```
$ npm run build
```
