// ========== BALATRO TECH — Deck de Diagnósticos ==========

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5'];
const suitColors = { '♠': 'suit-black', '♥': 'suit-red', '♦': 'suit-red', '♣': 'suit-black' };

const baseQuestions = [
    {
        type: "interactive-mb-view",
        rank: "A", suit: "♠",
        question: "🛠️ ONDE VAI A MEMÓRIA? Você comprou um pente de RAM. Em qual lugar da placa-mãe ele encaixa?",
        options: [
            { text: "No encaixe longo da memória (DIMM)", icon: "fa-solid fa-memory" },
            { text: "No soquete do processador", icon: "fa-solid fa-microchip" },
            { text: "No slot da placa de vídeo, com pasta", icon: "fa-solid fa-flask" },
            { text: "No encaixe da memória, mas a placa de vídeo", icon: "fa-solid fa-network-wired" }
        ],
        correct: 0,
        explanation: "A memória RAM encaixa só nos slots longos chamados DIMM. Alinhe o corte do pente com o encaixe e trave."
    },
    {
        type: "interactive-beeps",
        rank: "K", suit: "♥",
        question: "🔊 TELA PRETA E 3 BIPS: O PC liga os coolers, a tela não acende e ouvem-se 3 bips longos. O que fazer primeiro?",
        beepInfo: "🔊 Bip... Bip... Bip... (3 Beeps Longos no POST)",
        options: [
            { text: "Achar que a CPU esquentou demais", icon: "fa-solid fa-temperature-arrow-up" },
            { text: "Tirar a memória, limpar e encaixar de novo", icon: "fa-solid fa-memory" },
            { text: "Trocar a fonte de energia", icon: "fa-solid fa-plug" },
            { text: "Trocar a pilhinha da placa-mãe", icon: "fa-solid fa-battery-quarter" }
        ],
        correct: 1,
        explanation: "Três bips longos costumam indicar problema na memória RAM. Reencaixar ou testar outro pente resolve muitos casos."
    },
    {
        type: "interactive-telemetry",
        rank: "Q", suit: "♦",
        question: "🔍 PC DESLIGA SOZINHO: Depois de uns 10 minutos o PC desliga. Veja os sensores e escolha a ação certa:",
        sensorData: {
            temp: "95°C (ALERTA CRÍTICO)",
            rpm: "0 RPM (COOLER TRAVADO)",
            volt: "12.1 V (TENSÃO OK)"
        },
        options: [
            { text: "Colocar uma fonte mais forte", icon: "fa-solid fa-bolt" },
            { text: "Trocar o cooler que está parado", icon: "fa-solid fa-fan" },
            { text: "Formatar e reinstalar o Windows", icon: "fa-solid fa-compact-disc" },
            { text: "Trocar o cabo do disco rígido", icon: "fa-solid fa-cable-car" }
        ],
        correct: 1,
        explanation: "A ventoinha está parada (0 RPM) e a temperatura em 95°C. O processador desliga sozinho para não queimar."
    },
    {
        type: "interactive-component",
        rank: "J", suit: "♣",
        question: "🌡️ PASTA ENTRE CPU E COOLER: Antes de prender o cooler no processador, o que precisa ficar no meio?",
        componentView: "Componente: Processador + Dissipador de Alumínio",
        options: [
            { text: "Cola de silicone", icon: "fa-solid fa-bottle-droplet" },
            { text: "Óleo lubrificante", icon: "fa-solid fa-oil-can" },
            { text: "Pasta térmica", icon: "fa-solid fa-flask-vial" },
            { text: "Fita isolante", icon: "fa-solid fa-tape" }
        ],
        correct: 2,
        explanation: "A pasta térmica ajuda o calor a passar do processador para o cooler. Sem ela, a CPU esquenta demais."
    },
    {
        type: "interactive-bios",
        rank: "10", suit: "♠",
        question: "⚙️ DISCO GRANDE (4TB): Qual modo na BIOS/UEFI permite usar discos maiores que 2TB direito?",
        biosView: "Firmware Mode: [ Legacy BIOS ] ➔ Alterar para padrão moderno",
        options: [
            { text: "Modo antigo (Legacy BIOS)", icon: "fa-solid fa-terminal" },
            { text: "Modo moderno UEFI (com GPT)", icon: "fa-solid fa-gears" },
            { text: "Modo básico de 16 bits", icon: "fa-solid fa-microchip" },
            { text: "Modo sem partições", icon: "fa-solid fa-shield-halved" }
        ],
        correct: 1,
        explanation: "O modo UEFI (com partição GPT) aceita discos grandes. O modo antigo Legacy tem limite perto de 2TB."
    },
    {
        type: "interactive-cmd",
        rank: "9", suit: "♥",
        question: "🌐 SEM INTERNET: O cabo está ligado e o LED acende, mas não navega. Qual comando testa se a placa de rede funciona?",
        cmdView: "C:\\Users\\Tecnico> _",
        options: [
            { text: "ping 127.0.0.1 (testa a própria placa)", icon: "fa-solid fa-network-wired" },
            { text: "format C: (apaga o disco)", icon: "fa-solid fa-trash-can" },
            { text: "shutdown (desliga o PC)", icon: "fa-solid fa-power-off" },
            { text: "chkdsk (verifica o disco)", icon: "fa-solid fa-hard-drive" }
        ],
        correct: 0,
        explanation: "127.0.0.1 é o endereço da própria máquina. Se o ping responder, a placa de rede está funcionando."
    },
    {
        type: "interactive-component",
        rank: "8", suit: "♦",
        question: "💨 LIMPEZA COM AR: Ao usar ar comprimido nas ventoinhas, o que você deve fazer?",
        componentView: "Ferramenta: Compressor de Ar + Ventoinhas",
        options: [
            { text: "Deixar girar bem rápido", icon: "fa-solid fa-wind" },
            { text: "Segurar as pás para não girarem", icon: "fa-solid fa-hand" },
            { text: "Molhar com água e sabão", icon: "fa-solid fa-droplet" },
            { text: "Inverter os fios da ventoinha", icon: "fa-solid fa-arrows-rotate" }
        ],
        correct: 1,
        explanation: "Se a ventoinha girar com o ar, ela pode gerar energia de volta e danificar a placa. Segure as pás na limpeza."
    },
    {
        type: "interactive-component",
        rank: "7", suit: "♣",
        question: "🔋 DATA VOLTA NO TEMPO: Sem energia, a data do PC volta para 2010. O que trocar na placa-mãe?",
        componentView: "Placa-Mãe: Soquete de Bateria Moeda (CR2032)",
        options: [
            { text: "Trocar a pilha CMOS (CR2032)", icon: "fa-solid fa-battery-half" },
            { text: "Trocar o processador", icon: "fa-solid fa-microchip" },
            { text: "Trocar os cabos de energia", icon: "fa-solid fa-plug" },
            { text: "Trocar a memória RAM", icon: "fa-solid fa-memory" }
        ],
        correct: 0,
        explanation: "A pilha redonda da placa-mãe (CMOS) guarda a hora e as configurações quando o PC está desligado."
    },
    {
        type: "interactive-component",
        rank: "6", suit: "♠",
        question: "⚡ FIO AMARELO DA FONTE: No cabo da fonte, o fio amarelo deve marcar quantos volts?",
        componentView: "Fonte ATX: Amarelo (+12V) | Vermelho (+5V) | Laranja (+3.3V)",
        options: [
            { text: "+12 volts (CPU e placa de vídeo)", icon: "fa-solid fa-bolt" },
            { text: "+220 volts da tomada", icon: "fa-solid fa-plug-circle-bolt" },
            { text: "+3,3 volts", icon: "fa-solid fa-car-battery" },
            { text: "0 volts (terra)", icon: "fa-solid fa-minus" }
        ],
        correct: 0,
        explanation: "No padrão ATX: amarelo = +12V, vermelho = +5V, laranja = +3,3V."
    },
    {
        type: "interactive-component",
        rank: "5", suit: "♥",
        question: "🛡️ ARQUIVOS BLOQUEADOS: Os arquivos viraram .locked e aparece pedido de pagamento. Que ataque é esse?",
        componentView: "Alerta: 'Seus arquivos foram criptografados!'",
        options: [
            { text: "Adware (anúncios)", icon: "fa-solid fa-rectangle-ad" },
            { text: "Ransomware (sequestro de arquivos)", icon: "fa-solid fa-user-ninja" },
            { text: "Disco com setores ruins", icon: "fa-solid fa-triangle-exclamation" },
            { text: "Erro de atualização do Windows", icon: "fa-solid fa-window-restore" }
        ],
        correct: 1,
        explanation: "Ransomware tranca seus arquivos e pede dinheiro pela chave. O melhor é backup e antivírus em dia."
    },
    // ===== NOVAS PERGUNTAS BASE =====
    {
        type: "interactive-component",
        rank: "4", suit: "♠",
        question: "🔌 PENDRIVE NÃO LIGA: O LED do pendrive não acende e o PC não reconhece. O que testar primeiro?",
        componentView: "Porta USB-A / USB-C + dispositivo externo",
        options: [
            { text: "Testar outra porta USB e outro aparelho", icon: "fa-solid fa-usb" },
            { text: "Formatar o disco principal", icon: "fa-solid fa-eraser" },
            { text: "Trocar a pasta térmica", icon: "fa-solid fa-flask" },
            { text: "Desligar o Secure Boot", icon: "fa-solid fa-shield" }
        ],
        correct: 0,
        explanation: "Porta ou cabo pode estar com defeito. Teste outra porta e outro pendrive antes de trocar peças."
    },
    {
        type: "interactive-beeps",
        rank: "3", suit: "♥",
        question: "🔊 BIP LONGO E CONTÍNUO: Ao ligar, o PC faz um bip longo sem parar. O que isso costuma significar?",
        beepInfo: "🔊 Biiiiiiiiip... (1 Beep longo contínuo)",
        options: [
            { text: "Problema na memória RAM", icon: "fa-solid fa-memory" },
            { text: "Windows estragado", icon: "fa-solid fa-windows" },
            { text: "Só o monitor desconectado", icon: "fa-solid fa-desktop" },
            { text: "Driver de som desatualizado", icon: "fa-solid fa-volume-high" }
        ],
        correct: 0,
        explanation: "Bip longo contínuo muitas vezes aponta falha de memória. Reencaixe ou teste outro pente de RAM."
    },
    {
        type: "interactive-telemetry",
        rank: "2", suit: "♦",
        question: "🔥 PLACA DE VÍDEO QUENTE: Os jogos travam e a placa chega a 95°C, com ventoinha fraca. O que fazer?",
        sensorData: {
            temp: "GPU 95°C (CRÍTICO)",
            rpm: "FAN GPU 20% (BAIXA)",
            volt: "12.0 V (OK)"
        },
        options: [
            { text: "Limpar a placa e aumentar a velocidade da ventoinha", icon: "fa-solid fa-fan" },
            { text: "Trocar só o processador", icon: "fa-solid fa-microchip" },
            { text: "Formatar e instalar Linux", icon: "fa-solid fa-linux" },
            { text: "Tirar toda a memória", icon: "fa-solid fa-memory" }
        ],
        correct: 0,
        explanation: "Poeira e ventoinha lenta fazem a placa esquentar. Limpe e ajuste a ventoinha."
    },
    {
        type: "interactive-cmd",
        rank: "A", suit: "♣",
        question: "🖥️ VER REDE NO WINDOWS: Qual comando mostra o IP e as configurações de rede atuais?",
        cmdView: "C:\\Users\\Tecnico> _",
        options: [
            { text: "ipconfig /all", icon: "fa-solid fa-terminal" },
            { text: "chkdsk C:", icon: "fa-solid fa-hard-drive" },
            { text: "sfc /scannow", icon: "fa-solid fa-shield" },
            { text: "diskpart", icon: "fa-solid fa-database" }
        ],
        correct: 0,
        explanation: "O comando ipconfig /all mostra IP, máscara, gateway e DNS de todas as placas de rede."
    },
    {
        type: "interactive-component",
        rank: "K", suit: "♠",
        question: "🖱️ TECLADO E MOUSE MORTOS: Acabou de montar o PC e USB do painel frontal não funciona. Causa comum?",
        componentView: "Painel frontal + portas USB da placa-mãe",
        options: [
            { text: "Cabos USB do painel frontal soltos ou invertidos", icon: "fa-solid fa-plug" },
            { text: "Pasta térmica em excesso na placa de vídeo", icon: "fa-solid fa-flask" },
            { text: "SSD no slot da memória", icon: "fa-solid fa-memory" },
            { text: "Antena Wi-Fi solta", icon: "fa-solid fa-wifi" }
        ],
        correct: 0,
        explanation: "Os fios USB da frente do gabinete precisam estar no conector certo da placa-mãe. Invertidos, não funcionam."
    },
    {
        type: "interactive-bios",
        rank: "Q", suit: "♥",
        question: "⏱️ MEMÓRIA LENTA: A RAM é de 3200 MHz, mas o PC usa só 2133. O que ligar na BIOS?",
        biosView: "Memory Profile: [ Default 2133 ] ➔ Ativar perfil de overclock",
        options: [
            { text: "Ativar XMP (Intel) ou DOCP (AMD)", icon: "fa-solid fa-gauge-high" },
            { text: "Desligar Secure Boot", icon: "fa-solid fa-shield" },
            { text: "Mudar para modo Legacy", icon: "fa-solid fa-terminal" },
            { text: "Zerar a BIOS e deixar padrão", icon: "fa-solid fa-battery-empty" }
        ],
        correct: 0,
        explanation: "XMP/DOCP faz a memória rodar na velocidade anunciada na caixa, em vez da velocidade baixa padrão."
    }
];

