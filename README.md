# Landing Page - Lançamento CD

Landing page moderna para divulgar o lançamento em CD de uma banda, com design em preto e branco e fontes especiais.

## 🎨 Características

- Design em preto e branco
- Fontes: Rubik Wet Paint e UnifrakturMaguntia
- Logo da banda no topo
- Galeria de fotos da banda
- Texto sobre o lançamento
- Vídeo do YouTube incorporado
- Botão para gerar QR Code PIX (Brasil)
- Botão para compra via PayPal (Internacional)

## 📋 Configuração

### 1. Imagens

Substitua as seguintes imagens na pasta do projeto:

- `logo-banda.png` - Logo da banda (recomendado: 300px de largura)
- `foto-banda-1.jpg` - Foto da banda 1
- `foto-banda-2.jpg` - Foto da banda 2
- `foto-banda-3.jpg` - Foto da banda 3

### 2. Configuração do PIX

Abra o arquivo `script.js` e altere as seguintes configurações:

```javascript
const PIX_CONFIG = {
    chave: 'sua-chave-pix@email.com', // Sua chave PIX
    valor: '50.00', // Valor do CD
    descricao: 'Compra de CD - Lançamento da Banda'
};
```

### 3. Configuração do PayPal

No arquivo `script.js`, altere o link do PayPal:

```javascript
const PAYPAL_LINK = 'https://www.paypal.com/checkoutnow?token=SEU_TOKEN_AQUI';
```

### 4. Configuração do Vídeo do YouTube

No arquivo `script.js`, altere o ID do vídeo:

```javascript
const YOUTUBE_VIDEO_ID = 'VIDEO_ID_AQUI';
```

Para obter o ID do vídeo do YouTube:
- Acesse o vídeo no YouTube
- O ID está na URL: `https://www.youtube.com/watch?v=VIDEO_ID_AQUI`

### 5. Personalização de Textos

Abra o arquivo `index.html` e personalize:

- Título da página (tag `<title>`)
- Textos sobre o lançamento (seção `.about-section`)
- Nome da banda no footer

## 🚀 Como Usar

1. Configure todas as informações acima
2. Abra o arquivo `index.html` em um navegador
3. Para publicar online, faça upload dos arquivos para um servidor web

## 📱 Responsividade

A landing page é totalmente responsiva e funciona bem em:
- Desktop
- Tablet
- Mobile

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- QRCode.js (biblioteca para gerar QR Codes)
- Google Fonts (Rubik Wet Paint e UnifrakturMaguntia)

## 📝 Notas

- O QR Code PIX é gerado dinamicamente usando o padrão EMV
- Certifique-se de que sua chave PIX está ativa e configurada corretamente
- Para o PayPal, você precisará criar um botão de pagamento no painel do PayPal e copiar o link gerado

