var PluginBase = require('../../../public/src/plugin/PluginBase.js')
var Chunk = require('../../../public/src/Chunk.js')

class Main extends PluginBase {
  onLoad () {
    if (location.href.indexOf('isSwift=') !== -1) {
      this.b = location.href.split('isSwift=')[1].split('&')[0]
      if (this.b === 'true') {
        Vokkit.getClient().getScreenManager().getScreen('MainScreen').start = () => {}
        Chunk.prototype.toMesherData = () => {
          return new THREE.Mesh()
        }
      }
    }
  }

  onEnable () {
    if (this.b === 'true') {
      const data = []
      const chunks = Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getChunks()
      for (const i in chunks) { // 16 * 256 * 16
        const chunkData = chunks[i].chunkData
        for (const x in chunkData) {
          for (const y in chunkData[x]) {
            for (const z in chunkData[x][y]) {
              if (chunkData[x][y][z].getType().id === 0) continue
              data.push({x, y, z, id: chunkData[x][y][z].getType().id})
            }
          }
        }
        // chunkData[x][y][z] = Block
      }
      console.log(JSON.stringify(data))
    }
  }
}

module.exports = Main
