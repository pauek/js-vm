
const VirtualMachine = require('./vm')
const asm = require('./asm')

let [_1, _2, ...args] = process.argv
if (args.length === 0) {
  console.error(`usage: node main.js <file.asm> <args>...`)
  process.exit(1)
}
const vm = new VirtualMachine()
vm.setTrace(args.indexOf('--trace') !== -1)
args = args.filter(a => a !== '--trace')
const [filename, ...params] = args
const prog = asm.read(filename)
vm.push(...params.map(p => Number(p)))
vm.init(prog)
vm.run()





