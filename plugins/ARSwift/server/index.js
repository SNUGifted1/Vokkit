var PluginBase = require('../../../public/src/plugin/PluginBase.js')

class Main extends PluginBase {
  onLoad() {
    const app = Vokkit.getServer().app
    app.use('/json/world', (res, req, next) => {
      const data = Vokkit.getServer().getWorlds()[0].toArray()
      const newData = {}
      let count = 0
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i][3] === 0) {
          data.splice(i, 1)
          continue
        } else if (!Array.isArray(data[i])) {
          continue
        }
        newData[count + ''] = {x: data[i][0], y: data[i][1], z: data[i][2], id: data[i][3]}
        count++
      }
      const result = JSON.stringify(newData)
      req.write(result)
      req.end()
    })

    app.use('/json/player', (res, req, next) => {
      const players = Vokkit.getServer().getPlayers()
      const data = {}
      let count = 0
      for (const i in players) {
        data[count] = players[i].toObject()
        count++
      }
      const result = JSON.stringify(data)
      req.write(result)
      req.end()
    })
  }
}

module.exports = Main
