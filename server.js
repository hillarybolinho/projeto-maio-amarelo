const express = require('express');
const app = express();
const path = require('path');
const { exec } = require('child_process'); // Importante para rodar o C++
const db = require('./database'); // Importante para conectar ao SQLite

app.use(express.urlencoded({ extended: true }));

// Configuração das pastas
const pastaPublic = path.join(__dirname, 'projeto-maio-amarelo', 'public');
app.use(express.static(pastaPublic));

// Variável global para manter o nome do usuário durante a sessão
let usuarioLogado = "";

// 1. ROTA INICIAL
app.get('/', (req, res) => {
    res.sendFile(path.join(pastaPublic, 'index.html'));
});

// 2. ROTA DE LOGIN/CADASTRO
app.post('/registrar', (req, res) => {
    usuarioLogado = req.body.nome;
    console.log("👤 Usuário logado:", usuarioLogado);
    res.redirect('/quiz.html');
});

// 3. ROTA DO QUIZ (O CORAÇÃO DO PROJETO)
app.post('/processar-quiz', (req, res) => {
    const respostas = req.body;
    
    // Pegamos as respostas p1, p2, p3, p4, p5, p6 enviadas pelo formulário
    // e preparamos para o C++ ler como argumentos
    const args = `${respostas.p1} ${respostas.p2} ${respostas.p3} ${respostas.p4} ${respostas.p5} ${respostas.p6}`;

    console.log(`⚙️  Processando respostas de ${usuarioLogado}...`);

    // CHAMADA AO C++: Executa o arquivo 'processador' que você compilou
    exec(`./processador ${args}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Erro no C++: ${error}`);
            return res.status(500).send("Erro ao processar a nota.");
        }

        // O stdout é o que o C++ deu como 'cout' (a nota)
        const notaFinal = stdout.trim();

        // SALVANDO NO SQLITE
        const stmt = db.prepare("INSERT INTO resultados (nome, pontuacao) VALUES (?, ?)");
        stmt.run(usuarioLogado, notaFinal, function(err) {
            if (err) {
                console.error("❌ Erro ao salvar no banco:", err.message);
                return res.status(500).send("Erro ao salvar resultado.");
            }
            
            console.log(`✅ Banco de Dados Atualizado: ${usuarioLogado} tirou nota ${notaFinal}`);

            // REDIRECIONAMENTO FINAL: Manda para a página de resultados levando a nota na URL
            res.redirect(`/resultado.html?nota=${notaFinal}`);
        });
        stmt.finalize();
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 SERVIDOR RODANDO!`);
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log(`Aguardando jogadores...`);
});