console.log("linha 1");
try {
  throw new Error("erro na linha 2");
} catch (facada) {
  console.log("ta tudo preso seus cabroes:", facada.message);
}
console.log("linha 3");
