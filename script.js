const botoesPlano = document.querySelectorAll(".btn-card");

botoesPlano.forEach((botao) => {
  botao.addEventListener("click", () => {
    console.log("Usuário clicou em um plano do AGID PASS");
  });
});