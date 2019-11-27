
const { opcode, opcodeInfo } = require('./opcode')

const State = {
  halted: 'halted',
  running: 'running',
}

class VirtualMachine {
  constructor() {
    this.stack = []
    this.flag = false
    this.state = State.halted
  }

  init(code) {
    this.code = code
    this.ip = 0
    this.state = State.running
  }

  step() {
    const op = this.code[this.ip]
    this.ip++
    // const info = opcodeInfo[op]
    switch (op) {
      case opcode.HALT:
        this.state = State.halted
        break
      
      case opcode.PUSH:
        const arg = this.code[this.ip]
        this.ip++
        this.stack.push(arg)
        break
      
      case opcode.ADD:
        const b = this.stack.pop()
        const a = this.stack.pop()
        this.stack.push(a + b)
        break

      case opcode.PR:
        console.log(this.stack.pop())
        break
        
      default:
        throw new Error('VM Panic: unknown instruction')      
    }
  }

  run() {
    while (this.state === State.running) {
      this.step()
    }
  }

}

module.exports = VirtualMachine