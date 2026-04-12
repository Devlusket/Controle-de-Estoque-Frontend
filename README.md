#  Estoque B2B — Frontend

Interface web desenvolvida com Angular 21 para o sistema de controle de estoque regional. Consome a API REST do backend e oferece uma experiência completa para gerenciamento de movimentações, produtos, cidades e usuários — com controle de acesso por perfil (ADMIN / CLIENTE).

 **Frontend em produção:** https://controle-de-estoque-ashen.vercel.app

 **API em produção (Swagger):** https://controle-de-estoque-backend-7h07.onrender.com/swagger-ui/index.html

---

##  Tecnologias

- **Angular 21** — framework principal com Standalone Components
- **TypeScript**
- **Tailwind CSS v3** — estilização utilitária
- **RxJS** — requisições HTTP reativas com Observable
- **Angular Router** — navegação e rotas protegidas
- **PWA** — Progressive Web App instalável no desktop e mobile
- **Vercel** — deploy do frontend em produção

---

##  Arquitetura

O projeto segue estrutura **feature-based**, o mesmo raciocínio de separação por responsabilidade do backend:

```
src/app/
├── core/
│   ├── models/        # interfaces TypeScript espelhando os DTOs do backend
│   ├── services/      # AuthService, CidadeService, ProdutoService...
│   ├── guards/        # AuthGuard, RoleGuard
│   └── interceptors/  # AuthInterceptor, ErrorInterceptor
├── shared/
│   └── components/    # ToastComponent
├── features/
│   ├── auth/          # tela de login
│   ├── dashboard/     # visão geral com últimas movimentações
│   ├── cidades/       # listagem e formulário
│   ├── produtos/      # listagem e formulário
│   ├── usuarios/      # listagem e formulário (só ADMIN)
│   └── movimentacoes/ # listagem e formulário
└── layout/
    ├── shell/         # layout base com sidebar e navbar
    ├── sidebar/       # navegação lateral
    └── navbar/        # cabeçalho com email e logout
```

---

##  Autenticação e Autorização

O sistema usa JWT stateless. O token é obtido no login e armazenado no `localStorage`. A cada requisição, o `AuthInterceptor` injeta automaticamente o token no header:

```
Authorization: Bearer <token>
```

### Perfis de acesso

| Tela | ADMIN | CLIENTE |
|---|---|---|
| Dashboard | ✅ | ✅ |
| Movimentações — listar | ✅ (todas) | ✅ (só da sua cidade) |
| Movimentações — registrar | ✅ | ✅ |
| Produtos — listar | ✅ | ✅ |
| Produtos — criar/editar/desativar | ✅ | ❌ |
| Cidades — listar | ✅ | ✅ |
| Cidades — criar/editar/deletar | ✅ | ❌ |
| Usuários — todos | ✅ | ❌ |

### Guards

- **AuthGuard** — protege todas as rotas autenticadas. Redireciona para `/login` se não houver token válido.
- **RoleGuard** — protege rotas por perfil. CLIENTE tentando acessar `/usuarios` é redirecionado para `/dashboard`.

---

##  Rotas

```
/login                → pública
/dashboard            → autenticado (ADMIN e CLIENTE)
/movimentacoes        → autenticado (ADMIN e CLIENTE)
/produtos             → autenticado (ADMIN e CLIENTE)
/cidades              → autenticado (ADMIN e CLIENTE)
/usuarios             → apenas ADMIN
```

---

##  Como executar localmente

### Pré-requisitos

- Node.js 20+
- pnpm
- Angular CLI 21+
- Backend rodando localmente (ver repositório do backend)

### 1. Clone o repositório

```bash
git clone https://github.com/Devlusket/Controle-de-Estoque-Frontend.git
cd Controle-de-Estoque-Frontend
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure o environment

O arquivo `src/environments/environment.development.ts` aponta para o backend local:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

Garanta que o backend está rodando em `localhost:8080` antes de subir o frontend.

### 4. Suba o servidor de desenvolvimento

```bash
ng serve
```

Acesse `http://localhost:4200`.

---

##  Testando

### Usuários mock disponíveis

| Email | Senha | Role |
|---|---|---|
| admin@example.com | admin | ADMIN |
| cliente@example.com | admin | CLIENTE |
| cliente2@example.com | admin | CLIENTE |
| cliente3@example.com | admin | CLIENTE |
| cliente4@example.com | admin | CLIENTE |

### Fluxo básico

1. Acesse o frontend em produção ou localmente
2. Faça login com um dos usuários acima
3. ADMIN tem acesso completo a todas as telas
4. CLIENTE vê apenas Dashboard, Movimentações e Produtos

>  O backend está hospedado no Render no plano gratuito — a primeira requisição pode demorar ~1 minuto para o serviço acordar após inatividade.

---

##  Deploy

O frontend está hospedado na **Vercel**. O deploy é automático via GitHub — qualquer push na branch `main` dispara um novo deploy.

### Infraestrutura de produção

| Serviço | Plataforma | Observação |
|---|---|---|
| Frontend (Angular) | Vercel | Plano gratuito, sempre disponível |
| Backend (Spring Boot) | Render | Plano gratuito, dorme após 15min de inatividade |
| Banco de dados (PostgreSQL) | Neon | Plano gratuito, sempre disponível |

### Configurações na Vercel

| Campo | Valor |
|---|---|
| Framework Preset | Angular |
| Build Command | `pnpm run build` |
| Output Directory | `dist/estoque-b2b-frontend/browser` |
| Install Command | `pnpm install` |

### Variáveis de ambiente

O frontend não possui variáveis de ambiente sensíveis — a URL do backend em produção está configurada diretamente no `src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://controle-de-estoque-backend-7h07.onrender.com'
};
```

---

##  Decisões técnicas

- **Standalone Components** — padrão Angular 17+, sem NgModules. Mais simples, mais próximo do modelo moderno do framework.
- **Functional Guards e Interceptors** — padrão Angular 17+, ao invés de classes com `implements`. Menos boilerplate.
- **Tailwind CSS v3** — estilização utilitária sem escrever CSS. Classes aplicadas diretamente no template HTML.
- **RxJS Observables** — todas as requisições HTTP retornam Observable. O subscribe só executa quando o componente precisa dos dados — equivalente ao `CompletableFuture` do Java, mas mais poderoso.
- **ChangeDetectionStrategy.OnPush** — estratégia de detecção de mudanças mais eficiente. O Angular só re-renderiza o componente quando os dados mudam de fato.
- **Lazy Loading** — cada feature é carregada sob demanda via `loadComponent`. A aplicação inicial carrega mais rápido.
- **JWT decodificado no frontend** — o payload do JWT é base64, decodificado com `atob()` nativo do browser. Sem bibliotecas externas para ler email e role do token.
- **Environment por ambiente** — `environment.development.ts` para local, `environment.ts` para produção. O Angular CLI troca automaticamente no build.
- **PWA** — Progressive Web App configurado com `ng add @angular/pwa`. O sistema pode ser instalado como app de desktop ou mobile via Chrome, abrindo em janela própria sem barra de navegador.
- **SPA rewrite** — Vercel lida nativamente com o roteamento de SPAs, retornando `index.html` para qualquer rota e deixando o Angular Router cuidar da navegação.

---

##  Repositórios

- **Frontend (este repositório):** https://github.com/Devlusket/Controle-de-Estoque-Frontend
- **Backend (Java + Spring Boot):** https://github.com/Devlusket/Controle-de-Estoque