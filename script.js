document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CONFIGURAÇÃO
    // ==========================================

    // Segunda-feira da semana de referência
    const dataInicio = new Date(2026, 8, 21);

    // ==========================================
    // ESCALA INICIAL DA QUARTA-FEIRA
    // ==========================================
    //
    // Área 1 → 4
    // Área 2 → 1
    // Área 3 → 2
    // Área 4 → 5
    // Área 5 → 3
    //
    const escalaInicial = [4, 1, 2, 5, 3];

    // ==========================================
    // ESCALA DO BANHEIRO
    // ==========================================
    //
    // Semana 0:
    // Segunda → 5
    // Quinta  → 1
    //
    // Semana 1:
    // Segunda → 2
    // Quinta  → 3
    //
    // Semana 2:
    // Segunda → 4
    // Quinta  → 5
    //
    // Semana 3:
    // Segunda → 1
    // Quinta  → 2
    //
    // Semana 4:
    // Segunda → 3
    // Quinta  → 4
    //
    const escalaBanheiro = [5, 1, 2, 3, 4];


    // ==========================================
    // CALCULAR A SEMANA ATUAL AUTOMATICAMENTE
    // ==========================================

    const hoje = new Date();

    // Remove horas/minutos/segundos para comparar somente as datas
    hoje.setHours(0, 0, 0, 0);

    const inicio = new Date(dataInicio);
    inicio.setHours(0, 0, 0, 0);

    // Diferença entre hoje e a data de referência
    const diferencaEmMilissegundos =
        hoje.getTime() - inicio.getTime();

    const diferencaEmDias =
        Math.floor(
            diferencaEmMilissegundos /
            (1000 * 60 * 60 * 24)
        );

    // Cada 7 dias representa uma nova semana
    let semanaAtual =
        Math.floor(diferencaEmDias / 7);


    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const botaoAnterior =
        document.getElementById("semana-anterior");

    const botaoProxima =
        document.getElementById("proxima-semana");

    const textoSemana =
        document.getElementById("semana-atual");

    const textoData =
        document.getElementById("data-semana");


    // ==========================================
    // ATUALIZAR ESCALA
    // ==========================================

    function atualizarEscala() {

        // ======================================
        // SEGUNDA E QUINTA-FEIRA
        // ======================================

        /*
            Cada semana avança duas posições.

            Semana 0:
            Segunda → 5
            Quinta  → 1

            Semana 1:
            Segunda → 2
            Quinta  → 3

            Semana 2:
            Segunda → 4
            Quinta  → 5
        */

        const posicaoSegunda =
            (semanaAtual * 2) % 5;

        const posicaoQuinta =
            (posicaoSegunda + 1) % 5;

        const segunda =
            escalaBanheiro[posicaoSegunda];

        const quinta =
            escalaBanheiro[posicaoQuinta];


        const diasDaAla =
            document.querySelectorAll(
                ".ala > .dia .escala strong"
            );


        if (diasDaAla.length >= 2) {

            // Somente o número do quarto
            diasDaAla[0].textContent = segunda;
            diasDaAla[1].textContent = quinta;
        }


        // ======================================
        // QUARTA-FEIRA
        // ======================================

        /*
            A limpeza da residência acontece
            a cada 4 semanas.

            A cada limpeza, os quartos avançam
            uma área.
        */

        const limpezaResidencia =
            Math.floor(semanaAtual / 4);

        const rotacao =
            ((limpezaResidencia % 5) + 5) % 5;


        const quartaElementos =
            document.querySelectorAll(
                "main > .dia .quarto"
            );


        quartaElementos.forEach(
            (elemento, indice) => {

                const posicao =
                    (indice - rotacao + 5) % 5;

                const quarto =
                    escalaInicial[posicao];

                // Somente o número
                elemento.textContent = quarto;
            }
        );


        // ======================================
        // DATA DA SEMANA
        // ======================================

        const dataSemana =
            new Date(dataInicio);

        dataSemana.setDate(
            dataSemana.getDate() +
            (semanaAtual * 7)
        );


        const dia =
            String(dataSemana.getDate())
                .padStart(2, "0");

        const mes =
            String(dataSemana.getMonth() + 1)
                .padStart(2, "0");

        const ano =
            dataSemana.getFullYear();


        textoData.textContent =
            `${dia}/${mes}/${ano}`;


        // ======================================
        // TEXTO DA SEMANA
        // ======================================

        if (semanaAtual === 0) {

            textoSemana.textContent =
                "Semana atual";

        } else if (semanaAtual > 0) {

            textoSemana.textContent =
                `Semana +${semanaAtual}`;

        } else {

            textoSemana.textContent =
                `Semana ${semanaAtual}`;
        }
    }


    // ==========================================
    // SEMANA ANTERIOR
    // ==========================================

    botaoAnterior.addEventListener(
        "click",
        () => {

            semanaAtual--;

            atualizarEscala();
        }
    );


    // ==========================================
    // PRÓXIMA SEMANA
    // ==========================================

    botaoProxima.addEventListener(
        "click",
        () => {

            semanaAtual++;

            atualizarEscala();
        }
    );


    // ==========================================
    // INICIAR
    // ==========================================

    atualizarEscala();

});