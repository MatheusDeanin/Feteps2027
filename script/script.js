import { db, collection, addDoc } from "./firebase.js";

// 🔥 BOTÕES
document.getElementById("Inicial").onclick = () => {
    window.location.href = "index.html";
};

document.getElementById("Tabela").onclick = () => {
    window.location.href = "TabelaAnual.html";
};

// 🔥 FORM
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");

    if (!form) {
        console.error("❌ Form não encontrado! Confere o ID no HTML.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let salario = parseFloat(document.getElementById("salario").value);
        let despesas = parseFloat(document.getElementById("despesas").value);
        let mes = parseInt(document.getElementById("mes").value);

        if (isNaN(salario) || isNaN(despesas) || isNaN(mes)) {
            alert("Preencha tudo!");
            return;
        }

        let sobra = salario - despesas;
        let investimento = sobra > 0 ? sobra * 0.75 : 0;
        let uso = sobra > 0 ? sobra * 0.25 : 0;

        try {
            await addDoc(collection(db, "financas"), {
                salario,
                despesas,
                mes,
                investimento,
                uso
            });

            document.getElementById("resultado").innerHTML = "✅ Salvo com sucesso!";
        } catch (erro) {
            console.error("Erro Firebase:", erro);
        }
    });

});