// ========== PACOTES EXTRA (compráveis na loja) ==========
const packQuestions = {
    storage: [
        {
            type: "interactive-component",
            rank: "4", suit: "♦",
            pack: "storage",
            question: "💾 PC LIGA SEM SISTEMA: O cabo de dados do SSD pode estar frouxo. Qual deve estar bem encaixado?",
            componentView: "SSD / HD ↔ Placa-Mãe: cabo de dados",
            options: [
                { text: "Cabo SATA de dados bem encaixado", icon: "fa-solid fa-hard-drive" },
                { text: "Só o cabo de energia da fonte", icon: "fa-solid fa-plug" },
                { text: "Cabo do monitor", icon: "fa-solid fa-desktop" },
                { text: "Antena Wi-Fi", icon: "fa-solid fa-wifi" }
            ],
            correct: 0,
            explanation: "O cabo SATA leva os dados do disco até a placa-mãe. Frouxo, o PC não acha o sistema."
        },
        {
            type: "interactive-component",
            rank: "3", suit: "♣",
            pack: "storage",
            question: "📀 TROCAR HD POR SSD: Qual tipo de SSD é o mais rápido hoje em dia?",
            componentView: "Comparativo: SATA III vs NVMe M.2",
            options: [
                { text: "SSD NVMe no slot M.2", icon: "fa-solid fa-bolt" },
                { text: "HD antigo por USB 2.0", icon: "fa-solid fa-hard-drive" },
                { text: "Disquete", icon: "fa-solid fa-save" },
                { text: "CD-ROM antigo", icon: "fa-solid fa-compact-disc" }
            ],
            correct: 0,
            explanation: "SSD NVMe (slot M.2) é bem mais rápido que SSD ou HD ligados por cabo SATA."
        },
        {
            type: "interactive-component",
            rank: "2", suit: "♥",
            pack: "storage",
            question: "🗄️ AVISO DO DISCO: O programa do disco mostra muitos setores realocados. O que fazer?",
            componentView: "SMART: Reallocated Sector Count = 1200 (CRÍTICO)",
            options: [
                { text: "Disco com defeito — fazer backup e trocar", icon: "fa-solid fa-triangle-exclamation" },
                { text: "Só poeira no cooler", icon: "fa-solid fa-fan" },
                { text: "Driver de vídeo desatualizado", icon: "fa-solid fa-display" },
                { text: "Cabo de rede solto", icon: "fa-solid fa-ethernet" }
            ],
            correct: 0,
            explanation: "Setores ruins indicam disco falhando. Faça backup e troque o disco antes de perder arquivos."
        }
    ],
    network: [
        {
            type: "interactive-cmd",
            rank: "2", suit: "♠",
            pack: "network",
            question: "🌐 SITES NÃO ABREM: O ping em 8.8.8.8 funciona, mas digitar o nome do site falha. Qual o problema?",
            cmdView: "C:\\> ping 8.8.8.8  →  OK\nC:\\> ping google.com  →  falha",
            options: [
                { text: "Problema de DNS (nome dos sites)", icon: "fa-solid fa-server" },
                { text: "Fonte fraca", icon: "fa-solid fa-bolt" },
                { text: "Pasta térmica velha", icon: "fa-solid fa-flask" },
                { text: "Pilha da placa-mãe fraca", icon: "fa-solid fa-battery-empty" }
            ],
            correct: 0,
            explanation: "Se o número (IP) funciona e o nome do site não, o DNS está com problema. Trocar o DNS costuma resolver."
        },
        {
            type: "interactive-component",
            rank: "A", suit: "♥",
            pack: "network",
            question: "📡 WI-FI FRACO OU ZERADO: No notebook, as antenas da placa Wi-Fi estão soltas. O que fazer?",
            componentView: "Placa Mini PCIe / M.2 Wi-Fi + cabos de antena",
            options: [
                { text: "Conectar as antenas na placa Wi-Fi", icon: "fa-solid fa-wifi" },
                { text: "Formatar o disco", icon: "fa-solid fa-eraser" },
                { text: "Trocar pasta térmica da placa de vídeo", icon: "fa-solid fa-fan" },
                { text: "Inverter a pilha da placa-mãe", icon: "fa-solid fa-battery-half" }
            ],
            correct: 0,
            explanation: "Sem as antenas ligadas na placa Wi-Fi, o sinal fica péssimo ou some."
        },
        {
            type: "interactive-cmd",
            rank: "K", suit: "♦",
            pack: "network",
            question: "🔄 IP REPETIDO NA REDE: Dois PCs com o mesmo IP. Qual comando pede um IP novo no Windows?",
            cmdView: "C:\\> ipconfig /release && ipconfig /renew",
            options: [
                { text: "ipconfig /release e depois /renew", icon: "fa-solid fa-arrows-rotate" },
                { text: "format C:", icon: "fa-solid fa-eraser" },
                { text: "shutdown (reiniciar)", icon: "fa-solid fa-power-off" },
                { text: "netsh winsock reset", icon: "fa-solid fa-network-wired" }
            ],
            correct: 0,
            explanation: "release solta o IP atual e renew pede outro ao roteador — útil em conflito de endereço."
        }
    ],
    power: [
        {
            type: "interactive-component",
            rank: "K", suit: "♦",
            pack: "power",
            question: "⚡ PC TOTALMENTE MORTO: Apertar o botão não acende LED nem cooler. Qual teste clássico da fonte?",
            componentView: "Fonte ATX: teste de jump no conector 24 pinos",
            options: [
                { text: "Teste de jump na fonte (fora do gabinete)", icon: "fa-solid fa-plug" },
                { text: "Reinstalar o Windows", icon: "fa-solid fa-windows" },
                { text: "Trocar o mouse", icon: "fa-solid fa-computer-mouse" },
                { text: "Atualizar driver de som", icon: "fa-solid fa-volume-high" }
            ],
            correct: 0,
            explanation: "O teste de jump verifica se a fonte liga sozinha. Se não ligar, o problema é fonte ou tomada."
        },
        {
            type: "interactive-component",
            rank: "Q", suit: "♣",
            pack: "power",
            question: "🔋 PLACA DE VÍDEO SEM IMAGEM: A placa está no slot, mas a tela não acende. O que costuma faltar?",
            componentView: "GPU: slot PCIe + conectores extras de energia",
            options: [
                { text: "Cabos extras de energia da fonte (6/8 pinos)", icon: "fa-solid fa-plug-circle-bolt" },
                { text: "Pasta térmica no slot de memória", icon: "fa-solid fa-flask" },
                { text: "Cabo SATA no cooler", icon: "fa-solid fa-fan" },
                { text: "Antena no slot M.2", icon: "fa-solid fa-wifi" }
            ],
            correct: 0,
            explanation: "Placas fortes precisam de cabos extras da fonte. Sem energia extra, não há imagem."
        },
        {
            type: "interactive-component",
            rank: "J", suit: "♠",
            pack: "power",
            question: "📉 PC REINICIA EM JOGO: A linha de 12V cai para 10,5V sob carga. Causa mais provável?",
            componentView: "Fonte ATX sob stress: 12V = 10.5V",
            options: [
                { text: "Fonte subdimensionada ou com falha", icon: "fa-solid fa-bolt" },
                { text: "Driver de teclado desatualizado", icon: "fa-solid fa-keyboard" },
                { text: "Cabo HDMI com defeito apenas", icon: "fa-solid fa-display" },
                { text: "Pasta térmica demais na CPU", icon: "fa-solid fa-flask" }
            ],
            correct: 0,
            explanation: "Queda acentuada na linha de 12V sob carga indica fonte fraca, envelhecida ou de má qualidade. Trocar por uma com potência real adequada."
        }
    ],
    security: [
        {
            type: "interactive-component",
            rank: "J", suit: "♠",
            pack: "security",
            question: "🛡️ E-MAIL SUSPEITO DO BANCO: Pede senha com um link estranho. O que fazer?",
            componentView: "Caixa de entrada: e-mail suspeito de banco",
            options: [
                { text: "Não clicar; abrir o banco digitando o site oficial", icon: "fa-solid fa-shield-halved" },
                { text: "Enviar a senha para confirmar", icon: "fa-solid fa-key" },
                { text: "Baixar o arquivo .exe", icon: "fa-solid fa-file-arrow-down" },
                { text: "Desligar o antivírus", icon: "fa-solid fa-shield-virus" }
            ],
            correct: 0,
            explanation: "É golpe (phishing). Não clique no link — digite o endereço do banco você mesmo."
        },
        {
            type: "interactive-component",
            rank: "10", suit: "♥",
            pack: "security",
            question: "🔐 PROTEÇÃO EXTRA DA CONTA: Além da senha, o que recomendar para o e-mail?",
            componentView: "Conta online: autenticação em duas etapas",
            options: [
                { text: "Ativar verificação em duas etapas (2FA)", icon: "fa-solid fa-mobile-screen" },
                { text: "Usar a mesma senha em tudo", icon: "fa-solid fa-copy" },
                { text: "Anotar a senha no monitor", icon: "fa-solid fa-note-sticky" },
                { text: "Desligar o firewall", icon: "fa-solid fa-fire" }
            ],
            correct: 0,
            explanation: "A verificação em duas etapas pede um código no celular. Mesmo com a senha, o invasor não entra fácil."
        },
        {
            type: "interactive-component",
            rank: "9", suit: "♣",
            pack: "security",
            question: "🦠 VÍRUS QUE VOLTA: O antivírus remove, mas após reiniciar o vírus volta. Onde ele se esconde?",
            componentView: "Pastas de inicialização + Registro do Windows",
            options: [
                { text: "Pastas de inicialização e chaves de registro", icon: "fa-solid fa-folder-open" },
                { text: "Apenas no cooler da CPU", icon: "fa-solid fa-fan" },
                { text: "No cabo SATA do SSD", icon: "fa-solid fa-hard-drive" },
                { text: "Na bateria CMOS", icon: "fa-solid fa-battery-half" }
            ],
            correct: 0,
            explanation: "Malware persistente cria entradas em Run/RunOnce e pastas Startup. Limpeza offline ou modo seguro + ferramentas dedicadas são necessárias."
        }
    ],
    cooling: [
        {
            type: "interactive-component",
            rank: "8", suit: "♠",
            pack: "cooling",
            question: "❄️ WATER COOLER: O PC liga, esquenta rápido e o radiador fica frio. O que checar primeiro?",
            componentView: "AIO: bomba + radiador + tubos",
            options: [
                { text: "Bomba do water cooler (conectada e funcionando)", icon: "fa-solid fa-droplet" },
                { text: "Apenas o cabo do monitor", icon: "fa-solid fa-desktop" },
                { text: "Driver de áudio", icon: "fa-solid fa-volume-high" },
                { text: "Antena Wi-Fi", icon: "fa-solid fa-wifi" }
            ],
            correct: 0,
            explanation: "Se o radiador fica frio e a CPU esquenta, a bomba pode estar desligada, com ar ou queimada. Verificar header AIO_PUMP/CPU_FAN."
        },
        {
            type: "interactive-telemetry",
            rank: "7", suit: "♥",
            pack: "cooling",
            question: "🌀 CPU QUENTE PARADA: Em repouso a CPU fica a 75°C com fans em 30%. O que ajustar?",
            sensorData: {
                temp: "CPU 75°C (IDLE ALTO)",
                rpm: "FAN 30% (BAIXA)",
                volt: "12.0 V (OK)"
            },
            options: [
                { text: "Ajustar curva de ventilação mais agressiva no idle", icon: "fa-solid fa-fan" },
                { text: "Trocar a placa-mãe inteira", icon: "fa-solid fa-server" },
                { text: "Desligar o Secure Boot", icon: "fa-solid fa-shield" },
                { text: "Remover um pente de RAM", icon: "fa-solid fa-memory" }
            ],
            correct: 0,
            explanation: "Curvas muito silenciosas deixam o processador quente mesmo sem carga. Uma curva um pouco mais agressiva no idle estabiliza a temperatura."
        },
        {
            type: "interactive-component",
            rank: "6", suit: "♦",
            pack: "cooling",
            question: "🧴 CPU A 90°C: Cooler bom e limpo, mas a CPU chega a 90°C. Qual manutenção clássica?",
            componentView: "Dissipador + superfície da CPU",
            options: [
                { text: "Remover pasta antiga e reaplicar pasta térmica nova", icon: "fa-solid fa-flask-vial" },
                { text: "Trocar só o HD por SSD", icon: "fa-solid fa-hard-drive" },
                { text: "Atualizar BIOS sem necessidade", icon: "fa-solid fa-gears" },
                { text: "Desconectar o cooler e testar", icon: "fa-solid fa-power-off" }
            ],
            correct: 0,
            explanation: "Pasta térmica resseca com o tempo e perde eficiência. Limpeza completa e nova aplicação costumam baixar vários graus."
        }
    ],
    peripherals: [
        {
            type: "interactive-component",
            rank: "5", suit: "♣",
            pack: "peripherals",
            question: "🖨️ IMPRESSORA OFFLINE: Está ligada, mas o Windows diz Offline. Qual passo inicial?",
            componentView: "Impressora de rede + fila de impressão",
            options: [
                { text: "Reiniciar spooler e verificar IP/porta da impressora", icon: "fa-solid fa-print" },
                { text: "Trocar a pasta térmica do PC", icon: "fa-solid fa-flask" },
                { text: "Formatar o SSD do cliente", icon: "fa-solid fa-eraser" },
                { text: "Desligar o antivírus permanentemente", icon: "fa-solid fa-shield-virus" }
            ],
            correct: 0,
            explanation: "Spooler travado e IP mudado são causas comuns de impressora 'offline'. Reiniciar o serviço e conferir o endereço resolve a maioria."
        },
        {
            type: "interactive-component",
            rank: "4", suit: "♠",
            pack: "peripherals",
            question: "🎧 FONE DA FRENTE MUDO: O fone na frente não funciona, mas atrás sim. Onde está o problema?",
            componentView: "Painel frontal de áudio (HD Audio) da placa-mãe",
            options: [
                { text: "Cabo HD Audio do painel frontal desconectado ou invertido", icon: "fa-solid fa-headphones" },
                { text: "Fonte de 300W insuficiente", icon: "fa-solid fa-bolt" },
                { text: "SSD no slot M.2 errado", icon: "fa-solid fa-hard-drive" },
                { text: "Bateria CMOS fraca", icon: "fa-solid fa-battery-quarter" }
            ],
            correct: 0,
            explanation: "O header HD_AUDIO do painel frontal precisa estar conectado corretamente. Sem ele, só as saídas traseiras da placa-mãe funcionam."
        },
        {
            type: "interactive-component",
            rank: "3", suit: "♥",
            pack: "peripherals",
            question: "🖥️ MONITOR SEM SINAL: A placa tem DisplayPort e o monitor só HDMI. O que usar?",
            componentView: "GPU DP → Monitor HDMI",
            options: [
                { text: "Adaptador/cabo DisplayPort para HDMI ativo se necessário", icon: "fa-solid fa-display" },
                { text: "Trocar a RAM por outra", icon: "fa-solid fa-memory" },
                { text: "Formatar o Windows", icon: "fa-solid fa-windows" },
                { text: "Desligar o cooler da CPU", icon: "fa-solid fa-fan" }
            ],
            correct: 0,
            explanation: "Nem todo cabo DP-HDMI é passivo. Em muitos casos um adaptador ativo é necessário para converter o sinal corretamente."
        }
    ]
};

