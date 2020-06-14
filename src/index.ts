/// <reference types="pixi.js" />
import Layer from './Layer'
import Tilemap from './Tilemap'

(PIXI as any).Tilemap = Tilemap

export {
  Layer,
  Tilemap
}