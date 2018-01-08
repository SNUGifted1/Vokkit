const PluginBase = require('../../../src/io/github/Vokkit/plugin/PluginBase.js')
const PosCommand = require('./commands/PosCommand')
const SetCommand = require('./commands/SetCommand')

class Main extends PluginBase {
  onLoad () {
    const posCommand = new PosCommand(this)
    const setCommand = new SetCommand(this)
    Vokkit.getServer().getCommandManager().getCommandProvider().register(posCommand)
    Vokkit.getServer().getCommandManager().getCommandProvider().register(setCommand)
  }
}

module.exports = Main
