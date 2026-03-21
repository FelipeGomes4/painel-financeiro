# 🏛️ Painel Financeiro

> App PWA de gestão financeira pessoal — funciona offline, instalável em qualquer dispositivo.

---

## 📦 Arquivos do projeto

```
painel-financeiro/
├── index.html          ← App principal (tudo em um arquivo)
├── manifest.json       ← Configurações do PWA
├── sw.js               ← Service Worker (cache offline)
├── icon.svg            ← Ícone vetorial
├── icon-192.png        ← Ícone 192×192 (Android/PWA)
├── icon-512.png        ← Ícone 512×512 (splash screen)
└── .github/
    └── workflows/
        └── deploy.yml  ← Deploy automático no GitHub Pages
```

---

## 🚀 Passo a Passo: Publicar no GitHub Pages

### Pré-requisitos
- Conta gratuita no [github.com](https://github.com)
- Git instalado (ou usar o site do GitHub diretamente)

---

### Opção A — Pelo site do GitHub (sem instalar nada)

**1. Criar repositório**
1. Acesse [github.com/new](https://github.com/new)
2. Em **Repository name**, digite: `painel-financeiro`
3. Deixe marcado como **Public** ✅
4. Clique em **Create repository**

**2. Fazer upload dos arquivos**
1. Na página do repositório recém-criado, clique em **"uploading an existing file"**
2. Arraste **todos** os arquivos da pasta `painel-financeiro/` para a área de upload:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
   - `icon-192.png`
   - `icon-512.png`
3. ⚠️ Para o arquivo de workflow, você precisará criar a estrutura de pastas manualmente:
   - Clique em **"Create new file"**
   - No campo do nome, digite: `.github/workflows/deploy.yml`
   - Cole o conteúdo do arquivo `deploy.yml`
   - Clique em **Commit changes**

**3. Ativar GitHub Pages**
1. No repositório, clique em ⚙️ **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione: **GitHub Actions**
4. Salve

**4. Aguardar o deploy**
- Vá em **Actions** (menu superior do repositório)
- Aguarde o workflow `Deploy Painel Financeiro` ficar verde ✅ (1–2 minutos)

**5. Acessar o app**
- Seu link será: `https://SEU-USUARIO.github.io/painel-financeiro/`
- Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub

---

### Opção B — Via linha de comando (Git)

```bash
# 1. Entre na pasta do projeto
cd painel-financeiro

# 2. Inicie o Git
git init
git add .
git commit -m "feat: Painel Financeiro PWA"

# 3. Crie o repositório no GitHub (substitua SEU-USUARIO)
# Primeiro crie em github.com/new, depois:
git remote add origin https://github.com/SEU-USUARIO/painel-financeiro.git
git branch -M main
git push -u origin main

# 4. Ative GitHub Pages em Settings → Pages → Source: GitHub Actions
# O deploy roda automaticamente a cada push!
```

---

## 📱 Como Instalar o App

### Android (Chrome / Edge)
1. Abra o link do GitHub Pages no navegador
2. Um banner aparecerá na tela: **"Instalar App"**
3. Toque em **Instalar**
4. O app aparece na sua tela inicial como qualquer app nativo

### iPhone / iPad (Safari)
> O Safari não mostra o banner automático — siga os passos:
1. Abra o link no **Safari** (não funciona em Chrome/Firefox no iOS)
2. Toque no botão **Compartilhar** (ícone de seta para cima)
3. Role e toque em **"Adicionar à Tela de Início"**
4. Confirme tocando em **Adicionar**

### Desktop (Chrome / Edge / Brave)
1. Abra o link no navegador
2. Na barra de endereços, aparece um ícone de **"Instalar"** (monitor com seta)
3. Clique e confirme a instalação
4. O app abre em janela própria, sem barra do navegador

---

## ✨ Funcionalidades do App

| Recurso | Descrição |
|---------|-----------|
| 📊 Dashboard | Cards de patrimônio, gráficos de receita/despesa |
| 📅 Lançamentos | Histórico completo com filtros por mês e categoria |
| 🏦 Dívidas | Controle de parcelas com progresso visual |
| 📈 Investimentos | Tabela de ativos com rentabilidade |
| 💼 Carteira | Visão consolidada por tipo e banco |
| 🏷️ Categorias | Sistema hierárquico de categorias personalizadas |
| 📥 Export/Import | Backup em JSON — nunca perde seus dados |
| 🌐 Offline | Funciona sem internet após primeira abertura |
| 💾 Dados locais | Tudo salvo no dispositivo, sem servidor |

---

## 🔄 Atualizar o App

Sempre que fizer mudanças:

```bash
git add .
git commit -m "update: descrição da mudança"
git push
```

O GitHub Actions fará o deploy automaticamente em ~1 minuto.  
O Service Worker atualizará o cache na próxima vez que o usuário abrir o app.

---

## 🛠️ Personalizar

### Mudar nome do app
No `manifest.json`:
```json
"name": "Meu App Financeiro",
"short_name": "Minhas Finanças"
```

### Mudar cores
No `index.html`, seção `:root`:
```css
--accent: #00c896;          /* cor principal */
--bg-sidebar: #0f2027;      /* sidebar */
--bg-primary: #f0f4f8;      /* fundo */
```

### Mudar o ícone
Substitua `icon-192.png` e `icon-512.png` pela sua imagem.  
Use [realfavicongenerator.net](https://realfavicongenerator.net) para gerar todos os tamanhos.

---

## ❓ Problemas Comuns

**O banner de instalação não aparece**  
→ Certifique-se de acessar via HTTPS (GitHub Pages já usa HTTPS)  
→ O Chrome exige que o site seja visitado pelo menos 2x antes de mostrar o banner

**"Service Worker failed"**  
→ Verifique se `sw.js` está na raiz do repositório, no mesmo nível do `index.html`

**Dados sumiram após atualizar**  
→ Os dados ficam no `localStorage` do navegador. Use **Exportar Dados** antes de limpar o cache.

**App não atualiza após novo deploy**  
→ Feche e reabra o app. Ou no navegador: F5 duas vezes. O Service Worker versiona o cache (`CACHE_NAME = 'painel-financeiro-v1'`). Para forçar atualização, incremente para `v2`.

---

## 📄 Licença

MIT — use, modifique e distribua livremente.
