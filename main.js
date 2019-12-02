
const { opcode, opcodeInfo } = require('./opcode')
const VirtualMachine = require('./vm')
const asm = require('./asm')

const [_1, _2, ...args] = process.argv
if (args.length === 0) {
  console.error(`usage: node main.js <file.asm>`)
  process.exit(1)
}
const prog = asm.read(args[0])
const vm = new VirtualMachine()

vm.setTrace(args.indexOf('--trace') !== -1)
vm.init(prog)
vm.run()