const shopCatalog = [
    {
        id: "storage",
        type: "pack",
        name: "Pacote Disco (HD/SSD)",
        icon: "fa-solid fa-hard-drive",
        desc: "3 perguntas novas sobre HD, SSD e cabos de disco.",
        price: 90,
        hands: 3
    },
    {
        id: "network",
        type: "pack",
        name: "Pacote Internet e Rede",
        icon: "fa-solid fa-network-wired",
        desc: "3 perguntas novas sobre Wi-Fi, internet e IP.",
        price: 100,
        hands: 3
    },
    {
        id: "power",
        type: "pack",
        name: "Pacote Fonte e Energia",
        icon: "fa-solid fa-bolt",
        desc: "3 perguntas novas sobre fonte de energia e placa de vídeo.",
        price: 95,
        hands: 3
    },
    {
        id: "security",
        type: "pack",
        name: "Pacote Segurança",
        icon: "fa-solid fa-shield-halved",
        desc: "3 perguntas novas sobre golpes, senha e vírus.",
        price: 85,
        hands: 3
    },
    {
        id: "cooling",
        type: "pack",
        name: "Pacote Resfriamento",
        icon: "fa-solid fa-fan",
        desc: "3 perguntas novas sobre cooler, ventoinha e pasta térmica.",
        price: 110,
        hands: 3
    },
    {
        id: "peripherals",
        type: "pack",
        name: "Pacote Periféricos",
        icon: "fa-solid fa-keyboard",
        desc: "3 perguntas novas sobre impressora, fone e monitor.",
        price: 80,
        hands: 3
    },
    {
        id: "upgrade_mult",
        type: "upgrade",
        name: "Bônus Inicial +1",
        icon: "fa-solid fa-xmark",
        desc: "Começa cada partida com bônus x2 (ganha mais pontos).",
        price: 150
    },
    {
        id: "upgrade_bonus",
        type: "upgrade",
        name: "Pontos extras por acerto",
        icon: "fa-solid fa-coins",
        desc: "+5 pontos a mais toda vez que acertar.",
        price: 120
    },
    {
        id: "upgrade_shop_discount",
        type: "upgrade",
        name: "Desconto na Loja",
        icon: "fa-solid fa-tags",
        desc: "Itens da loja durante a partida custam 20% menos.",
        price: 130
    },
    {
        id: "upgrade_extra_hand",
        type: "upgrade",
        name: "Pergunta Extra",
        icon: "fa-solid fa-plus",
        desc: "Cada partida tem 11 perguntas em vez de 10.",
        price: 180
    }
];

