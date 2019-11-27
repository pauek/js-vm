
// Códigos de todos los opcodes
const opcode = {}

// Información de los opcodes
const opcodeInfo = new Array(256)

const _opcodeList = [
  { name: "HALT", code: 0, numArgs: 0 },
  { name: "PUSH", code: 1, numArgs: 1 },
  { name: "POP", code: 2, numArgs: 0 },
  { name: "DUP", code: 3, numArgs: 0 },
  { name: "DUP2", code: 4, numArgs: 0 },

  { name: "INC", code: 5, numArgs: 0 },
  { name: "DEC", code: 6, numArgs: 0 },

  { name: "ADD", code: 10, numArgs: 0 },
  { name: "SUB", code: 11, numArgs: 0 },
  { name: "MUL", code: 12, numArgs: 0 },
  { name: "DIV", code: 13, numArgs: 0 },
  { name: "MOD", code: 14, numArgs: 0 },

  { name: "LT", code: 20, numArgs: 0 },
  { name: "GT", code: 21, numArgs: 0 },
  { name: "LE", code: 22, numArgs: 0 },
  { name: "GE", code: 23, numArgs: 0 },
  { name: "EQ", code: 24, numArgs: 0 },
  { name: "NEQ", code: 25, numArgs: 0 },

  { name: "BR", code: 30, numArgs: 1 },
  { name: "BRF", code: 31, numArgs: 1 },
  { name: "BRT", code: 32, numArgs: 1 },

  { name: "PR", code: 100, numArgs: 0 },
]

_opcodeList.forEach(op => {
  opcode[op.name] = op.code
  opcodeInfo[op.code] = op
})

module.exports = {
  opcode,
  opcodeInfo,
}