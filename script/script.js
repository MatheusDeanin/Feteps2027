// 1. Navegação
const botoes = [
    { id: "Inicial", link: "index.html" },
    { id: "Tabela", link: "TabelaAnual.html" }
];

botoes.forEach(botao => {
    const el = document.getElementById(botao.id);
    if (el) {
        el.addEventListener("click", () => {
            window.location.href = `./${botao.link}`;
        });
    }
});

// 2. Função de Cálculo
async function calcular(event) {
    event.preventDefault();

    let salario = parseFloat(document.getElementById("salario").value);
    let despesas = parseFloat(document.getElementById("despesas").value);
    let mes = parseInt(document.getElementById("mes").value);

    // 🔥 VALIDAÇÃO
    if (isNaN(salario) || isNaN(despesas) || isNaN(mes)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (mes < 1 || mes > 12) {
        alert("Mês inválido!");
        return;
    }

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

    // 🔥 VERIFICA FIREBASE
    if (!window.db || !window.addDoc || !window.collection) {
        alert("Firebase não está carregado corretamente!");
        return;
    }

    try {
        await window.addDoc(window.collection(window.db, "financas"), {
            salario,
            despesas,
            mes,
            investimento: investimentos,
            diversao: uso
        });

        document.getElementById("resultado").innerHTML = `
            <b>Resultado Salvo:</b><br><br>
            Salário: R$ ${salario.toFixed(2)} <br>
            Despesas: R$ ${despesas.toFixed(2)} <br>
            Sobra: R$ ${sobra.toFixed(2)} <br><br>
            ${mensagem} <br><br>
            Investimentos: R$ ${investimentos.toFixed(2)} <br>
            Uso livre: R$ ${uso.toFixed(2)}
        `;

    } catch (e) {
        console.error("Erro ao salvar:", e);
        alert("Erro ao salvar no Firebase!");
    }
}

// 3. Preencher tabela
function preencherTabela(salario, despesas, mes) {
    let sobra = salario - despesas;
    let invest = sobra > 0 ? sobra * 0.75 : 0;
    let div = sobra > 0 ? sobra * 0.25 : 0;

    const s = document.getElementById(`salario-${mes}`);
    const d = document.getElementById(`despesas-${mes}`);
    const i = document.getElementById(`investimento-${mes}`);
    const v = document.getElementById(`diversao-${mes}`);

    if (s) s.innerText = `R$ ${salario.toFixed(2)}`;
    if (d) d.innerText = `R$ ${despesas.toFixed(2)}`;
    if (i) i.innerText = `R$ ${invest.toFixed(2)}`;
    if (v) v.innerText = `R$ ${div.toFixed(2)}`;
}

// 4. Carregar dados
async function carregarDados() {
    if (!document.getElementById("salario-1")) return;

    if (!window.db || !window.getDocs || !window.collection) {
        console.warn("Firebase não carregado.");
        return;
    }

    try {
        const querySnapshot = await window.getDocs(
            window.collection(window.db, "financas")
        );

        // 🔥 LIMPA TUDO
        for (let i = 1; i <= 12; i++) {
            ["salario", "despesas", "investimento", "diversao"].forEach(tipo => {
                const el = document.getElementById(`${tipo}-${i}`);
                if (el) el.innerText = "";
            });
        }

        querySnapshot.forEach((doc) => {
            let dados = doc.data();

            preencherTabela(
                dados.salario,
                dados.despesas,
                parseInt(dados.mes)
            );
        });

    } catch (e) {
        console.error("Erro ao carregar dados:", e);
    }
}

// Inicialização
window.onload = carregarDados;
window.calcular = calcular;