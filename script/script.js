const botoes = [
    { id: "Inicial", link:"index.html"},
    { id: "Tabela", link:"TabelaAnual.html"}
];

botoes.forEach(botao => {
    const el = document.getElementById(botao.id);
    if (el) {
        el.addEventListener("click", () => {
            window.location.href = `./${botao.link}`;
        });
    }
});

async function calcular(event) {
    event.preventDefault();

    let salario = parseFloat(document.getElementById("salario").value);
    let despesas = parseFloat(document.getElementById("despesas").value);
    let mes = document.getElementById("mes").value;

    let limiteDespesas = salario * 0.80;
    let sobra = salario - despesas;

    let mensagem = "";
    let investimentos = 0;
    let uso = 0;

    if (despesas > limiteDespesas) {
        mensagem = "⚠️ Você está acima do limite de 80% em despesas!";
    } else {
        mensagem = "✅ Suas despesas estão dentro do limite.";
    }

    if (sobra <= 0) {
        investimentos = 0;
        uso = 0;
        mensagem += "<br><br>❌ Você não tem dinheiro sobrando.";
    } else {
        investimentos = sobra * 0.75;
        uso = sobra * 0.25;
    }

    // 🔥 SALVAR NO FIREBASE
    await addDoc(collection(db, "financas"), {
        salario: salario,
        despesas: despesas,
        mes: mes
    });

    document.getElementById("resultado").innerHTML = `
        <b>Resultado:</b><br><br>

        Salário: R$ ${salario.toFixed(2)} <br>
        Despesas: R$ ${despesas.toFixed(2)} <br>
        Sobra: R$ ${sobra.toFixed(2)} <br><br>

        Limite ideal de despesas (80%): R$ ${limiteDespesas.toFixed(2)} <br><br>

        ${mensagem} <br><br>

        Investimentos: R$ ${investimentos.toFixed(2)} <br>
        Uso livre: R$ ${uso.toFixed(2)}
    `;
}

// 🔥 USADO NA TABELA

async function carregarDados() {
    const querySnapshot = await getDocs(collection(db, "financas"));

    // limpa a tabela
    for (let i = 1; i <= 12; i++) {
        document.getElementById(`salario-${i}`).innerText = "";
        document.getElementById(`despesas-${i}`).innerText = "";
        document.getElementById(`investimento-${i}`).innerText = "";
        document.getElementById(`diversao-${i}`).innerText = "";
    }

    querySnapshot.forEach((doc) => {
        let dados = doc.data();

        preencherTabela(
            dados.salario,
            dados.despesas,
            parseInt(dados.mes)
        );
    });
}

window.onload = carregarDados;