import { db, collection, addDoc } from "./firebase.js";

// 🔥 BOTÕES
document.getElementById("Inicial").onclick = () => {
    window.location.href = "index.html";
};

document.getElementById("Tabela").onclick = () => {
    window.location.href = "TabelaAnual.html";
};

// 🔥 FORM
document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    let salario = parseFloat(document.getElementById("salario").value);
    let despesas = parseFloat(document.getElementById("despesas").value);
    let mes = parseInt(document.getElementById("mes").value);

    if (!salario || !despesas || !mes) {
        alert("Preencha tudo!");
        return;
    }

    let limite = salario * 0.80;
    let sobra = salario - despesas;

    let investimento = sobra > 0 ? sobra * 0.75 : 0;
    let uso = sobra > 0 ? sobra * 0.25 : 0;

    let mensagem = despesas > limite
        ? "⚠️ Acima de 80%!"
        : "✅ Dentro do limite!";

    try {
        await addDoc(collection(db, "financas"), {
            salario,
            despesas,
            mes,
            investimento,
            uso,
            criadoEm: new Date()
        });

        document.getElementById("resultado").innerHTML = `
            ✅ Salvo!<br><br>
            Sobra: R$ ${sobra.toFixed(2)}<br>
            Investimento: R$ ${investimento.toFixed(2)}<br>
            Uso: R$ ${uso.toFixed(2)}<br><br>
            ${mensagem}
        `;

    } catch (erro) {
        console.error(erro);
        alert("Erro no Firebase!");
    }
});