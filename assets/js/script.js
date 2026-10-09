// ========== BALATRO TECH — Deck de Diagnósticos ==========

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5'];
const suitColors = { '♠': 'suit-black', '♥': 'suit-red', '♦': 'suit-red', '♣': 'suit-black' };

const baseQuestions = [
    {
        type: "interactive-mb-view",
        rank: "A", suit: "♠",
        question: "🛠️ BANCADA ABERTA: Chegou um upgrade de memória. Onde o pente de RAM deve ser instalado na placa-mãe?",
        options: [
            { text: "Instalar RAM no Slot DIMM", icon: "fa-solid fa-memory" },
            { text: "Instalar GPU no Soquete da CPU", icon: "fa-solid fa-microchip" },
            { text: "Aplicar Pasta no Slot PCI-E", icon: "fa-solid fa-flask" },
            { text: "Instalar GPU no Slot DIMM", icon: "fa-solid fa-network-wired" }
        ],
        correct: 0,
        explanation: "A memória RAM deve ser encaixada no slot DIMM alinhando a chanfradura central com a trava do slot."
    },
    {
        type: "interactive-beeps",
        rank: "K", suit: "♥",
        question: "🔊 POST MISTERIOSO: As fans ligam, a tela fica preta e o speaker da placa-mãe solta três beeps longos. Qual a jogada certa?",
        beepInfo: "🔊 Bip... Bip... Bip... (3 Beeps Longos no POST)",
        options: [
            { text: "Superaquecimento extremo na CPU", icon: "fa-solid fa-temperature-arrow-up" },
            { text: "Remover RAM, limpar e reencaixar", icon: "fa-solid fa-memory" },
            { text: "Defeito na fonte de alimentação", icon: "fa-solid fa-plug" },
            { text: "Bateria CMOS com baixa carga", icon: "fa-solid fa-battery-quarter" }
        ],
        correct: 1,
        explanation: "A sequência de 3 beeps no POST é o aviso padrão do BIOS informando erro de leitura ou mau contato no módulo de memória RAM."
    },
    {
        type: "interactive-telemetry",
        rank: "Q", suit: "♦",
        question: "🔍 ALERTA TÉRMICO: O computador do cliente desliga sozinho depois de uns 10 minutos. Olhe o painel de sensores e escolha a ação:",
        sensorData: {
            temp: "95°C (ALERTA CRÍTICO)",
            rpm: "0 RPM (COOLER TRAVADO)",
            volt: "12.1 V (TENSÃO OK)"
        },
        options: [
            { text: "Trocar a Fonte por uma mais forte", icon: "fa-solid fa-bolt" },
            { text: "Trocar o Cooler parado/queimado", icon: "fa-solid fa-fan" },
            { text: "Formatar o disco e reinstalar SO", icon: "fa-solid fa-compact-disc" },
            { text: "Trocar o cabo SATA da placa-mãe", icon: "fa-solid fa-cable-car" }
        ],
        correct: 1,
        explanation: "Com a ventoinha em 0 RPM e a temperatura em 95°C, o processador desliga automaticamente por proteção térmica (Thermal Shutdown)."
    },
    {
        type: "interactive-component",
        rank: "J", suit: "♣",
        question: "🌡️ CONTATO TÉRMICO: Antes de fechar o cooler sobre a CPU, o que NÃO pode faltar entre o processador e o dissipador?",
        componentView: "Componente: Processador + Dissipador de Alumínio",
        options: [
            { text: "Cola de silicone de alta aderência", icon: "fa-solid fa-bottle-droplet" },
            { text: "Óleo lubrificante antiferrugem", icon: "fa-solid fa-oil-can" },
            { text: "Pasta Térmica para condução de calor", icon: "fa-solid fa-flask-vial" },
            { text: "Fita adesiva isolante condutora", icon: "fa-solid fa-tape" }
        ],
        correct: 2,
        explanation: "A pasta térmica preenche as imperfeições microscópicas do metal, garantindo a rápida transferência de calor da CPU para o cooler."
    },
    {
        type: "interactive-bios",
        rank: "10", suit: "♠",
        question: "⚙️ FIRMWARE MODERNO: O cliente trouxe um SSD de 4TB. Qual modo de firmware permite partições maiores que 2TB?",
        biosView: "Firmware Mode: [ Legacy BIOS ] ➔ Alterar para padrão moderno",
        options: [
            { text: "Legacy BIOS tradicional MS-DOS", icon: "fa-solid fa-terminal" },
            { text: "UEFI + GPT + Secure Boot", icon: "fa-solid fa-gears" },
            { text: "CMOS Basic Mode de 16-bits", icon: "fa-solid fa-microchip" },
            { text: "Modo Protegido sem partições", icon: "fa-solid fa-shield-halved" }
        ],
        correct: 1,
        explanation: "O UEFI substituiu o BIOS clássico e permite o uso de partições GPT maiores que 2TB, além de boot mais rápido e seguro."
    },
    {
        type: "interactive-cmd",
        rank: "9", suit: "♥",
        question: "🌐 SEM REDE: O cabo está plugado, o LED acende, mas não há internet. Qual comando testa se a placa de rede responde localmente?",
        cmdView: "C:\\Users\\Tecnico> _",
        options: [
            { text: "ping 127.0.0.1 (testar placa de rede)", icon: "fa-solid fa-network-wired" },
            { text: "format C: /q (formatar unidade)", icon: "fa-solid fa-trash-can" },
            { text: "shutdown -s -t 0 (desligar PC)", icon: "fa-solid fa-power-off" },
            { text: "chkdsk /f (verificar disco)", icon: "fa-solid fa-hard-drive" }
        ],
        correct: 0,
        explanation: "O endereço IP 127.0.0.1 é a interface interna de loopback. O teste confirma se o hardware da placa de rede está respondendo."
    },
    {
        type: "interactive-component",
        rank: "8", suit: "♦",
        question: "💨 JATO DE AR: Na limpeza com ar comprimido, o que fazer com as ventoinhas para não danificar a placa-mãe?",
        componentView: "Ferramenta: Compressor de Ar + Ventoinhas",
        options: [
            { text: "Deixar girar no limite máximo", icon: "fa-solid fa-wind" },
            { text: "Segurar as pás para não girarem", icon: "fa-solid fa-hand" },
            { text: "Molhar as pás com água saponácea", icon: "fa-solid fa-droplet" },
            { text: "Inverter a polaridade dos cabos", icon: "fa-solid fa-arrows-rotate" }
        ],
        correct: 1,
        explanation: "Girar a ventoinha com ar de fora faz o motor agir como gerador (dínamo), enviando tensão de retorno que pode queimar a placa-mãe."
    },
    {
        type: "interactive-component",
        rank: "7", suit: "♣",
        question: "🔋 RELÓGIO ZERADO: Sempre que o PC sai da tomada, a data volta para 2010. Qual componente da placa-mãe precisa ser trocado?",
        componentView: "Placa-Mãe: Soquete de Bateria Moeda (CR2032)",
        options: [
            { text: "Substituir a Bateria CMOS CR2032", icon: "fa-solid fa-battery-half" },
            { text: "Trocar o processador por outro", icon: "fa-solid fa-microchip" },
            { text: "Trocar os cabos de energia", icon: "fa-solid fa-plug" },
            { text: "Substituir o pente de RAM", icon: "fa-solid fa-memory" }
        ],
        correct: 0,
        explanation: "A bateria CR2032 alimenta o chip CMOS responsável por manter as configurações da BIOS e a hora do sistema quando desligado."
    },
    {
        type: "interactive-component",
        rank: "6", suit: "♠",
        question: "⚡ MULTÍMETRO NA FONTE: No cabo ATX, o fio amarelo deve medir qual tensão contínua (DC)?",
        componentView: "Fonte ATX: Amarelo (+12V) | Vermelho (+5V) | Laranja (+3.3V)",
        options: [
            { text: "+12V DC (CPU e Placa de Vídeo)", icon: "fa-solid fa-bolt" },
            { text: "+220V AC Alternada", icon: "fa-solid fa-plug-circle-bolt" },
            { text: "+3.3V DC", icon: "fa-solid fa-car-battery" },
            { text: "0V / Terra (Gnd)", icon: "fa-solid fa-minus" }
        ],
        correct: 0,
        explanation: "No padrão de cores ATX, o fio Amarelo transporta a linha de +12V, o Vermelho +5V e o Laranja +3.3V."
    },
    {
        type: "interactive-component",
        rank: "5", suit: "♥",
        question: "🛡️ ARQUIVOS SEQUESTRADOS: Extensões viraram '.locked' e uma mensagem pede pagamento em criptomoeda. Que tipo de ameaça é essa?",
        componentView: "Alerta: 'Seus arquivos foram criptografados!'",
        options: [
            { text: "Vírus de Adware comum", icon: "fa-solid fa-rectangle-ad" },
            { text: "Ataque de Ransomware", icon: "fa-solid fa-user-ninja" },
            { text: "Falha física de Bad Blocks", icon: "fa-solid fa-triangle-exclamation" },
            { text: "Erro do Windows Update", icon: "fa-solid fa-window-restore" }
        ],
        correct: 1,
        explanation: "O Ransomware criptografa os arquivos da vítima e exige o pagamento de um resgate para fornecer a chave de descriptografia."
    },
    // ===== NOVAS PERGUNTAS BASE =====
    {
        type: "interactive-component",
        rank: "4", suit: "♠",
        question: "🔌 USB SEM ENERGIA: O cliente diz que o pendrive não é reconhecido e o LED do dispositivo não acende. Qual verificação primeiro?",
        componentView: "Porta USB-A / USB-C + dispositivo externo",
        options: [
            { text: "Testar em outra porta e outro cabo/dispositivo", icon: "fa-solid fa-usb" },
            { text: "Formatar o HD principal imediatamente", icon: "fa-solid fa-eraser" },
            { text: "Trocar a pasta térmica da CPU", icon: "fa-solid fa-flask" },
            { text: "Desligar o Secure Boot e esperar", icon: "fa-solid fa-shield" }
        ],
        correct: 0,
        explanation: "Portas USB e cabos falham com frequência. Isolar o problema testando outra porta e outro dispositivo evita troca desnecessária de peças."
    },
    {
        type: "interactive-beeps",
        rank: "3", suit: "♥",
        question: "🔊 UM BEEP CONTÍNUO: O speaker emite um bip longo e contínuo logo após ligar. O que isso costuma indicar?",
        beepInfo: "🔊 Biiiiiiiiip... (1 Beep longo contínuo)",
        options: [
            { text: "Erro de memória RAM (POST clássico)", icon: "fa-solid fa-memory" },
            { text: "Windows corrompido", icon: "fa-solid fa-windows" },
            { text: "Monitor desconectado apenas", icon: "fa-solid fa-desktop" },
            { text: "Driver de áudio desatualizado", icon: "fa-solid fa-volume-high" }
        ],
        correct: 0,
        explanation: "Em muitos BIOS AMI/Award, um beep longo contínuo aponta falha de memória. Reencaixar ou trocar os pentes de RAM é o primeiro passo."
    },
    {
        type: "interactive-telemetry",
        rank: "2", suit: "♦",
        question: "🔥 GPU QUENTE: Jogos travam e a placa de vídeo chega a 95°C. Sensores mostram fan da GPU em 20%. O que fazer?",
        sensorData: {
            temp: "GPU 95°C (CRÍTICO)",
            rpm: "FAN GPU 20% (BAIXA)",
            volt: "12.0 V (OK)"
        },
        options: [
            { text: "Limpar dissipador e conferir curva da fan da GPU", icon: "fa-solid fa-fan" },
            { text: "Trocar só o processador", icon: "fa-solid fa-microchip" },
            { text: "Formatar e instalar Linux", icon: "fa-solid fa-linux" },
            { text: "Remover toda a RAM", icon: "fa-solid fa-memory" }
        ],
        correct: 0,
        explanation: "Poeira no dissipador e curva de ventilador agressiva demais (ou travada) fazem a GPU aquecer. Limpeza + ajuste de fan resolvem a maioria dos casos."
    },
    {
        type: "interactive-cmd",
        rank: "A", suit: "♣",
        question: "🖥️ IP ESTÁTICO: O cliente precisa de IP fixo na rede local. Qual comando no Windows mostra a configuração atual de rede?",
        cmdView: "C:\\Users\\Tecnico> _",
        options: [
            { text: "ipconfig /all", icon: "fa-solid fa-terminal" },
            { text: "chkdsk C:", icon: "fa-solid fa-hard-drive" },
            { text: "sfc /scannow", icon: "fa-solid fa-shield" },
            { text: "diskpart", icon: "fa-solid fa-database" }
        ],
        correct: 0,
        explanation: "ipconfig /all lista endereços IP, máscara, gateway e DNS de todas as interfaces — essencial antes de definir IP estático."
    },
    {
        type: "interactive-component",
        rank: "K", suit: "♠",
        question: "🖱️ SEM MOUSE: Após montar o PC, teclado e mouse USB não respondem no POST. Qual causa comum?",
        componentView: "Painel frontal + portas USB da placa-mãe",
        options: [
            { text: "Cabos do painel frontal USB invertidos ou soltos", icon: "fa-solid fa-plug" },
            { text: "Pasta térmica em excesso na GPU", icon: "fa-solid fa-flask" },
            { text: "SSD NVMe no slot errado de RAM", icon: "fa-solid fa-memory" },
            { text: "Antena Wi-Fi desconectada", icon: "fa-solid fa-wifi" }
        ],
        correct: 0,
        explanation: "Os conectores USB do painel frontal (F_USB) precisam estar no header correto e na polaridade certa. Invertidos, as portas não funcionam."
    },
    {
        type: "interactive-bios",
        rank: "Q", suit: "♥",
        question: "⏱️ XMP/DOCP: A RAM é 3200 MHz, mas o sistema roda em 2133 MHz. O que ativar na BIOS?",
        biosView: "Memory Profile: [ Default 2133 ] ➔ Ativar perfil de overclock",
        options: [
            { text: "Ativar perfil XMP (Intel) ou DOCP/EOCP (AMD)", icon: "fa-solid fa-gauge-high" },
            { text: "Desligar o Secure Boot e reiniciar", icon: "fa-solid fa-shield" },
            { text: "Mudar de UEFI para Legacy", icon: "fa-solid fa-terminal" },
            { text: "Zerar o CMOS e deixar padrão", icon: "fa-solid fa-battery-empty" }
        ],
        correct: 0,
        explanation: "JEDEC padrão é conservador. XMP/DOCP aplica as frequências e timings anunciados pelo fabricante do pente de RAM."
    }
];

