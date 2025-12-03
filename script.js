// Configurações PIX - ALTERE ESTES VALORES COM SUAS INFORMAÇÕES
const PIX_CONFIG = {
    chave: 'sua-chave-pix@email.com', // Altere para sua chave PIX
    valor: '50.00', // Altere para o valor do CD
    descricao: 'Compra de CD - Lançamento da Banda'
};

// Configuração PayPal - ALTERE ESTE LINK COM SEU LINK DO PAYPAL
const PAYPAL_LINK = 'https://www.paypal.com/checkoutnow?token=SEU_TOKEN_AQUI'; // Altere para seu link do PayPal

// ID do vídeo do YouTube - ALTERE ESTE VALOR
const YOUTUBE_VIDEO_ID = 'VIDEO_ID_AQUI'; // Altere para o ID do seu vídeo do YouTube

// Elementos do DOM
const btnPix = document.getElementById('btn-pix');
const btnPaypal = document.getElementById('btn-paypal');
const pixModal = document.getElementById('pix-modal');
const closeModal = document.getElementById('close-modal');
const qrCodeCanvas = document.getElementById('qr-code');
const btnCopyPix = document.getElementById('btn-copy-pix');
const pixKeySpan = document.getElementById('pix-key');
const pixValueSpan = document.getElementById('pix-value');
const youtubeVideo = document.getElementById('youtube-video');

// Atualizar informações PIX no modal
pixKeySpan.textContent = PIX_CONFIG.chave;
pixValueSpan.textContent = parseFloat(PIX_CONFIG.valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Gerar código PIX (formato EMV)
function generatePixCode(chave, valor, descricao) {
    // Formata o valor com 2 casas decimais
    const valorFormatado = parseFloat(valor).toFixed(2);
    
    // Monta o payload PIX no formato EMV
    const payload = [
        { id: '00', value: '01' }, // Payload Format Indicator
        { id: '01', value: '12' }, // Point of Initiation Method (opcional)
        { id: '26', value: [
            { id: '00', value: 'BR.GOV.BCB.PIX' },
            { id: '01', value: chave }
        ]},
        { id: '52', value: '0000' }, // Merchant Category Code
        { id: '53', value: '986' }, // Transaction Currency (BRL)
        { id: '54', value: valorFormatado }, // Transaction Amount
        { id: '58', value: 'BR' }, // Country Code
        { id: '59', value: 'MERCHANT' }, // Merchant Name
        { id: '60', value: 'BRASIL' }, // Merchant City
        { id: '62', value: [
            { id: '05', value: descricao }
        ]}
    ];
    
    // Converte para string EMV
    let emvString = '';
    payload.forEach(item => {
        if (Array.isArray(item.value)) {
            let subString = '';
            item.value.forEach(subItem => {
                subString += String(subItem.id).padStart(2, '0') + 
                           String(subItem.value.length).padStart(2, '0') + 
                           subItem.value;
            });
            emvString += String(item.id).padStart(2, '0') + 
                        String(subString.length).padStart(2, '0') + 
                        subString;
        } else {
            emvString += String(item.id).padStart(2, '0') + 
                        String(item.value.length).padStart(2, '0') + 
                        item.value;
        }
    });
    
    // Adiciona CRC16
    const crc = calculateCRC16(emvString + '6304');
    emvString += '6304' + crc;
    
    return emvString;
}

// Calcula CRC16
function calculateCRC16(data) {
    const polynomial = 0x1021;
    let crc = 0xFFFF;
    
    for (let i = 0; i < data.length; i++) {
        crc ^= (data.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ polynomial;
            } else {
                crc <<= 1;
            }
        }
    }
    
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Gerar QR Code PIX
function generatePixQRCode() {
    const pixCode = generatePixCode(
        PIX_CONFIG.chave,
        PIX_CONFIG.valor,
        PIX_CONFIG.descricao
    );
    
    QRCode.toCanvas(qrCodeCanvas, pixCode, {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, function (error) {
        if (error) {
            console.error('Erro ao gerar QR Code:', error);
            alert('Erro ao gerar QR Code. Verifique o console para mais detalhes.');
        }
    });
}

// Abrir modal PIX
btnPix.addEventListener('click', () => {
    generatePixQRCode();
    pixModal.style.display = 'block';
});

// Fechar modal PIX
closeModal.addEventListener('click', () => {
    pixModal.style.display = 'none';
});

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === pixModal) {
        pixModal.style.display = 'none';
    }
});

// Copiar chave PIX
btnCopyPix.addEventListener('click', () => {
    navigator.clipboard.writeText(PIX_CONFIG.chave).then(() => {
        btnCopyPix.textContent = 'Chave Copiada!';
        btnCopyPix.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            btnCopyPix.textContent = 'Copiar Chave PIX';
            btnCopyPix.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar chave PIX. Tente copiar manualmente.');
    });
});

// Redirecionar para PayPal
btnPaypal.addEventListener('click', () => {
    if (PAYPAL_LINK && PAYPAL_LINK !== 'https://www.paypal.com/checkoutnow?token=SEU_TOKEN_AQUI') {
        window.open(PAYPAL_LINK, '_blank');
    } else {
        alert('Link do PayPal não configurado. Por favor, configure o link do PayPal no arquivo script.js');
    }
});

// Atualizar vídeo do YouTube
if (youtubeVideo && YOUTUBE_VIDEO_ID && YOUTUBE_VIDEO_ID !== 'VIDEO_ID_AQUI') {
    youtubeVideo.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;
}

// Verificar se as configurações foram alteradas
window.addEventListener('load', () => {
    if (PIX_CONFIG.chave === 'sua-chave-pix@email.com') {
        console.warn('⚠️ ATENÇÃO: Configure sua chave PIX no arquivo script.js');
    }
    if (PAYPAL_LINK === 'https://www.paypal.com/checkoutnow?token=SEU_TOKEN_AQUI') {
        console.warn('⚠️ ATENÇÃO: Configure seu link do PayPal no arquivo script.js');
    }
    if (YOUTUBE_VIDEO_ID === 'VIDEO_ID_AQUI') {
        console.warn('⚠️ ATENÇÃO: Configure o ID do vídeo do YouTube no arquivo script.js');
    }
});

