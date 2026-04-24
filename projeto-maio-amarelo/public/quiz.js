// quiz.js - Versão "Melhorada"
document.getElementById('quiz-form').addEventListener('submit', function(e) {
    const botao = document.querySelector('.btn-enviar');
    
    // 1. Troca o texto do botão para dar um feedback visual
    botao.innerText = "Processando nota...";
    botao.style.backgroundColor = "#ffcc00"; // Cor de "atenção"
    botao.style.cursor = "not-allowed";

    console.log("Enviando respostas para o motor C++ e salvando no SQLite...");
    
    // O formulário continuará o envio normal para o /processar-quiz
})