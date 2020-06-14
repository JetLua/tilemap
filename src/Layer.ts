import {ITile} from './util'

export default class extends PIXI.Graphics {
  private data: any
  private tiles: {[index: number]: ITile} = {}
  private holes: PIXI.IPoint[] = []

  constructor({data, tiles}: {data: any, tiles: {[index: number]: ITile}}) {
    super()
    this.data = data
    this.tiles = tiles
    this.update()
  }

  addHole(...args: PIXI.IPoint[]) {
    this.holes.push(...args)
  }

  removeHole(...args: PIXI.IPoint[]) {
    for (const item of args) {
      for (let i = this.holes.length - 1; i >= 0; i--) {
        const p = this.holes[i]
        p.x === item.x &&
        p.y === item.y &&
        this.holes.splice(i, 1)
      }
    }
  }

  isHole(x: number, y: number) {
    const {holes} = this
    for (const hole of holes) {
      if (hole.x === x && hole.y === y) return true
    }
    return false
  }

  update() {
    const {data, tiles} = this

    const {
      chunks, opacity, visible,
      startx, starty, x, y
    } = data

    this.x = (x - startx) * 16
    this.y = (y - starty) * 16

    this.clear()

    for (const chunk of chunks) {
      for (let i = 0; i < chunk.data.length; i++) {
        const item = chunk.data[i]
        if (!item) continue
        const {frame, texture} = tiles[item]
        const x = ((i % chunk.width) + chunk.x) * frame.width
        const y = ((i / chunk.width | 0) + chunk.y) * frame.height
        if (this.isHole(x, y)) continue
        const matrix = new PIXI.Matrix()
        matrix.translate(x - frame.x, y - frame.y)
        this.beginTextureFill({matrix, texture})
        this.drawRect(x, y, frame.width, frame.height)
        this.endFill()
      }
    }
  }
}