// Itens só da loja no meio da partida (temporários da run)
const runShopCatalog = [
    {
        id: "run_mult_boost",
        name: "Aumentar bônus agora",
        icon: "fa-solid fa-fire",
        desc: "+1 no bônus agora (máximo x5).",
        price: 40
    },
    {
        id: "run_chip_boost",
        name: "Pacote de pontos",
        icon: "fa-solid fa-coins",
        desc: "+25 pontos na hora, nesta partida.",
        price: 35
    },
    {
        id: "run_hint",
        name: "Dica (mostra a certa)",
        icon: "fa-solid fa-lightbulb",
        desc: "Destaca a resposta correta na próxima pergunta.",
        price: 25
    },
    {
        id: "run_reroll",
        name: "Trocar pergunta",
        icon: "fa-solid fa-shuffle",
        desc: "Troca esta pergunta por outra diferente.",
        price: 30
    },
    {
        id: "run_insurance",
        name: "Seguro do bônus",
        icon: "fa-solid fa-shield",
        desc: "Se errar a próxima, o bônus não zera.",
        price: 45
    }
];

// Persistência
const SAVE_KEY = "balatro_tech_save";

function loadSave() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return { bank: 0, owned: [], upgrades: [], handsTarget: 10 };
        const data = JSON.parse(raw);
        return {
            bank: data.bank || 0,
            owned: data.owned || [],
            upgrades: data.upgrades || [],
            handsTarget: Math.max(10, data.handsTarget || 10)
        };
    } catch {
        return { bank: 0, owned: [], upgrades: [], handsTarget: 10 };
    }
}

