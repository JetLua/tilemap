# tilemap
The tilemap renderer for pixi.js.

[DEMO](https://funny.lufei.so/tilemap/)

# Install
```
npm i @iro/tilemap
```

# Usage
```js
import {Tilemap, Layer} from '@iro/tilemap'

const map = new Tilemap({
  data: loader.resources['hometown.json'].data,
  tileset: {
    '1': loader.resources['1.png'].texture
  }
})

stage.addChild(map)
```
