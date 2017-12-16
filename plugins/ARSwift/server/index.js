var PluginBase = require('../../../public/src/plugin/PluginBase.js')

class Main extends PluginBase {
  onLoad () {
    const data = []
    const chunks = Vokkit.getServer().getWorlds()[0].getChunks()
    for (const i in chunks) { //16 * 256 * 16
      const chunkData = chunks[i].chunkData
      for (const x in chunkData) {
        for (const y in chunkData[x]) {
          for (const z in chunkData[x][y]) {
            if (chunkData[x][y][z].getType().id === 0) continue
            data.push({x, y, z, id: chunkData[x][y][z].getType().id})
          }
        }
      }
      //chunkData[x][y][z] = Block
    }
    console.log(JSON.stringify(data))
  }
}

module.exports = Main
