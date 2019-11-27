
// Códigos de todos los opcodes
const opcode = {}

// Información de los opcodes
const opcodeInfo = new Array(256)

const _opcodeList = [
  { name: "HALT", code: 0, numArgs: 0 },
  { name: "PUSH", code: 1, numArgs: 1 },
  { name: "POP", code: 2, numArgs: 0 },

  { name: "ADD", code: 10, numArgs: 0 },
]

_opcodeList.forEach(op => {
  opcode[op.name] = op.code
  opcodeInfo[op.code] = op
})

module.exports = {
  opcode,
  opcodeInfo,
}