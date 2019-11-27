
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




