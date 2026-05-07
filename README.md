# GitHub Profiles - Aplicação de Busca de Usuários GitHub

Uma aplicação web moderna para buscar e visualizar perfis de usuários do GitHub com uma interface intuitiva e responsiva.

## 📋 Descrição

Esta aplicação permite que usuários busquem perfis públicos do GitHub, visualizando informações detalhadas como:
- Nome e username
- Avatar do perfil
- Biografia
- Localização
- Estatísticas (repositórios, seguidores, seguindo, gists)
- Informações adicionais (empresa, blog, data de criação da conta)

## 🛠️ Stack Tecnológico

### Frontend Framework
- **React 19.2.5** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 6.0.2** - Superset de JavaScript com tipagem estática
- **Vite 8.0.10** - Build tool e dev server de alta performance

### UI & Styling
- **Tailwind CSS 4.2.4** - Framework CSS utilitário
- **shadcn/ui** - Componentes reutilizáveis baseados em Radix UI
- **Radix UI 1.4.3** - Primitivos acessíveis para construir componentes
- **Lucide React 1.14.0** - Ícones SVG como componentes React
- **Class Variance Authority 0.7.1** - Gerador de variantes CSS
- **Tailwind Merge 3.5.0** - Merge inteligente de classes Tailwind

### Validação & API
- **Zod 4.4.3** - Schema validation com TypeScript-first design
- **GitHub REST API** - Para buscar dados de usuários

### Desenvolvimento
- **ESLint** - Linter para manter a qualidade do código
- **TypeScript ESLint** - Integração de ESLint com TypeScript
- **@vitejs/plugin-react** - Plugin React para Vite com HMR

### Tipografia
- **@fontsource-variable/inter** - Fonte Inter variável

## 📁 Estrutura do Projeto

```
github-app/
├── src/
│   ├── api/
│   │   └── api.ts                 # Integração com GitHub REST API
│   ├── components/
│   │   └── ui/
│   │       ├── alert.tsx          # Componente Alert (não utilizado)
│   │       ├── card.tsx           # Componente Card do shadcn
│   │       ├── input.tsx          # Componente Input do shadcn
│   │       ├── label.tsx          # Componente Label
│   │       ├── separator.tsx      # Componente Separator
│   │       ├── switch.tsx         # Componente Switch
│   │       └── field.tsx          # Componente Field (não utilizado)
│   ├── utils/
│   │   ├── schema.ts              # Schemas de validação Zod
│   │   └── ValidationError.tsx    # Componente de erro de validação
│   ├── lib/
│   │   └── utils.ts               # Funções utilitárias (cn - merge de classes)
│   ├── App.tsx                    # Componente principal da aplicação
│   ├── App.css                    # Estilos globais
│   ├── main.tsx                   # Ponto de entrada da aplicação
│   └── vite-env.d.ts              # Tipos Vite
├── public/                        # Assets estáticos
├── package.json                   # Dependências e scripts do projeto
├── tsconfig.json                  # Configuração TypeScript
├── tsconfig.app.json              # Configuração TypeScript para app
├── tsconfig.node.json             # Configuração TypeScript para node
├── vite.config.ts                 # Configuração do Vite
├── eslint.config.js               # Configuração do ESLint
└── README.md                      # Este arquivo
```

## 🎨 Componentes UI

A aplicação utiliza componentes do **shadcn/ui** baseados em **Radix UI** para garantir acessibilidade e consistência visual:

- **Card** - Container com header, content e footer para exibição do perfil
- **Input** - Campo de entrada com validação em tempo real
- **Switch** - Toggle para alternar entre tema claro e escuro
- **Separator** - Divisor visual entre seções
- **Button** - Botão customizado (implementado com Tailwind)

## 🚀 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento com HMR
npm run dev

# Build de produção com type checking
npm run build

# Preview do build de produção
npm run preview

# Executa o linter
npm run lint
```

## 🔍 Funcionalidades Principais

### Busca de Usuários
- Campo de entrada com validação em tempo real
- Validação de nome de usuário (apenas letras, números e hífens)
- Requisição assíncrona para GitHub API

### Exibição de Perfil
- Card responsivo com foto do perfil
- Estatísticas do usuário em grid
- Informações adicionais (empresa, blog, data de criação)
- Links clicáveis para perfil e blog do usuário

### Tema
- Toggle entre tema claro e escuro
- Sincronização com classe CSS `dark` no documento

### Tratamento de Erros
- Validação de entrada com Zod
- Card de erro customizado
- Mensagens de erro amigáveis

## 📝 Configuração do Projeto

### Paths Aliases
O projeto utiliza path aliases configurados no `tsconfig.json`:
- `@/*` → `/src/*` - Para imports relativos simplificados

### Tailwind CSS
Configurado com suporte a:
- Tema claro e escuro (dark mode)
- Variáveis CSS customizadas
- Plugins de animação

### TypeScript
- Modo estrito habilitado
- Target: ES2020
- Module: ESNext

## 🔗 Integração com GitHub API

A aplicação consome a **GitHub REST API v3** para buscar informações públicas de usuários:

- Endpoint: `https://api.github.com/users/{username}`
- Sem autenticação (rate limit: 60 requisições/hora)
- Retorna dados públicos do perfil do usuário

## ♿ Acessibilidade

A aplicação segue boas práticas de acessibilidade:
- Componentes baseados em **Radix UI** (padrão WAI-ARIA)
- Labels associados aos campos
- Atributos `aria-*` apropriados
- Suporte a navegação por teclado

## 📦 Dependências Principais

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| react | 19.2.5 | Framework UI |
| typescript | 6.0.2 | Tipagem estática |
| vite | 8.0.10 | Build tool |
| tailwindcss | 4.2.4 | CSS framework |
| zod | 4.4.3 | Validação de schema |
| radix-ui | 1.4.3 | Componentes primitivos |
| lucide-react | 1.14.0 | Ícones |

## 🎯 Próximas Melhorias

- [ ] Adicionar paginação para múltiplos resultados
- [ ] Cache de requisições
- [ ] Histórico de buscas
- [ ] Comparação entre usuários
- [ ] Integração com autenticação GitHub (OAuth)

## 📄 Licença

Este projeto é privado e destinado apenas para uso pessoal/educacional.
