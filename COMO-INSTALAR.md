# 📱 Painel Financeiro — App Android (PWA)

## O que é este pacote?

Este é o **Painel Financeiro** convertido em um **PWA (Progressive Web App)** — um app web instalável que funciona como app nativo no Android, **sem precisar de Play Store**.

---

## 📁 Arquivos incluídos

```
painel-financeiro-pwa/
├── index.html       ← App principal (abrir no navegador)
├── manifest.json    ← Configurações do app (nome, ícone, cor)
├── sw.js            ← Service Worker (cache offline)
├── icon-72.png      ← Ícone 72x72
├── icon-96.png      ← Ícone 96x96
├── icon-128.png     ← Ícone 128x128
├── icon-144.png     ← Ícone 144x144
├── icon-152.png     ← Ícone 152x152
├── icon-192.png     ← Ícone 192x192 (principal)
├── icon-384.png     ← Ícone 384x384
└── icon-512.png     ← Ícone 512x512
```

---

## 🚀 Como instalar no Android

### Opção 1 — Hospedar e instalar pelo Chrome (recomendado)

1. **Hospede os arquivos** em qualquer servidor HTTPS:
   - [Netlify Drop](https://app.netlify.com/drop) — arraste a pasta, grátis e instantâneo ✅
   - [GitHub Pages](https://pages.github.com/) — crie um repositório e ative Pages
   - [Vercel](https://vercel.com/) — import do GitHub, grátis

2. **No Android**, abra o Chrome e acesse a URL do seu site

3. **Instale o app**:
   - Um banner aparecerá automaticamente na parte inferior: toque em **"Instalar"**
   - Ou use o menu do Chrome (⋮) → **"Adicionar à tela inicial"** → **"Instalar"**

4. O ícone do **Painel Financeiro** aparecerá na sua tela inicial 🎉

---

### Opção 2 — Testar localmente com USB

Se você tiver Python instalado no computador:

```bash
cd painel-financeiro-pwa
python3 -m http.server 8080
```

No Android, ative **Depuração USB** e use o Chrome DevTools para acessar `localhost:8080`.

> ⚠️ PWAs só podem ser instalados a partir de conexões **HTTPS** (exceto localhost).

---

## ✨ Funcionalidades do App

- 📊 **Dashboard** com gráficos de receitas e despesas
- 📅 **Lançamentos** mensais (receitas, despesas, parcelamentos)
- 🏦 **Dívidas Bancárias** com progresso de quitação
- 📈 **Investimentos** com carteira diversificada
- 💼 **Portfólio** consolidado
- 🏷️ **Categorias** personalizáveis
- 📥 **Exportar / Importar** dados em JSON
- 🔴 **Funciona offline** após primeira visita
- 📱 **Navegação inferior** otimizada para celular
- 💾 **Dados salvos localmente** (localStorage) — privados no seu dispositivo

---

## 🔒 Privacidade

Todos os dados ficam **apenas no seu dispositivo**. Nenhuma informação é enviada para servidores externos.

---

## 🛠️ Atualização do App

Quando você atualizar os arquivos no servidor, o Service Worker atualizará automaticamente o cache na próxima visita.

Para forçar atualização: Chrome → Configurações → Dados do site → Limpar dados do site.