// ========== PACOTES EXTRA (compráveis na loja) ==========
const packQuestions = {
    storage: [
        {
            type: "interactive-component",
            rank: "4", suit: "♦",
            pack: "storage",
            question: "💾 DISCO MORTO: O PC liga, mas não encontra o sistema. O cabo de dados do SSD está frouxo. Qual conector deve estar firme na placa-mãe?",
            componentView: "SSD / HD ↔ Placa-Mãe: cabo de dados",
            options: [
                { text: "Cabo SATA de dados bem encaixado", icon: "fa-solid fa-hard-drive" },
                { text: "Apenas o cabo de força da fonte", icon: "fa-solid fa-plug" },
                { text: "Cabo VGA do monitor", icon: "fa-solid fa-desktop" },
                { text: "Antena Wi-Fi externa", icon: "fa-solid fa-wifi" }
            ],
            correct: 0,
            explanation: "O cabo SATA transmite os dados entre o SSD/HD e a placa-mãe. Sem ele bem conectado, o disco não é detectado no boot."
        },
        {
            type: "interactive-component",
            rank: "3", suit: "♣",
            pack: "storage",
            question: "📀 CLONE DE DISCO: O cliente quer migrar o Windows de um HD antigo para um SSD novo. Qual interface é a mais rápida para SSD moderno?",
            componentView: "Comparativo: SATA III vs NVMe M.2",
            options: [
                { text: "SSD NVMe no slot M.2", icon: "fa-solid fa-bolt" },
                { text: "HD 5400 RPM por USB 2.0", icon: "fa-solid fa-hard-drive" },
                { text: "Disquete de 1.44 MB", icon: "fa-solid fa-save" },
                { text: "CD-ROM IDE legado", icon: "fa-solid fa-compact-disc" }
            ],
            correct: 0,
            explanation: "SSDs NVMe em slot M.2 usam o barramento PCIe e são bem mais rápidos que SATA III tradicional."
        },
        {
            type: "interactive-component",
            rank: "2", suit: "♥",
            pack: "storage",
            question: "🗄️ SMART ALERTA: O software de disco mostra 'Reallocated Sectors' alto. O que isso significa?",
            componentView: "SMART: Reallocated Sector Count = 1200 (CRÍTICO)",
            options: [
                { text: "HD/SSD com setores ruins — fazer backup e trocar", icon: "fa-solid fa-triangle-exclamation" },
                { text: "Apenas poeira no cooler", icon: "fa-solid fa-fan" },
                { text: "Driver de vídeo desatualizado", icon: "fa-solid fa-display" },
                { text: "Cabo de rede solto", icon: "fa-solid fa-ethernet" }
            ],
            correct: 0,
            explanation: "Setores realocados indicam degradação física do disco. Backup imediato e substituição evitam perda de dados."
        }
    ],
    network: [
        {
            type: "interactive-cmd",
            rank: "2", suit: "♠",
            pack: "network",
            question: "🌐 DNS FALHOU: O ping em 8.8.8.8 funciona, mas sites por nome não abrem. Qual é o problema mais provável?",
            cmdView: "C:\\> ping 8.8.8.8  →  OK\nC:\\> ping google.com  →  falha",
            options: [
                { text: "Problema de DNS / servidores de nome", icon: "fa-solid fa-server" },
                { text: "Fonte de alimentação fraca", icon: "fa-solid fa-bolt" },
                { text: "Pasta térmica ressecada", icon: "fa-solid fa-flask" },
                { text: "Bateria CMOS esgotada", icon: "fa-solid fa-battery-empty" }
            ],
            correct: 0,
            explanation: "Se o IP responde e o nome não, a resolução DNS está falhando. Trocar DNS (ex.: 8.8.8.8) costuma resolver."
        },
        {
            type: "interactive-component",
            rank: "A", suit: "♥",
            pack: "network",
            question: "📡 WI-FI AUSENTE: Notebook novo sem antenas ligadas na placa wireless. O que fazer?",
            componentView: "Placa Mini PCIe / M.2 Wi-Fi + cabos de antena",
            options: [
                { text: "Conectar os cabos de antena na placa Wi-Fi", icon: "fa-solid fa-wifi" },
                { text: "Formatar o SSD imediatamente", icon: "fa-solid fa-eraser" },
                { text: "Trocar a pasta térmica da GPU", icon: "fa-solid fa-fan" },
                { text: "Inverter polaridade da bateria CMOS", icon: "fa-solid fa-battery-half" }
            ],
            correct: 0,
            explanation: "Placas wireless internas precisam dos cabos de antena conectados; sem isso o sinal fica péssimo ou inexistente."
        },
        {
            type: "interactive-cmd",
            rank: "K", suit: "♦",
            pack: "network",
            question: "🔄 IP CONFLITO: Dois PCs na mesma rede com o mesmo endereço. Qual comando libera e renova o IP no Windows?",
            cmdView: "C:\\> ipconfig /release && ipconfig /renew",
            options: [
                { text: "ipconfig /release e depois /renew", icon: "fa-solid fa-arrows-rotate" },
                { text: "format C: /fs:ntfs", icon: "fa-solid fa-eraser" },
                { text: "shutdown /r /t 0", icon: "fa-solid fa-power-off" },
                { text: "netsh winsock reset apenas", icon: "fa-solid fa-network-wired" }
            ],
            correct: 0,
            explanation: "release libera o lease atual e renew pede um novo IP ao DHCP, resolvendo conflito quando o servidor redistribui."
        }
    ],
    power: [
        {
            type: "interactive-component",
            rank: "K", suit: "♦",
            pack: "power",
            question: "⚡ PC NÃO LIGA: Ao pressionar o power, nada acontece — nem LED nem cooler. Qual teste clássico de fonte?",
            componentView: "Fonte ATX: teste de jump no conector 24 pinos",
            options: [
                { text: "Teste de jump (ligar fonte fora do gabinete)", icon: "fa-solid fa-plug" },
                { text: "Reinstalar o Windows no escuro", icon: "fa-solid fa-windows" },
                { text: "Trocar só o mouse USB", icon: "fa-solid fa-computer-mouse" },
                { text: "Atualizar drivers de áudio", icon: "fa-solid fa-volume-high" }
            ],
            correct: 0,
            explanation: "O jump no conector 24 pinos (fio verde + preto) testa se a fonte liga isolada. Se não ligar, a fonte ou a tomada é o problema."
        },
        {
            type: "interactive-component",
            rank: "Q", suit: "♣",
            pack: "power",
            question: "🔋 GPU SEM IMAGEM: Placa de vídeo high-end instalada, mas a tela não acende. O que falta além do PCIe?",
            componentView: "GPU: slot PCIe + conectores extras de energia",
            options: [
                { text: "Conectores PCIe de energia da fonte (6/8 pinos)", icon: "fa-solid fa-plug-circle-bolt" },
                { text: "Pasta térmica no soquete DIMM", icon: "fa-solid fa-flask" },
                { text: "Cabo SATA no cooler", icon: "fa-solid fa-fan" },
                { text: "Antena no slot M.2", icon: "fa-solid fa-wifi" }
            ],
            correct: 0,
            explanation: "GPUs potentes exigem conectores extras de energia vindos da fonte. Sem eles, a placa não inicializa a saída de vídeo."
        },
        {
            type: "interactive-component",
            rank: "J", suit: "♠",
            pack: "power",
            question: "📉 QUEDA DE TENSÃO: Sob carga a linha de 12V cai para 10.5V e o PC reinicia. Qual a causa mais provável?",
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
            question: "🛡️ PHISHING: E-mail pede senha do banco com link suspeito. Qual a atitude correta?",
            componentView: "Caixa de entrada: e-mail suspeito de banco",
            options: [
                { text: "Não clicar; acessar o banco digitando o site oficial", icon: "fa-solid fa-shield-halved" },
                { text: "Enviar a senha para 'confirmar conta'", icon: "fa-solid fa-key" },
                { text: "Baixar o anexo .exe imediatamente", icon: "fa-solid fa-file-arrow-down" },
                { text: "Desligar o antivírus para ver melhor", icon: "fa-solid fa-shield-virus" }
            ],
            correct: 0,
            explanation: "Phishing tenta roubar credenciais. Nunca use links de e-mail: abra o site oficial digitando o endereço."
        },
        {
            type: "interactive-component",
            rank: "10", suit: "♥",
            pack: "security",
            question: "🔐 2FA: O cliente quer proteger o e-mail além da senha. O que recomendar?",
            componentView: "Conta online: autenticação em duas etapas",
            options: [
                { text: "Ativar autenticação em dois fatores (2FA)", icon: "fa-solid fa-mobile-screen" },
                { text: "Usar a mesma senha em todos os sites", icon: "fa-solid fa-copy" },
                { text: "Anotar a senha em post-it no monitor", icon: "fa-solid fa-note-sticky" },
                { text: "Desativar o firewall do Windows", icon: "fa-solid fa-fire" }
            ],
            correct: 0,
            explanation: "2FA exige um segundo fator (app ou SMS). Mesmo com a senha vazada, o invasor não entra sem o segundo código."
        },
        {
            type: "interactive-component",
            rank: "9", suit: "♣",
            pack: "security",
            question: "🦠 MALWARE PERSISTENTE: Antivírus remove, mas o vírus volta após reiniciar. Onde costuma se esconder?",
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
            question: "❄️ WATER COOLER: O PC liga mas a temperatura sobe rápido e o radiador está frio. O que checar primeiro?",
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
            question: "🌀 CURVA DE FAN: Em idle a CPU fica a 75°C com fans em 30%. Qual ajuste faz sentido?",
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
            question: "🧴 PASTA TÉRMICA VELHA: CPU a 90°C em stress com cooler bom e limpo. Qual manutenção clássica?",
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
            question: "🖨️ IMPRESSORA OFFLINE: Está ligada na rede, mas o Windows mostra 'Offline'. Qual passo inicial?",
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
            question: "🎧 SEM ÁUDIO: Fones no jack frontal não funcionam, mas os traseiros sim. Onde está o problema?",
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
            question: "🖥️ MONITOR SEM SINAL: GPU tem imagem na saída DisplayPort, mas o monitor só tem HDMI. O que usar?",
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
        name: "Pacote Armazenamento",
        icon: "fa-solid fa-hard-drive",
        desc: "3 novas mãos: SATA, SSD NVMe, SMART e discos.",
        price: 90,
        hands: 3
    },
    {
        id: "network",
        type: "pack",
        name: "Pacote Rede",
        icon: "fa-solid fa-network-wired",
        desc: "3 novas mãos: DNS, Wi-Fi, conflito de IP.",
        price: 100,
        hands: 3
    },
    {
        id: "power",
        type: "pack",
        name: "Pacote Energia",
        icon: "fa-solid fa-bolt",
        desc: "3 novas mãos: fonte ATX, jump test e GPU.",
        price: 95,
        hands: 3
    },
    {
        id: "security",
        type: "pack",
        name: "Pacote Segurança",
        icon: "fa-solid fa-shield-halved",
        desc: "3 novas mãos: phishing, 2FA e malware.",
        price: 85,
        hands: 3
    },
    {
        id: "cooling",
        type: "pack",
        name: "Pacote Refrigeração",
        icon: "fa-solid fa-fan",
        desc: "3 novas mãos: water cooler, curva de fan e pasta térmica.",
        price: 110,
        hands: 3
    },
    {
        id: "peripherals",
        type: "pack",
        name: "Pacote Periféricos",
        icon: "fa-solid fa-keyboard",
        desc: "3 novas mãos: impressora, áudio frontal e monitores.",
        price: 80,
        hands: 3
    },
    {
        id: "upgrade_mult",
        type: "upgrade",
        name: "Mult Inicial +1",
        icon: "fa-solid fa-xmark",
        desc: "Começa cada partida com multiplicador x2.",
        price: 150
    },
    {
        id: "upgrade_bonus",
        type: "upgrade",
        name: "Bônus de Fichas",
        icon: "fa-solid fa-coins",
        desc: "+5 fichas extras em cada acerto.",
        price: 120
    },
    {
        id: "upgrade_shop_discount",
        type: "upgrade",
        name: "Desconto na Loja",
        icon: "fa-solid fa-tags",
        desc: "Itens da loja de run custam 20% menos.",
        price: 130
    },
    {
        id: "upgrade_extra_hand",
        type: "upgrade",
        name: "Mão Extra",
        icon: "fa-solid fa-plus",
        desc: "Cada run tem 11 mãos em vez de 10.",
        price: 180
    }
];

// Itens só da loja no meio da partida (temporários da run)
const runShopCatalog = [
    {
        id: "run_mult_boost",
        name: "Boost de Mult",
        icon: "fa-solid fa-fire",
        desc: "+1 no multiplicador agora (máx x5).",
        price: 40
    },
    {
        id: "run_chip_boost",
        name: "Saco de Fichas",
        icon: "fa-solid fa-coins",
        desc: "+25 fichas instantâneas nesta run.",
        price: 35
    },
    {
        id: "run_hint",
        name: "Dica Técnica",
        icon: "fa-solid fa-lightbulb",
        desc: "Revela a carta correta na próxima mão.",
        price: 25
    },
    {
        id: "run_reroll",
        name: "Embaralhar Mão",
        icon: "fa-solid fa-shuffle",
        desc: "Troca a pergunta atual por outra do baralho.",
        price: 30
    },
    {
        id: "run_insurance",
        name: "Seguro de Mult",
        icon: "fa-solid fa-shield",
        desc: "O próximo erro NÃO reseta o multiplicador.",
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

function getHandsPerRun() {
    return ownedUpgrades.includes('upgrade_extra_hand') ? 11 : 10;
}

function buildDeck() {
    const pool = shuffleArray(buildPool());
    if (pool.length === 0) return [];
    const hands = getHandsPerRun();
    const run = [];
    let i = 0;
    while (run.length < hands) {
        if (i > 0 && i % pool.length === 0) {
            const reshuffled = shuffleArray(pool.map(q => cloneQuestion(q, q.pack)));
            for (let k = 0; k < reshuffled.length && run.length < hands; k++) {
                run.push(reshuffled[k]);
            }
            i += pool.length;
            continue;
        }
        run.push(cloneQuestion(pool[i % pool.length], pool[i % pool.length].pack));
        i++;
    }
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

const btnHomeResult = document.getElementById('btn-home-result');
if (btnHomeResult) btnHomeResult.addEventListener('click', goHome);

const btnMidShop = document.getElementById('btn-mid-shop');
if (btnMidShop) btnMidShop.addEventListener('click', openMidShop);

const btnHomeQuiz = document.getElementById('btn-home-quiz');
if (btnHomeQuiz) btnHomeQuiz.addEventListener('click', goHomeFromQuiz);

refreshStartBank();

function refreshStartBank() {
    if (startBankEl) {
        const unique = baseQuestions.length + ownedPacks.reduce((n, id) => n + (packQuestions[id] ? packQuestions[id].length : 0), 0);
        const perRun = getHandsPerRun();
        startBankEl.textContent = `$${bank} no banco · ${perRun} mãos/partida · pool ${unique}`;
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
        explanationTitle.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i>MÃO VENCEDORA! +${gained} chips`;
    } else {
        explanationBox.classList.add('alert-danger');
        explanationTitle.innerHTML = `<i class="fa-solid fa-circle-xmark me-2"></i>MÃO PERDIDA`;
    }
    explanationText.textContent = q.explanation;

    btnNext.classList.remove('d-none');
    if (currentQuestionIndex === questions.length - 1) {
        btnNext.innerHTML = 'VER RESULTADO FINAL <i class="fa-solid fa-trophy ms-2"></i>';
    } else {
        btnNext.innerHTML = 'PRÓXIMA MÃO <i class="fa-solid fa-arrow-right ms-2"></i>';
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
        resultBadge.textContent = 'ROYAL FLUSH — Especialista N3';
        resultBadge.style.background = 'linear-gradient(90deg, #059669, #10b981)';
        resultBadge.style.color = '#fff';
        resultIcon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
        resultIcon.style.color = '#e8b923';
    } else if (correctCount >= thresholdMid) {
        resultBadge.textContent = 'FULL HOUSE — Técnico N2';
        resultBadge.style.background = 'linear-gradient(90deg, #4c1d95, #7c3aed)';
        resultBadge.style.color = '#fff';
        resultIcon.innerHTML = '<i class="fa-solid fa-medal"></i>';
        resultIcon.style.color = '#a78bfa';
    } else {
        resultBadge.textContent = 'HIGH CARD — Trainee';
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
                <strong>Análise:</strong> ${ans.explanation}
            </div>
        `;
        summaryList.appendChild(item);
    });
}

function openShop(from) {
    shopReturnScreen = from || 'start';
    midShopOpen = false;
    screenStart.classList.add('d-none');
    screenResult.classList.add('d-none');
    screenQuiz.classList.add('d-none');
    screenShop.classList.remove('d-none');
    document.getElementById('shop-mode-label').textContent = 'LOJA TECH';
    document.getElementById('shop-desc-text').textContent = 'Compre pacotes de cartas para desbloquear novas mãos no próximo run!';
    const closeBtn = document.getElementById('btn-shop-close');
    if (closeBtn) {
        closeBtn.innerHTML = shopReturnScreen === 'result'
            ? '<i class="fa-solid fa-arrow-left me-2"></i> VOLTAR'
            : '<i class="fa-solid fa-play me-2"></i> JOGAR COM O BARALHO';
    }
    renderShop(false);
}

function openMidShop(auto) {
    midShopOpen = true;
    shopReturnScreen = 'quiz';
    screenQuiz.classList.add('d-none');
    screenShop.classList.remove('d-none');
    document.getElementById('shop-mode-label').textContent = 'LOJA DA RUN';
    document.getElementById('shop-desc-text').textContent = auto
        ? 'Entre as mãos: compre boosts temporários ou pacotes permanentes com o dinheiro da run!'
        : 'Compre boosts para esta partida ou pacotes permanentes. O dinheiro da run ainda não está no banco.';
    const closeBtn = document.getElementById('btn-shop-close');
    if (closeBtn) {
        closeBtn.innerHTML = '<i class="fa-solid fa-play me-2"></i> CONTINUAR PARTIDA';
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
        section.innerHTML = '<i class="fa-solid fa-bolt me-1"></i> Boosts desta partida';
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
                <div class="shop-item-meta">Só vale nesta run</div>
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
        section2.innerHTML = '<i class="fa-solid fa-layer-group me-1"></i> Pacotes permanentes';
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
            ${isPack ? `<div class="shop-item-meta">+${item.hands} mãos no baralho</div>` : `<div class="shop-item-meta">Upgrade permanente</div>`}
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
    spendMoney(price);

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
    renderShop(midShopOpen);
    refreshStartBank();
    playCardSound();
}

function restartGame() {
    startGame();
}