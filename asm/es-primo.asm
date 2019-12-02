  // asumimos que en la pila hay el número de entrada (N)
  push 2
inicio:
  // mirar si el divisor es menor que N
  dup2
  dup
  mul
  lt
  brt primo
  dup2
  mod
  push 0
  eq
  brt noprimo
  inc
  br inicio
noprimo:
  push 0
  pr 
  halt
primo:
  push 1
  pr
  halt