const PluginBase = require('../../../src/io/github/Vokkit/plugin/PluginBase.js')

const JavamalCommand = require('./commands/JavamalCommand.js')
const PromiseCommand = require('./commands/PromiseCommand.js')

class Main extends PluginBase {
  onLoad () {
    Vokkit.getServer().getCommandManager().getCommandProvider().register(new JavamalCommand())
    Vokkit.getServer().getCommandManager().getCommandProvider().register(new PromiseCommand())
    Vokkit.getServer().getLogger().info('JavaMAL이 로드되었습니다!')
  }

  onEnable () {
  }
}

module.exports = Main
