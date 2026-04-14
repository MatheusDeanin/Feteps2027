import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");
    const status = document.getElementById("status");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const salario = document.getElementById("salario").value;
        const despesas = document.getElementById("despesas").value;
        const mes = document.getElementById("mes").value;

        try {
            await addDoc(collection(db, "financas"), {
                salario,
                despesas,
                mes,
                criadoEm: new Date()
            });

            status.innerText = "✅ Salvo no Firebase!";
            form.reset();

        } catch (erro) {
            console.error(erro);
            status.innerText = "❌ Erro ao salvar!";
        }
    });

});