
const { opcode, opcodeInfo } = require('./opcode')
const VirtualMachine = require('./vm')

const vm = new VirtualMachine()
const prog = [
  opcode.PUSH, 200000,
  opcode.PUSH, 3,
  opcode.ADD,
  opcode.PR,
  opcode.HALT,
]
vm.init(prog)
vm.run()

const prog2 = [
  opcode.PUSH, 10,
  opcode.PUSH, 5,
  opcode.PUSH, 3,
  opcode.INC,
  opcode.SUB,
  opcode.INC,
  opcode.MUL,
  opcode.DEC,
  opcode.PR,
]
vm.init(prog2)
vm.run()




