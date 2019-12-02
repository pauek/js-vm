
const { opcode, opcodeInfo } = require('./opcode')
const { sprintf } = require('sprintf-js')

const printf = (...args) => process.stdout.write(sprintf(...args))

const State = {
  halted: 'halted',
  running: 'running',
}

class VirtualMachine {
  constructor() {
    this.stack = []
    this.flag = false
    this.state = State.halted
    this._trace = false
  }

  init(code) {
    this.code = code
    this.ip = 0
    this.state = State.running
  }

  setTrace(newValue) {
    this._trace = newValue
  } 

  ok() {
    return this.state === State.running &&
      this.ip < this.code.length
  }

  _traceBegin() {
    this._traceAcum = sprintf("%04d: ", this.ip)
    const op = this.code[this.ip]
    const info = opcodeInfo[op]
    let instr = info.name
    for (let i = 0; i < info.numArgs; i++) {
      instr += ` ${this.code[this.ip + 1 + i]}`
    }
    this._traceAcum += sprintf("%-15s", instr)
    this._traceAcum += sprintf("[%s]", this.stack.join(", "))
  }

  _traceEnd() {
    console.log(this._traceAcum + ` -> [${this.stack.join(', ')}]`)
  }

  step() {

    if (this._trace) this._traceBegin()

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
        push(...top())
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

      case opcode.BR: {
        const newip = next()
        this.ip = newip
        break
      }

      default:
        throw new Error(
          `VM Panic: unknown instruction '${opcodeInfo[op].name}'`
        )
    }

    if (this._trace) this._traceEnd()
  }

  run() {
    while (this.ok()) {
      this.step()
    }
  }
}

module.exports = VirtualMachine