function writeSave() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
        bank: bank,
        owned: ownedPacks,
        upgrades: ownedUpgrades,
        handsTarget: handsTarget
    }));
}

let saveData = loadSave();
let bank = saveData.bank;
let ownedPacks = saveData.owned;
let ownedUpgrades = saveData.upgrades;
let handsTarget = saveData.handsTarget;

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function cloneQuestion(q, pack) {
    return {
        ...q,
        pack: pack || q.pack || "base",
        options: q.options.map(o => ({ ...o }))
    };
}

function buildPool() {
    let deck = baseQuestions.map(q => cloneQuestion(q, "base"));
    ownedPacks.forEach(pid => {
        if (packQuestions[pid]) {
            deck = deck.concat(packQuestions[pid].map(q => cloneQuestion(q, pid)));
        }
    });
    return deck;
}

// Perguntas liberadas pelos pacotes comprados na loja
function getOwnedPackQuestions() {
    const list = [];
    ownedPacks.forEach(pid => {
        if (packQuestions[pid]) {
            packQuestions[pid].forEach(q => list.push(cloneQuestion(q, pid)));
        }
    });
    return list;
}

function getHandsPerRun() {
    return ownedUpgrades.includes('upgrade_extra_hand') ? 11 : 10;
}

function buildDeck() {
    const hands = getHandsPerRun();
    const base = shuffleArray(baseQuestions.map(q => cloneQuestion(q, "base")));
    const fromPacks = shuffleArray(getOwnedPackQuestions());

    // 1) Garante as perguntas dos pacotes comprados (assuntos da loja)
    const run = [];
    const usedTexts = new Set();

    fromPacks.forEach(q => {
        if (run.length >= hands) return;
        if (usedTexts.has(q.question)) return;
        run.push(q);
        usedTexts.add(q.question);
    });

    // 2) Completa com perguntas base até atingir 10 (ou 11)
    for (const q of base) {
        if (run.length >= hands) break;
        if (usedTexts.has(q.question)) continue;
        run.push(q);
        usedTexts.add(q.question);
    }

    // 3) Se ainda faltar (poucas perguntas), repete o pool embaralhado
    const pool = shuffleArray(buildPool());
    let guard = 0;
    while (run.length < hands && pool.length > 0 && guard < 100) {
        const q = cloneQuestion(pool[guard % pool.length], pool[guard % pool.length].pack);
        run.push(q);
        guard++;
    }

    // Embaralha a ordem final (mantém o conteúdo dos pacotes)
    return shuffleArray(run);
}

let questions = buildDeck();

// Estado
let currentQuestionIndex = 0;
let score = 0;
let mult = 1;
let userAnswers = [];
let selectedPiece = null;
let runMoneyEarned = 0;
let runHintActive = false;
let runInsuranceActive = false;
let midShopOpen = false;
let shopReturnScreen = 'start'; // 'start' | 'result' | 'quiz'

// Áudio
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

let lastCardSoundTime = 0;

function playCardSound() {
    try {
        const now = performance.now();
        if (now - lastCardSoundTime < 180) return;
        lastCardSoundTime = now;

        initAudio();
        const t = audioCtx.currentTime;
        const sr = audioCtx.sampleRate;

        const dur = 0.14;
        const bufferSize = Math.floor(sr * dur);
        const buffer = audioCtx.createBuffer(1, bufferSize, sr);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const p = i / bufferSize;
            const env = p < 0.08 ? (p / 0.08) : Math.pow(1 - (p - 0.08) / 0.92, 1.8);
            const grain = (Math.random() * 2 - 1) * 0.7 + Math.sin(i * 0.15) * 0.15 * Math.random();
            data[i] = grain * env;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const highpass = audioCtx.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.value = 600;

        const bandpass = audioCtx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 2200;
        bandpass.Q.value = 0.6;

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.35, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        noise.connect(highpass);
        highpass.connect(bandpass);
        bandpass.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(t);
        noise.stop(t + dur + 0.02);

        const snapDur = 0.035;
        const snapBuf = audioCtx.createBuffer(1, Math.floor(sr * snapDur), sr);
        const snapData = snapBuf.getChannelData(0);
        for (let i = 0; i < snapData.length; i++) {
            const p = i / snapData.length;
            snapData[i] = (Math.random() * 2 - 1) * Math.pow(1 - p, 4);
        }
        const snap = audioCtx.createBufferSource();
        snap.buffer = snapBuf;

        const snapFilter = audioCtx.createBiquadFilter();
        snapFilter.type = 'highpass';
        snapFilter.frequency.value = 3000;

        const snapGain = audioCtx.createGain();
        snapGain.gain.setValueAtTime(0.28, t);
        snapGain.gain.exponentialRampToValueAtTime(0.001, t + snapDur);

        snap.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(audioCtx.destination);
        snap.start(t);
        snap.stop(t + snapDur + 0.01);

        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.05);

        const oscGain = audioCtx.createGain();
        oscGain.gain.setValueAtTime(0.08, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(oscGain);
        oscGain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.07);
    } catch (e) {}
}

// DOM
const screenStart = document.getElementById('screen-start');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const screenShop = document.getElementById('screen-shop');
const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const btnShop = document.getElementById('btn-shop');
const btnStartShop = document.getElementById('btn-start-shop');
const btnShopClose = document.getElementById('btn-shop-close');
const btnShopMenu = document.getElementById('btn-shop-menu');
const shopItemsEl = document.getElementById('shop-items');
const shopMoneyEl = document.getElementById('shop-money');
const startBankEl = document.getElementById('start-bank');

