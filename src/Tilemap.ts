import Layer from './Layer'
import {ITile} from './util'



export default class extends PIXI.Container {
  /** 图块 */
  private tileset: {[name: string]: PIXI.Texture}
  /** 地图数据 */
  private data: any
  /** 瓦片 */
  private tiles: {[index: number]: ITile} = {}

  private layer: {[name: string]: Layer} = {}

  constructor({tileset, data}: {tileset?: {[index: string]: PIXI.Texture}, data?: any} = {}) {
    super()
    this.data = data
    this.tileset = tileset
    this.parse()
    this.addLayer()
  }

  private addLayer() {
    const {data} = this
    if (!data.layers) return

    for (const item of data.layers) {
      const layer = new Layer({
        data: item,
        tiles: this.tiles,
        tileWidth: data.tilewidth,
        tileHeight: data.tileheight
      })
      this.layer[item.name] = layer
      this.addChild(layer)
    }
  }

  addHole(...args: PIXI.IPoint[]) {
    for (const x in this.layer) {
      this.layer[x].addHole(...args)
    }
    this.update()
  }

  removeHole(...args: PIXI.IPoint[]) {
    for (const x in this.layer) {
      this.layer[x].removeHole(...args)
    }
    this.update()
  }

  update() {
    for (const x in this.layer) {
      this.layer[x].update()
    }
  }

  private parse() {
    const {data} = this
    if (!data.tilesets) return
    for (const item of data.tilesets) {
      const {
        firstgid, imagewidth, imageheight,
        spacing, margin, tilewidth, tileheight,
        tiles, name, tilecount, columns
      } = item

      for (let i = 0; i < tilecount; i++) {
        const frame = new PIXI.Rectangle(
          (i % columns) * tilewidth,
          (i / columns | 0) * tileheight,
          tilewidth, tileheight
        )

        this.tiles[firstgid + i] = {
          frame,
          type: 'texture',
          texture: this.tileset[name],
        }
      }

      if (!item.tiles) continue

      for (const {id, animation, image, imagewidth, imageheight} of item.tiles) {
        if (animation) {
          let i = 0
          const queue = animation.map(({duration, tileid}: {duration: number, tileid: number}) => {
            return {
              duration,
              ...this.tiles[tileid + 1]
            }
          })

          const loop = () => {
            const state = queue[i++]
            i === queue.length && (i = 0)
            this.tiles[id + 1] = state
            this.update()
            setTimeout(loop, state.duration)
          }

          loop()
        } else if (image) {
          this.tiles[firstgid + id] = {
            type: 'image',
            frame: new PIXI.Rectangle(0, 0, imagewidth, imageheight),
            texture: this.tileset[image]
          }
        }
      }
    }
  }
}