var PluginBase = require('../../../public/src/plugin/PluginBase.js')

var data = {

}

var jaw = 0

class Main extends PluginBase {
  onEnable() {
    var enabled = false
    var Muse = {
      eegReceiver: function (type, d1, d2, d3, d4, d5, d6) {
        enabled = true
        data[type] = [d1, d2, d3, d4, d5, d6]
        if (type == 'ARTIFACTS') {
          if (d3 == '1') {
            Vokkit.getClient().getScreenManager().getScreen('ChatScreen').addChat('JAW')
            jaw = 10
          }
        }
      }
    }

    global.Muse = Muse

    var localPlayer = Vokkit.getClient().getLocalPlayer()

    setInterval(function () {
      if (enabled) {
        for (var i in data) {
          if (i != 'IS_GOOD' && i != 'ARTIFACTS') continue
          Vokkit.getClient().getScreenManager().getScreen('ChatScreen').addChat('status ' + data[i].join(', '))
        }
        if (data['ARTIFACTS'][2] == 1) {
          Vokkit.getClient().getScreenManager().getScreen('ChatScreen').addChat("IAMBLINKING!!!")
        }
        try {
          jaw--
          if (jaw > 0) {
            var location = localPlayer.getLocation()
            var yaw = location.getYaw()
            var pitch = location.getPitch()
            localPlayer.teleport(location.add(-Math.sin(yaw) * Math.cos(pitch) * 0.1, Math.sin(pitch) * 0.1, Math.cos(yaw) * Math.cos(pitch) * 0.1))
            Vokkit.getClient().getScreenManager().getScreen('ChatScreen').addChat("MOVING!!!")
          }
        } catch (e) {
          Vokkit.getClient().getSceneManager().getScreen('ChatScreen').addChat(e)
        }
      }
    }, 50)
  }
}

module.exports = Main