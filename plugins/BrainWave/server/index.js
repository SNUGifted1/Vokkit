const PluginBase = require('../../../src/io/github/Vokkit/plugin/PluginBase.js')
const Block = require('../../../src/io/github/Vokkit/block/Block')
const dgram = require('dgram')
const server = dgram.createSocket('udp4')

class Main extends PluginBase {
  onEnable () {
    let port = 62373 // 포트 지정 안하면 랜덤포트

    server.on('message', (msg, rinfo) => {
      if (msg.indexOf('blink') !== -1) {
        console.log('Blink detected')
        const firstPlayer = Vokkit.getServer().getPlayers()[0]
        const position = firstPlayer.getLocation().toVector()
        const yaw = firstPlayer.getLocation().getYaw()
        position.add(new THREE.Vector3(-Math.sin(yaw), 1, Math.cos(yaw)))
        position.x = Math.floor(position.x)
        position.y = Math.floor(position.y)
        position.z = Math.floor(position.z)
        console.log(position)
        firstPlayer.getLocation().getWorld().setBlock(new Block(position, 1))
      } else {
        return false
      }
    })

    server.on('listening', () => {
      var address = server.address()
      console.log('server is running on ' + address.address + ':' + address.port)
    })

    server.bind(port)
  }
}

module.exports = Main
