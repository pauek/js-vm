
const { opcode, opcodeInfo } = require('./opcode')
const VirtualMachine = require('./vm')
const asm = require('./asm')

const [_1, _2, ...args] = process.argv
if (args.length === 0) {
  console.error(`usage: node main.js <file.asm>`)
  process.exit(1)
}
console.log(asm.read(args[0]))
process.exit(0)

const vm = new VirtualMachine()
vm.init(prog)
vm.run()





