/// <reference types="pixi.js" />

import Layer from './Layer'
import Tilemap from './Tilemap'

(PIXI as any).Tilemap = Tilemap

// console.log(1)

export {
  Layer,
  Tilemap
}

declare global {
  interface ITile {
    type: string
    frame: PIXI.Rectangle
    texture: PIXI.Texture
  }
}