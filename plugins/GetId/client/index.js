var PluginBase = require('../../../public/src/plugin/PluginBase.js')

class Main extends PluginBase {
  onLoad () {
    if (location.href.indexOf('id=') !== -1) {
      const id = location.href.split('id=')[1].split('&')[0]
      Vokkit.getClient().getLoginManager().requestLogin(id)
    }
  }
}

module.exports = Main
