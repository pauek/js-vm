  push 1
inicio:
  dup
  push 10000
  gt
  brt fin
  dup
  pr
  inc
  br inicio
fin:
  halt