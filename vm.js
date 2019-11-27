
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

  ok() {
    return this.state === State.running &&
      this.ip < this.code.length
  }

  step() {
    const next = () => {
      const value = this.code[this.ip]
      this.ip++
      return value
    }
    const push = (...args) => this.stack.push(...args)
    const top = (n = 1) => this.stack.slice(-n)
    const pop = () => this.stack.pop()
    const compare = (fn) => {
      const b = pop()
      const a = pop()
      this.flag = fn(a, b)
    }

    const op = next()
    // const info = opcodeInfo[op]
    switch (op) {
      case opcode.HALT:
        this.state = State.halted
        break

      case opcode.PUSH:
        push(next())
        break
      case opcode.POP:
        pop()
        break
      case opcode.DUP:
        push(top())
        break
      case opcode.DUP2:
        push(...top(2))
        break
      
      case opcode.INC:
        push(pop() + 1)
        break
      case opcode.DEC:
        push(pop() - 1)
        break

      case opcode.ADD: {
        const b = pop()
        const a = pop()
        push(a + b)
        break
      }
      case opcode.SUB: {
        const b = pop()
        const a = pop()
        push(a - b)
        break
      }
      case opcode.MUL: {
        const b = pop()
        const a = pop()
        push(a * b)
        break
      }
      case opcode.DIV: {
        const b = pop()
        const a = pop()
        push(a / b)
        break
      }
      case opcode.MOD: {
        const b = pop()
        const a = pop()
        push(a % b)
        break
      }
      case opcode.LT:
        compare((a, b) => a < b)
        break
      case opcode.GT:
        compare((a, b) => a > b)
        break
      case opcode.LE:
        compare((a, b) => a <= b)
        break
      case opcode.GE:
        compare((a, b) => a >= b)
        break
      case opcode.EQ:
        compare((a, b) => a === b)
        break
      case opcode.NEQ:
        compare((a, b) => a !== b)
        break

      case opcode.PR:
        console.log(pop())
        break

      default:
        throw new Error('VM Panic: unknown instruction')
    }
  }

  run() {
    while (this.ok()) {
      this.step()
    }
  }
}

module.exports = VirtualMachine