const fs = require('fs')
const { opcode, opcodeInfo } = require('./opcode')

const fatal = (msg) => {
  console.error(msg)
  process.exit(1)
}

const removeComments = (line) => {
  const pos = line.indexOf('//')
  return (pos === -1 ? line : line.slice(0, pos))
}

const isLabel = ln => ln[ln.length-1] === ':'
const getLabel = ln => ln.slice(0, ln.length-1)

const decodeInstruction = ln => {
  const [op, ...args] = ln.split(/[^\w]+/)
  const opc = opcode[op.toUpperCase()]
  if (opc === undefined) {
    fatal(`Unknown instruction '${op}'`)
  }
  return [opc, ...args.map(a => {
    const num = Number(a)
    return (isNaN(num) ? a : num)
  })]
}

const read = (filename) => {
  const lines = fs.readFileSync(filename).toString()
    .split('\n')
    .map(removeComments)
    .map(ln => ln.trim())
    .filter(ln => ln !== '')

  let labels = new Map()
  let ip = 0
  let code = []
  for (let ln of lines) {
    if (isLabel(ln)) {
      labels.set(getLabel(ln), ip)
    } else {
      const instr = decodeInstruction(ln)
      code.push(...instr)
      ip += instr.length
    }
  }
  return code.map(byte => {
    if (typeof byte !== 'string') {
      return byte
    }
    if (!labels.has(byte)) {
      fatal(`No existe el label ${byte}`)
    }
    return labels.get(byte)
  })
}

module.exports = {
  read,
}