const Material = require('../../../src/io/github/Vokkit/Material')

function parse (code, position, yaw, material = Material.STONE) {
  const result = []
  const data = code.split('')
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 's') {
      position.add(JavamalParser.yawToVector(yaw))
      result.push({
        position: position.clone(),
        material: material
      })
    } else if (data[i] === 'u') {
      position.add(new THREE.Vector3(0, 1, 0))
      result.push({
        position: position.clone(),
        material: material
      })
    } else if (data[i] === 'd') {
      position.add(new THREE.Vector3(0, -1, 0))
      result.push({
        position: position.clone(),
        material: material
      })
    } else if (data[i] === 't') {
      position.add(JavamalParser.yawToVector(yaw + Math.PI))
      result.push({
        position: position.clone(),
        material: material
      })
    } else if (data[i] === 'r') {
      position.add(JavamalParser.yawToVector(yaw + Math.PI / 2))
      result.push({
        position: position.clone(),
        material: material
      })
    } else if (data[i] === 'l') {
      position.add(JavamalParser.yawToVector(yaw - Math.PI / 2))
      result.push({
        position: position.clone(),
        material: material
      })
    } else if (data[i] === 'R') {
      yaw += Math.PI / 2
    } else if (data[i] === 'L') {
      yaw -= Math.PI / 2
    } else if (data[i] === '[') {
      const savedPosition = position.clone()
      const savedYaw = yaw
      let closecount = 1
      let partialCode = ''
      for (let j = i + 1; j < data.length; j++) {
        if (data[j] === '[') closecount++
        else if (data[j] === ']') closecount--
        if (closecount === 0) break
        partialCode += data[j]
        if (j === data.length - 1) return null
      }
      const partialResult = parse(partialCode, position, yaw, material)
      if (partialResult === null) return null
      for (const j in partialResult) result.push(partialResult[j])
      i += partialCode.length + 2
      position = savedPosition
      yaw = savedYaw
    } else if (data[i] === 'h') {
      material = Material.AIR
    } else if (data[i] === 'c') {
      material = Material.STONE
    }
  }
  return result
}

class JavamalParser {
  /**
   * @param {String} code
   * @param {THREE.Vector3} position
   * @param {Number} yaw
   */
  parse (sender, code, position, yaw) {
    const data = code.split('')
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(data[i])) {
        let number = data[i]
        let charPos = i + 1
        for (let j = i + 1; j < data.length; j++) {
          if (!isNaN(data[j])) {
            number += data[j]
            charPos = j + 1
          }
          else break
        }
        number = parseInt(number)
        const char = data[charPos]
        data.splice(charPos - 1, 1)
        for (let j = 1; j < number; j++) data.splice(charPos, 0, char)
      }
    }
    code = data.join('')
    if (this.promise[sender.id]) {
      for (const i in this.promise[sender.id]) {
        code = code.split(i).join(this.promise[sender.id][i])
      }
    }
    while (yaw < 0) yaw += Math.PI * 2
    yaw %= Math.PI / 2
    yaw = Math.round(yaw / Math.PI * 2) * Math.PI / 2
    return parse(code, position, yaw)
  }

  promise (sender, char, newchar) {
    if (!this.promise[sender.id]) this.promise[sender.id] = []
    this.promise[sender.id][char] = newchar
  }

  static yawToVector (yaw) {
    return new THREE.Vector3(-Math.sin(yaw), 0, Math.cos(yaw))
  }
}

module.exports = new JavamalParser()
