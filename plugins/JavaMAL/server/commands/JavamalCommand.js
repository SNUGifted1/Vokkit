const Command = require('../../../../src/io/github/Vokkit/command/commands/Command')
const ParameterType = require('../../../../src/io/github/Vokkit/command/parameter/ParameterType')
const JavamalParser = require('../JavamalParser')
const Block = require('../../../../src/io/github/Vokkit/block/Block')

class JavamalCommand extends Command {
  constructor () {
    super('javamal', '자바말 코드를 실행합니다.', '/javamal <Code>', [
      [ParameterType.STRING]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        if (!sender.getPlayer) {
          sender.sendMessage('이 명령어는 인게임에서만 사용 가능합니다.')
          return
        }
        sender = sender.getPlayer()
        const code = parameter[0].getValue()
        const position = sender.getLocation().toVector()
        let yaw = sender.getLocation().getYaw()
        const blockData = JavamalParser.parse(sender, code, position, yaw)
        for (const i in blockData) {
          sender.getLocation().getWorld().setBlock(new Block(blockData[i].position, blockData[i].material.id))
        }
        sender.sendMessage('자바말 코드를 실행했습니다.')
        break
    }
  }
}

module.exports = JavamalCommand
