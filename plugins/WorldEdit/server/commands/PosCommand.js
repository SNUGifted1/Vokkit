const Command = require('../../../../src/io/github/Vokkit/command/commands/Command.js')
const ParameterType = require('../../../../src/io/github/Vokkit/command/parameter/ParameterType.js')
const Location = require('../../../../src/io/github/Vokkit/Location')

class PosCommand extends Command {
  constructor (main) {
    super('pos', '월드에딧 기준점을 설정합니다', '/pos <1/2> (x, y, z)', [
      [ParameterType.NUMBER],
      [ParameterType.NUMBER, ParameterType.NUMBER, ParameterType.NUMBER, ParameterType.NUMBER]
    ])
    this.main = main
    this.main.pos = []
  }

  execute (parameterNumber, sender, parameter) {
    if (!sender.getPlayer) {
      sender.sendMessage('이 명령어는 인게임에서만 사용 가능합니다.')
      return
    }
    const player = sender.getPlayer()
    const number = parameter[0].getValue()
    switch (parameterNumber) {
      case 0:
        if (number === 1) {
          if (!this.main.pos[player.getId()]) this.main.pos[player.getId()] = []
          this.main.pos[player.getId()][0] = player.getLocation()
          sender.sendMessage(`지점 1 설정: ${this.main.pos[player.getId()][0].x}, ${this.main.pos[player.getId()][0].y}, ${this.main.pos[player.getId()][0].z}`)
        } else if (number === 2) {
          if (!this.main.pos[player.getId()]) this.main.pos[player.getId()] = []
          this.main.pos[player.getId()][1] = player.getLocation()
          sender.sendMessage(`지점 2 설정: ${this.main.pos[player.getId()][1].x}, ${this.main.pos[player.getId()][1].y}, ${this.main.pos[player.getId()][1].z}`)
        } else {
          sender.sendMessage(this.getUsage())
          return
        }
        break
      case 1:
        if (number === 1) {
          if (!this.main.pos[player.getId()]) this.main.pos[player.getId()] = []
          this.main.pos[player.getId()][0] = new Location(player.getWorld(), parameter[1].getValue(), parameter[2].getValue(), parameter[3].getValue())
          sender.sendMessage(`지점 1 설정: ${this.main.pos[player.getId()][0].x}, ${this.main.pos[player.getId()][0].y}, ${this.main.pos[player.getId()][0].z}`)
        } else if (number === 2) {
          if (!this.main.pos[player.getId()]) this.main.pos[player.getId()] = []
          this.main.pos[player.getId()][1] = new Location(player.getWorld(), parameter[1].getValue(), parameter[2].getValue(), parameter[3].getValue())
          sender.sendMessage(`지점 2 설정: ${this.main.pos[player.getId()][1].x}, ${this.main.pos[player.getId()][1].y}, ${this.main.pos[player.getId()][1].z}`)
        } else {
          sender.sendMessage(this.getUsage())
          return
        }
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = PosCommand
