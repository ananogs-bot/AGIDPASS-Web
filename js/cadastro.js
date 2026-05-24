import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form = document.getElementById("formCadastro");
const tipoConta = document.getElementById("tipoConta");
const camposProfissional = document.getElementById("camposProfissional");

tipoConta.addEventListener("change", () => {
  if (tipoConta.value === "profissional") {
    camposProfissional.style.display = "block";
  } else {
    camposProfissional.style.display = "none";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const tipoUsuario = tipoConta.value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = credencial.user.uid;

    if (tipoUsuario === "cliente") {
      await setDoc(doc(db, "clientes", uid), {
        id: uid,
        nome,
        email,
        cpf,
        cep,
        tipoUsuario: "cliente",
        criadoEm: new Date()
      });
    }

    if (tipoUsuario === "profissional") {
      const descricao = document.getElementById("descricao").value.trim();

      const especialidades = [];
      document.querySelectorAll(".especialidade:checked").forEach((item) => {
        especialidades.push(item.value);
      });

      await setDoc(doc(db, "profissionais", uid), {
        id: uid,
        nome,
        email,
        cpf,
        cep,
        descricao,
        especialidades,
        tipoUsuario: "profissional",
        ativo: true,
        avaliacaoMedia: 0,
        quantidadeAvaliacoes: 0,
        fotoPerfil: "",
        endereco: null,
        numero: 0,
        criadoEm: new Date()
      });
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar: " + error.message);
  }
});