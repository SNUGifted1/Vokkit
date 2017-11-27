const Command = require('../../../../src/io/github/Vokkit/command/commands/Command')
const ParameterType = require('../../../../src/io/github/Vokkit/command/parameter/ParameterType')
const JavamalParser = require('../JavamalParser')

class PromiseCommand extends Command {
  constructor () {
    super('promise', '자바말 코드에서 한 문자열에 기능을 약속합니다.', '/promise <char> <newChar>', [
      [ParameterType.STRING, ParameterType.STRING]
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
        const char = parameter[0].getValue()
        const newChar = parameter[1].getValue()
        JavamalParser.promise(sender, char, newChar)
        sender.sendMessage(`${char}을(를) ${newChar}로 약속했습니다.`)
        break
    }
  }
}

module.exports = PromiseCommand
