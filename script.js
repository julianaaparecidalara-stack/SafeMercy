// Alternar abas do menu superior
function switchTab(tabId) {
  // Esconde todas as seções de conteúdo
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.add('hidden'));

  // Remove a classe ativa de todos os botões
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Mostra a seção selecionada e ativa o botão correspondente
  const targetSection = document.getElementById(`sec-${tabId}`);
  if (targetSection) {
    targetSection.classList.remove('hidden');
  }

  const targetButton = document.getElementById(`tab-${tabId}`);
  if (targetButton) {
    targetButton.classList.add('active');
  }
}

// Menu Mobile
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

// Funções de Exemplo de Toxidade / Cyberbullying
function setSampleToxicity(id) {
  const textarea = document.getElementById('toxicity-text');
  if (!textarea) return;

  if (id === 1) {
    textarea.value = "Se você não sair da partida agora, vamos divulgar seu endereço e suas fotos nas redes sociais.";
  } else if (id === 2) {
    textarea.value = "Ninguém gosta de você aqui, é melhor sumir e parar de postar coisas.";
  } else if (id === 3) {
    textarea.value = "Passa o link da sua conta ou todo mundo vai saber o que você fez.";
  }
}

function analyzeToxicity() {
  const text = document.getElementById('toxicity-text').value;
  const output = document.getElementById('toxicity-output');

  if (!text.trim()) {
    showToast("Por favor, digite ou selecione uma mensagem para analisar.", "warning");
    return;
  }

  output.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
      <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--rose-main);"></i>
      <p style="font-size: 0.875rem; color: var(--text-muted);">Analisando padrões de agressão verbal e risco...</p>
    </div>
  `;

  setTimeout(() => {
    output.innerHTML = `
      <div style="width: 100%;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <strong style="color: var(--rose-main); font-size: 0.95rem;">Risco Alto Detectado (88%)</strong>
          <span style="font-size: 0.75rem; background: rgba(244, 63, 94, 0.2); color: var(--rose-main); padding: 0.2rem 0.5rem; border-radius: 9999px;">Ameaça / Chantagem</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-sub); margin-bottom: 1rem;">O texto contém indícios fortes de coerção, intimidação e violação de privacidade.</p>
        <div style="background: rgba(2, 6, 23, 0.5); padding: 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
          <strong>Recomendação:</strong> Tire capturas de tela (prints) com URL e data, bloqueie o usuário imediatamente e não ceda a chantagens.
        </div>
      </div>
    `;
    showToast("Análise concluída com sucesso!", "success");
  }, 1200);
}

// Simulador de Scanner de Link / Arquivo
function startUrlScan() {
  const urlInput = document.getElementById('url-input').value;
  const progressBox = document.getElementById('scan-progress');
  const progressBar = document.getElementById('scan-bar');
  const percentage = document.getElementById('scan-percentage');
  const statusText = document.getElementById('scan-status-text');
  const scanLog = document.getElementById('scan-log');
  const resultDiv = document.getElementById('scan-result');

  if (!urlInput.trim()) {
    showToast("Insira um link ou URL válida para escanear.", "warning");
    return;
  }

  progressBox.classList.remove('hidden');
  resultDiv.classList.add('hidden');
  progressBar.style.width = '0%';
  percentage.innerText = '0%';
  scanLog.innerHTML = `<span>> Inicializando varredura de link...</span>`;

  let progress = 0;
  const interval = setInterval(() => {
    progress += 25;
    progressBar.style.width = progress + '%';
    percentage.innerText = progress + '%';

    if (progress === 50) {
      scanLog.innerHTML += `<br><span>> Checando reputação de domínio e SSL...</span>`;
    } else if (progress === 75) {
      scanLog.innerHTML += `<br><span>> Analisando histórico de phishing...</span>`;
    }

    if (progress >= 100) {
      clearInterval(interval);
      statusText.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: var(--rose-main);"></i> Link Suspeito Encontrado!`;
      
      resultDiv.classList.remove('hidden');
      resultDiv.className = "scan-result-card result-danger";
      resultDiv.innerHTML = `
        <i class="fa-solid fa-shield-virus" style="font-size: 2rem; color: var(--rose-main);"></i>
        <div>
          <strong>Atenção: Domínio com histórico malicioso.</strong>
          <p style="font-size: 0.75rem; margin-top: 0.25rem;">Este link pode redirecionar para páginas de roubo de credenciais ou download de spywares.</p>
        </div>
      `;
      showToast("Varredura finalizada com alertas!", "warning");
    }
  }, 400);
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const progressBox = document.getElementById('scan-progress');
  const progressBar = document.getElementById('scan-bar');
  const percentage = document.getElementById('scan-percentage');
  const statusText = document.getElementById('scan-status-text');
  const scanLog = document.getElementById('scan-log');
  const resultDiv = document.getElementById('scan-result');

  progressBox.classList.remove('hidden');
  resultDiv.classList.add('hidden');
  progressBar.style.width = '0%';
  percentage.innerText = '0%';
  scanLog.innerHTML = `<span>> Lendo arquivo: ${file.name}...</span>`;

  let progress = 0;
  const interval = setInterval(() => {
    progress += 34;
    if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%';
    percentage.innerText = progress + '%';

    if (progress === 34) {
      scanLog.innerHTML += `<br><span>> Verificando assinatura hash SHA-256...</span>`;
    } else if (progress === 68) {
      scanLog.innerHTML += `<br><span>> Checando comportamento heurístico...</span>`;
    }

    if (progress === 100) {
      clearInterval(interval);
      statusText.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--emerald-main);"></i> Arquivo Limpo!`;
      
      resultDiv.classList.remove('hidden');
      resultDiv.className = "scan-result-card result-safe";
      resultDiv.innerHTML = `
        <i class="fa-solid fa-shield-halved" style="font-size: 2rem; color: var(--emerald-main);"></i>
        <div>
          <strong>Nenhuma ameaça encontrada.</strong>
          <p style="font-size: 0.75rem; margin-top: 0.25rem;">O arquivo ${file.name} passou nas verificações de segurança.</p>
        </div>
      `;
      showToast("Arquivo seguro!", "success");
    }
  }, 400);
}

// Sistema de Notificações Toast
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  
  if (type === 'success') {
    toastIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--emerald-main);"></i>';
  } else if (type === 'warning') {
    toastIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: var(--amber-main);"></i>';
  } else {
    toastIcon.innerHTML = '<i class="fa-solid fa-circle-info" style="color: var(--cyan-main);"></i>';
  }

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