const questionCounter = document.getElementById('question-counter');
const questionTotal = document.getElementById('question-total');
const scoreDisplay = document.getElementById('score-display');
const multDisplay = document.getElementById('mult-display');
const handsLeft = document.getElementById('hands-left');
const correctCountEl = document.getElementById('correct-count');
const moneyDisplay = document.getElementById('money-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const interactiveWorkspace = document.getElementById('interactive-workspace');

const explanationBox = document.getElementById('explanation-box');
const explanationTitle = document.getElementById('explanation-title');
const explanationText = document.getElementById('explanation-text');

const cardRank = document.getElementById('card-rank');
const cardSuit = document.getElementById('card-suit');
const cardRankB = document.getElementById('card-rank-b');
const cardSuitB = document.getElementById('card-suit-b');

// Events
btnStart.addEventListener('click', startGame);
btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', restartGame);
if (btnShop) btnShop.addEventListener('click', () => openShop('result'));
if (btnStartShop) btnStartShop.addEventListener('click', () => openShop('start'));
if (btnShopClose) btnShopClose.addEventListener('click', closeShop);
if (btnShopMenu) btnShopMenu.addEventListener('click', goToMenuFromShop);

const btnHomeResult = document.getElementById('btn-home-result');
if (btnHomeResult) btnHomeResult.addEventListener('click', goHome);

const btnMidShop = document.getElementById('btn-mid-shop');
if (btnMidShop) btnMidShop.addEventListener('click', openMidShop);

const btnHomeQuiz = document.getElementById('btn-home-quiz');
if (btnHomeQuiz) btnHomeQuiz.addEventListener('click', goHomeFromQuiz);

refreshStartBank();

function refreshStartBank() {
    if (startBankEl) {
        const packCount = ownedPacks.reduce((n, id) => n + (packQuestions[id] ? packQuestions[id].length : 0), 0);
        const unique = baseQuestions.length + packCount;
        const perRun = getHandsPerRun();
        const packLabel = ownedPacks.length
            ? ` · ${ownedPacks.length} pacote(s) ativos (+${packCount} perguntas)`
            : '';
        startBankEl.textContent = `$${bank} guardados · ${perRun} perguntas/partida · ${unique} no baralho${packLabel}`;
    }
}

function goHome() {
    screenResult.classList.add('d-none');
    screenShop.classList.add('d-none');
    screenQuiz.classList.add('d-none');
    screenStart.classList.remove('d-none');
    refreshStartBank();
}

function goHomeFromQuiz() {
    if (!confirm('Sair da partida e voltar ao início? O progresso desta run será perdido (fichas da run não vão para o banco).')) return;
    goHome();
}

function startGame() {
    questions = buildDeck();
    const packQs = questions.filter(q => q.pack && q.pack !== 'base');
    if (packQs.length) {
        console.log('%c📦 Perguntas dos pacotes nesta partida:', 'color:#fbbf24;font-weight:bold',
            packQs.map(q => `[${q.pack}] ${q.question.substring(0, 50)}...`));
    } else {
        console.log('%c📦 Nenhum pacote comprado — só perguntas base.', 'color:#94a3b8');
    }
    currentQuestionIndex = 0;
    score = 0;
    mult = ownedUpgrades.includes('upgrade_mult') ? 2 : 1;
    userAnswers = [];
    runMoneyEarned = 0;
    runHintActive = false;
    runInsuranceActive = false;
    midShopOpen = false;

    initAudio();

    screenStart.classList.add('d-none');
    screenResult.classList.add('d-none');
    if (screenShop) screenShop.classList.add('d-none');
    screenQuiz.classList.remove('d-none');

    updateHUD();
    loadQuestion();
}

function updateHUD() {
    scoreDisplay.textContent = score;
    multDisplay.textContent = mult;
    // Contador da partida atual: 1/10, 2/10 … (sempre aleatório o conteúdo)
    const totalNow = questions.length || getHandsPerRun();
    questionCounter.textContent = currentQuestionIndex + 1;
    if (questionTotal) questionTotal.textContent = totalNow;
    handsLeft.textContent = Math.max(0, totalNow - currentQuestionIndex);
    const corrects = userAnswers.filter(a => a.isCorrect).length;
    correctCountEl.textContent = corrects;
    moneyDisplay.textContent = '$' + (bank + score);
}

function loadQuestion() {
    resetState();

    const q = questions[currentQuestionIndex];

    const originalCorrect = q.options[q.correct];
    q.options = shuffleArray(q.options);
    q.correct = q.options.findIndex(opt => opt === originalCorrect);

    cardRank.textContent = q.rank;
    cardSuit.textContent = q.suit;
    cardRankB.textContent = q.rank;
    cardSuitB.textContent = q.suit;

    const isRed = (q.suit === '♥' || q.suit === '♦');
    cardSuit.style.color = isRed ? '#c41e3a' : '#1a1a1a';
    cardSuitB.style.color = isRed ? '#c41e3a' : '#1a1a1a';

    questionText.textContent = q.question;
    updateHUD();

    if (q.type === "interactive-mb-view") {
        renderMotherboardView();
    } else if (q.type === "interactive-beeps") {
        renderBeepWorkspace(q);
    } else if (q.type === "interactive-telemetry") {
        renderTelemetryWorkspace(q);
    } else if (q.type === "interactive-bios") {
        renderBiosWorkspace(q);
    } else if (q.type === "interactive-cmd") {
        renderCmdWorkspace(q);
    } else {
        renderComponentWorkspace(q);
    }

    q.options.forEach((option, index) => {
        const cardSuitLocal = suits[index % 4];
        const rankLocal = ranks[index];
        const colorClass = suitColors[cardSuitLocal];

        const card = document.createElement('button');
        card.className = 'play-card card-deal';
        card.style.animationDelay = `${index * 0.08}s`;
        card.innerHTML = `
            <div class="card-corner tl">
                <div>${rankLocal}</div>
                <div class="${colorClass}">${cardSuitLocal}</div>
            </div>
            <div class="card-icon"><i class="${option.icon}"></i></div>
            <div class="card-text">${option.text}</div>
            <div class="card-corner br">
                <div>${rankLocal}</div>
                <div class="${colorClass}">${cardSuitLocal}</div>
            </div>
        `;
        card.addEventListener('mouseenter', () => {
            if (!card.disabled) playCardSound();
        });
        card.addEventListener('click', () => {
            playCardSound();
            selectAnswer(index);
        });
        optionsContainer.appendChild(card);
    });

    // Dica ativa: destaca a carta correta
    if (runHintActive) {
        const cards = optionsContainer.children;
        if (cards[q.correct]) {
            cards[q.correct].classList.add('hint-glow');
        }
        runHintActive = false;
    }
}

function renderMotherboardView() {
    interactiveWorkspace.innerHTML = `
        <div class="mb-diagram">
            <div class="mb-board">
                <div class="mb-label-top"><i class="fa-solid fa-microchip me-1"></i> PLACA-MÃE</div>
                <div class="mb-layout">
                    <div class="mb-socket">
                        <i class="fa-solid fa-server"></i>
                        <span>Soquete CPU</span>
                    </div>
                    <div class="mb-dimm-group">
                        <div class="mb-dimm empty"><span>DIMM 1</span></div>
                        <div class="mb-dimm empty"><span>DIMM 2</span></div>
                        <div class="mb-dimm highlight"><i class="fa-solid fa-memory"></i><span>DIMM</span></div>
                        <div class="mb-dimm empty"><span>DIMM 4</span></div>
                    </div>
                    <div class="mb-pcie">
                        <i class="fa-solid fa-network-wired"></i>
                        <span>PCI-Express x16</span>
                    </div>
                </div>
                <div class="mb-hint">Slots de memória ficam ao lado do soquete da CPU</div>
            </div>
            <div class="mb-part">
                <div class="mb-part-icon"><i class="fa-solid fa-memory"></i></div>
                <div class="mb-part-name">Pente de RAM</div>
                <div class="mb-part-sub">DDR4 / DDR5</div>
            </div>
        </div>
    `;
}

function renderBeepWorkspace(q) {
    interactiveWorkspace.innerHTML = `
        <div class="monitor-box text-center">
            <i class="fa-solid fa-volume-high display-5 text-warning mb-2"></i>
            <div class="fs-6 text-warning fw-bold">${q.beepInfo}</div>
            <small class="text-muted">Speaker da Placa-Mãe — POST</small>
        </div>
    `;
}

function renderTelemetryWorkspace(q) {
    interactiveWorkspace.innerHTML = `
        <div class="monitor-box">
            <div class="d-flex justify-content-between border-bottom border-secondary pb-1 mb-2 small">
                <span><i class="fa-solid fa-desktop me-1"></i> PAINEL DE SENSORES</span>
                <span class="text-danger fw-bold">● CRÍTICO</span>
            </div>
            <div class="small">> TEMP CPU: <span class="text-danger fw-bold">${q.sensorData.temp}</span></div>
            <div class="small">> COOLER FAN: <span class="text-warning fw-bold">${q.sensorData.rpm}</span></div>
            <div class="small">> LINHA ATX: <span class="text-success">${q.sensorData.volt}</span></div>
        </div>
    `;
}

function renderBiosWorkspace(q) {
    interactiveWorkspace.innerHTML = `
        <div class="monitor-box" style="background:#0000aa; color:#ffffff;">
            <div class="fw-bold border-bottom pb-1 mb-2 small"><i class="fa-solid fa-gears me-1"></i> UEFI / BIOS SETUP</div>
            <div class="small">${q.biosView}</div>
        </div>
    `;
}

function renderCmdWorkspace(q) {
    interactiveWorkspace.innerHTML = `
        <div class="monitor-box" style="background:#0c1021; color:#38bdf8;">
            <div class="fw-bold border-bottom border-secondary pb-1 mb-2 small"><i class="fa-solid fa-terminal me-1"></i> PROMPT DE COMANDO</div>
            <div class="font-monospace small" style="white-space:pre-line">${q.cmdView}</div>
        </div>
    `;
}

function renderComponentWorkspace(q) {
    interactiveWorkspace.innerHTML = `
        <div class="p-2 bg-white rounded border text-center">
            <i class="fa-solid fa-laptop-medical fs-2 text-primary mb-1"></i>
            <div class="fw-bold text-dark small">${q.componentView}</div>
        </div>
    `;
}

function resetState() {
    selectedPiece = null;
    explanationBox.classList.add('d-none');
    explanationBox.className = 'feedback-box d-none';
    btnNext.classList.add('d-none');
    optionsContainer.innerHTML = '';
}

function selectAnswer(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.children;
    const isCorrect = selectedIndex === q.correct;

    if (optionButtons[0] && optionButtons[0].disabled) return;

    userAnswers.push({
        question: q.question,
        selected: selectedIndex,
        correct: q.correct,
        isCorrect: isCorrect,
        explanation: q.explanation
    });

    console.log(
        `%cMão ${currentQuestionIndex + 1}/${questions.length} — ${isCorrect ? "ACERTO" : "ERRO"}`,
        isCorrect ? "color:#22c55e;font-weight:bold" : "color:#ef4444;font-weight:bold",
        "\nPergunta:", q.question,
        "\nSua carta:", q.options[selectedIndex].text,
        isCorrect ? "" : "\nCerta era:", q.options[q.correct].text
    );

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
        if (i !== selectedIndex && i !== q.correct) {
            optionButtons[i].classList.add('dimmed');
        }
    }

    let gained = 0;
    const bonusPerHit = ownedUpgrades.includes('upgrade_bonus') ? 5 : 0;
    if (isCorrect) {
        gained = 10 * mult + bonusPerHit;
        score += gained;
        mult = Math.min(mult + 1, 5);
        optionButtons[selectedIndex].classList.add('correct');
    } else {
        if (runInsuranceActive) {
            runInsuranceActive = false;
            // mult preserved
        } else {
            mult = ownedUpgrades.includes('upgrade_mult') ? 2 : 1;
        }
        optionButtons[selectedIndex].classList.add('wrong');
        optionButtons[q.correct].classList.add('correct');
        optionButtons[q.correct].classList.remove('dimmed');
    }

    updateHUD();

    explanationBox.classList.remove('d-none');
    if (isCorrect) {
        explanationBox.classList.add('alert-success');
        explanationTitle.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i>ACERTOU! +${gained} pontos`;
    } else {
        explanationBox.classList.add('alert-danger');
        explanationTitle.innerHTML = `<i class="fa-solid fa-circle-xmark me-2"></i>ERROU — veja a certa`;
    }
    explanationText.textContent = q.explanation;

    btnNext.classList.remove('d-none');
    if (currentQuestionIndex === questions.length - 1) {
        btnNext.innerHTML = 'VER RESULTADO <i class="fa-solid fa-trophy ms-2"></i>';
    } else {
        btnNext.innerHTML = 'PRÓXIMA <i class="fa-solid fa-arrow-right ms-2"></i>';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    screenQuiz.classList.add('d-none');
    screenResult.classList.remove('d-none');

    bank += score;
    runMoneyEarned = score;
    handsTarget += 10;
    writeSave();
    refreshStartBank();
    recordRunToHistory();

    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const finalScoreDisplay = document.getElementById('final-score');
    const finalAccuracyDisplay = document.getElementById('final-accuracy');
    const resultBadge = document.getElementById('result-badge');
    const resultIcon = document.getElementById('result-icon');
    const summaryList = document.getElementById('summary-list');

    finalScoreDisplay.textContent = score;
    finalAccuracyDisplay.textContent = `${correctCount}/${questions.length}`;

    const thresholdHigh = Math.max(4, Math.floor(questions.length * 0.8));
    const thresholdMid = Math.max(2, Math.floor(questions.length * 0.5));

    if (correctCount >= thresholdHigh) {
        resultBadge.textContent = 'Mandou bem — nível avançado';
        resultBadge.style.background = 'linear-gradient(90deg, #059669, #10b981)';
        resultBadge.style.color = '#fff';
        resultIcon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
        resultIcon.style.color = '#e8b923';
    } else if (correctCount >= thresholdMid) {
        resultBadge.textContent = 'Foi bem — nível intermediário';
        resultBadge.style.background = 'linear-gradient(90deg, #4c1d95, #7c3aed)';
        resultBadge.style.color = '#fff';
        resultIcon.innerHTML = '<i class="fa-solid fa-medal"></i>';
        resultIcon.style.color = '#a78bfa';
    } else {
        resultBadge.textContent = 'Continue praticando — nível iniciante';
        resultBadge.style.background = 'linear-gradient(90deg, #991b1b, #dc2626)';
        resultBadge.style.color = '#fff';
        resultIcon.innerHTML = '<i class="fa-solid fa-book-open"></i>';
        resultIcon.style.color = '#f87171';
    }

    summaryList.innerHTML = '';
    userAnswers.forEach((ans, index) => {
        const item = document.createElement('div');
        item.className = `summary-item ${ans.isCorrect ? 'ok' : 'fail'}`;

        const statusIcon = ans.isCorrect
            ? '<i class="fa-solid fa-check text-success me-2"></i>'
            : '<i class="fa-solid fa-xmark text-danger me-2"></i>';

        const correctText = questions[index].options[ans.correct].text;

        item.innerHTML = `
            <div class="fw-semibold mb-1 small">${statusIcon} Mão ${index + 1}: ${ans.question.substring(0, 60)}...</div>
            <div class="small text-muted mb-1">
                <strong>Sua carta:</strong> ${questions[index].options[ans.selected].text}
            </div>
            ${!ans.isCorrect ? `<div class="small text-success mb-1"><strong>Carta correta:</strong> ${correctText}</div>` : ''}
            <div class="small opacity-75 mt-1">
                <strong>Explicação:</strong> ${ans.explanation}
            </div>
        `;
        summaryList.appendChild(item);
    });
}


// ========== HISTÓRICO DO JOGADOR + COMPRAS (visível no F12) ==========
const HISTORY_KEY = "balatro_tech_history";
const PURCHASE_KEY = "balatro_tech_purchases";

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
        return [];
    }
}

function saveHistory(list) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(-50))); // últimas 50 partidas
}

function loadPurchases() {
    try {
        return JSON.parse(localStorage.getItem(PURCHASE_KEY) || "[]");
    } catch {
        return [];
    }
}

function savePurchases(list) {
    localStorage.setItem(PURCHASE_KEY, JSON.stringify(list.slice(-100))); // últimas 100 compras
}

function recordPurchase(name, price, kind, where) {
    const entry = {
        date: new Date().toLocaleString("pt-BR"),
        item: name,
        price: price,
        tipo: kind, // 'pacote' | 'upgrade' | 'boost'
        onde: where // 'loja' | 'loja da partida'
    };
    const list = loadPurchases();
    list.push(entry);
    savePurchases(list);
    console.log(
        "%c🛒 COMPRA REGISTRADA",
        "color:#3b82f6;font-weight:bold",
        `$${price} — ${name} (${kind}, ${where})`
    );
}

function logPurchaseHistory() {
    const list = loadPurchases();
    console.log("%c🛒 HISTÓRICO DE COMPRAS — Balatro Tech", "color:#3b82f6;font-size:14px;font-weight:bold");
    if (!list.length) {
        console.log("Nenhuma compra registrada ainda.");
        return list;
    }
    const totalGasto = list.reduce((s, p) => s + (p.price || 0), 0);
    console.table(list.map((p, i) => ({
        "#": i + 1,
        Data: p.date,
        Item: p.item,
        Preço: "$" + p.price,
        Tipo: p.tipo,
        Onde: p.onde
    })));
    console.log(`Total gasto: $${totalGasto} · ${list.length} compra(s)`);
    console.log("Detalhes:", list);
    return list;
}

function logPlayerHistory() {
    const hist = loadHistory();
    console.log("%c📜 HISTÓRICO DO JOGADOR — Balatro Tech", "color:#e8b923;font-size:14px;font-weight:bold");
    if (!hist.length) {
        console.log("Nenhuma partida registrada ainda.");
    } else {
        console.table(hist.map((h, i) => ({
            "#": i + 1,
            Data: h.date,
            Acertos: h.corrects + "/" + h.total,
            Fichas: h.score,
            Banco: "$" + h.bankAfter,
            Meta: h.handsTarget
        })));
        console.log("Detalhes das partidas:", hist);
    }
    logPurchaseHistory();
    return hist;
}

function recordRunToHistory() {
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const entry = {
        date: new Date().toLocaleString("pt-BR"),
        score: score,
        corrects: correctCount,
        total: questions.length,
        bankAfter: bank,
        handsTarget: handsTarget,
        answers: userAnswers.map((a, i) => ({
            mao: i + 1,
            pergunta: a.question.substring(0, 80),
            acertou: a.isCorrect,
            explicacao: a.explanation.substring(0, 100)
        }))
    };
    const hist = loadHistory();
    hist.push(entry);
    saveHistory(hist);
    console.log("%c✅ Partida salva no histórico", "color:#22c55e;font-weight:bold");
    console.log("Resumo desta partida:", entry);
    logPlayerHistory();
}

function goToMenuFromShop() {
    midShopOpen = false;
    screenShop.classList.add("d-none");
    screenResult.classList.add("d-none");
    screenQuiz.classList.add("d-none");
    screenStart.classList.remove("d-none");
    refreshStartBank();
    logPlayerHistory();
}

function openShop(from) {
    shopReturnScreen = from || 'start';
    midShopOpen = false;
    screenStart.classList.add('d-none');
    screenResult.classList.add('d-none');
    screenQuiz.classList.add('d-none');
    screenShop.classList.remove('d-none');
    document.getElementById('shop-mode-label').textContent = 'LOJA';
    document.getElementById('shop-desc-text').textContent = 'Gaste o dinheiro para liberar mais perguntas e melhorias.';
    const closeBtn = document.getElementById('btn-shop-close');
    if (closeBtn) {
        closeBtn.innerHTML = shopReturnScreen === 'result'
            ? '<i class="fa-solid fa-arrow-left me-2"></i> VOLTAR'
            : '<i class="fa-solid fa-play me-2"></i> JOGAR';
    }
    renderShop(false);
}

function openMidShop(auto) {
    midShopOpen = true;
    shopReturnScreen = 'quiz';
    screenQuiz.classList.add('d-none');
    screenShop.classList.remove('d-none');
    document.getElementById('shop-mode-label').textContent = 'LOJA (desta partida)';
    document.getElementById('shop-desc-text').textContent = auto
        ? 'Compre melhorias rápidas ou pacotes novos com o dinheiro que você tem agora.'
        : 'Compre melhorias desta partida ou pacotes permanentes. O dinheiro desta partida ainda não foi guardado.';
    const closeBtn = document.getElementById('btn-shop-close');
    if (closeBtn) {
        closeBtn.innerHTML = '<i class="fa-solid fa-play me-2"></i> CONTINUAR';
    }
    renderShop(true);
}

function closeShop() {
    screenShop.classList.add('d-none');
    if (midShopOpen) {
        midShopOpen = false;
        screenQuiz.classList.remove('d-none');
        // Se a mão atual ainda não foi respondida, recarrega (útil após reroll)
        if (btnNext.classList.contains('d-none')) {
            loadQuestion();
        } else {
            updateHUD();
        }
        return;
    }
    if (shopReturnScreen === 'result') {
        screenResult.classList.remove('d-none');
        return;
    }
    refreshStartBank();
    startGame();
}

function getRunPrice(basePrice) {
    if (ownedUpgrades.includes('upgrade_shop_discount')) {
        return Math.max(5, Math.floor(basePrice * 0.8));
    }
    return basePrice;
}

function getAvailableMoney() {
    // Na loja de run, usa bank + score (ainda não depositado)
    if (midShopOpen) return bank + score;
    return bank;
}

function spendMoney(amount) {
    if (midShopOpen) {
        // gasta primeiro do score da run, depois do bank
        if (score >= amount) {
            score -= amount;
        } else {
            const rest = amount - score;
            score = 0;
            bank -= rest;
        }
        updateHUD();
    } else {
        bank -= amount;
    }
    writeSave();
}

function renderShop(isMidRun) {
    const money = getAvailableMoney();
    shopMoneyEl.textContent = '$' + money;
    shopItemsEl.innerHTML = '';

    if (isMidRun) {
        // Seção de boosts de run
        const section = document.createElement('div');
        section.className = 'shop-section-title';
        section.innerHTML = '<i class="fa-solid fa-bolt me-1"></i> Melhorias só desta partida';
        shopItemsEl.appendChild(section);

        runShopCatalog.forEach(item => {
            const price = getRunPrice(item.price);
            const canBuy = money >= price;
            const el = document.createElement('div');
            el.className = 'shop-item';
            el.innerHTML = `
                <div class="shop-item-top">
                    <div class="shop-item-name"><i class="${item.icon}"></i> ${item.name}</div>
                    <div class="shop-item-price">$${price}</div>
                </div>
                <div class="shop-item-desc">${item.desc}</div>
                <div class="shop-item-meta">Só vale nesta partida</div>
                <button class="btn-buy" data-run="${item.id}" ${!canBuy ? 'disabled' : ''}>
                    ${canBuy ? 'Comprar' : 'Sem dinheiro'}
                </button>
            `;
            const btn = el.querySelector('.btn-buy');
            if (canBuy) {
                btn.addEventListener('click', () => buyRunItem(item.id, price));
            }
            shopItemsEl.appendChild(el);
        });

        const section2 = document.createElement('div');
        section2.className = 'shop-section-title';
        section2.innerHTML = '<i class="fa-solid fa-layer-group me-1"></i> Pacotes (ficam para sempre)';
        shopItemsEl.appendChild(section2);
    }

    shopCatalog.forEach(item => {
        const isPack = item.type === 'pack';
        const owned = isPack
            ? ownedPacks.includes(item.id)
            : ownedUpgrades.includes(item.id);
        const price = isMidRun ? getRunPrice(item.price) : item.price;
        const canBuy = !owned && money >= price;

        const el = document.createElement('div');
        el.className = 'shop-item' + (owned ? ' owned' : '');
        el.innerHTML = `
            <div class="shop-item-top">
                <div class="shop-item-name"><i class="${item.icon}"></i> ${item.name}</div>
                <div class="shop-item-price">${owned ? 'COMPRADO' : '$' + price}</div>
            </div>
            <div class="shop-item-desc">${item.desc}</div>
            ${isPack ? `<div class="shop-item-meta">+${item.hands} perguntas novas</div>` : `<div class="shop-item-meta">Melhoria permanente</div>`}
            <button class="btn-buy" data-id="${item.id}" ${owned || !canBuy ? 'disabled' : ''}>
                ${owned ? 'Já possui' : (canBuy ? 'Comprar' : 'Sem dinheiro')}
            </button>
        `;
        const btn = el.querySelector('.btn-buy');
        if (!owned && canBuy) {
            btn.addEventListener('click', () => buyItem(item.id, isMidRun ? price : item.price));
        }
        shopItemsEl.appendChild(el);
    });
}

function buyRunItem(id, price) {
    if (getAvailableMoney() < price) return;
    const runItem = runShopCatalog.find(i => i.id === id);
    const itemName = runItem ? runItem.name : id;
    spendMoney(price);
    recordPurchase(itemName, price, 'boost', 'loja da partida');

    if (id === 'run_mult_boost') {
        mult = Math.min(mult + 1, 5);
        updateHUD();
    } else if (id === 'run_chip_boost') {
        score += 25;
        updateHUD();
    } else if (id === 'run_hint') {
        runHintActive = true;
    } else if (id === 'run_reroll') {
        // troca a pergunta atual por outra do pool
        const pool = buildPool();
        const current = questions[currentQuestionIndex];
        let candidates = pool.filter(q => q.question !== current.question);
        if (candidates.length === 0) candidates = pool;
        const next = cloneQuestion(candidates[Math.floor(Math.random() * candidates.length)], candidates[0].pack);
        questions[currentQuestionIndex] = next;
        // fecha e recarrega
        midShopOpen = false;
        screenShop.classList.add('d-none');
        screenQuiz.classList.remove('d-none');
        loadQuestion();
        playCardSound();
        return;
    } else if (id === 'run_insurance') {
        runInsuranceActive = true;
    }

    renderShop(true);
    playCardSound();
}

function buyItem(id, priceOverride) {
    const item = shopCatalog.find(i => i.id === id);
    if (!item) return;
    const price = priceOverride != null ? priceOverride : item.price;
    if (getAvailableMoney() < price) return;

    if (item.type === 'pack') {
        if (ownedPacks.includes(id)) return;
        ownedPacks.push(id);
    } else {
        if (ownedUpgrades.includes(id)) return;
        ownedUpgrades.push(id);
    }

    spendMoney(price);
    recordPurchase(
        item.name,
        price,
        item.type === 'pack' ? 'pacote' : 'upgrade',
        midShopOpen ? 'loja da partida' : 'loja'
    );
    renderShop(midShopOpen);
    refreshStartBank();
    playCardSound();
}

function restartGame() {
    startGame();
}

// Ao abrir o site, mostra o histórico no F12 (Console)
console.log("%cBalatro Tech carregado. Digite logPlayerHistory() ou logPurchaseHistory() no Console.", "color:#93c5fd");
logPlayerHistory();
