# PRD — Catálogo Viper

## Problema original
O utilizador enviou o ficheiro `catalogoviperpt-main.zip` com a intenção de continuar a construir o site: “tens ai o ficheiro do site que quero continuar a construir”. Depois pediu para avançar com o melhor julgamento, sem clarificação adicional.

## Decisões de arquitetura
- Projeto mantido como frontend React/CRA com Tailwind, React Router e assets estáticos em `/public/assets`.
- Site tratado como catálogo visual premium de jantes, sem backend, formulários ou checkout nesta fase.
- Preservado o estilo monocromático Viper: preto, branco, cinza, tipografia forte e elementos decorativos de serpente.
- Recursos críticos foram localizados/estabilizados: assets originais copiados para `/app/frontend/public/assets`; marquee de marcas convertido para texto local para evitar falhas externas.

## Implementado
- Integração do site enviado no workspace principal `/app/frontend`.
- Correção do erro de compilação em `SnakeDecor.jsx` ao exportar corretamente `ViperHead`.
- Logo principal ajustado para versão branca visível em fundo escuro.
- Homepage com welcome gate, hero premium, marquee, preview dos 3 modelos e links para Sobre/Manifesto.
- Página Catálogo com 3 modelos, seleção de cores e submodelos interativos.
- Páginas Sobre e Manifesto com conteúdo em português.
- Cookie banner funcional com aceitar/recusar.
- Navegação desktop e mobile com data-testid nos principais elementos interativos.
- Validação: lint passou, build passou e testes frontend completos passaram com 100% no escopo pedido.

## Backlog priorizado
### P0
- Manter o catálogo funcional e sem erros visuais ao trocar/atualizar imagens reais dos modelos.
- Confirmar textos comerciais finais, nomes oficiais dos modelos e referências.

### P1
- Adicionar chamada direta para contacto/WhatsApp ou pedido de orçamento por modelo.
- Criar galeria por modelo com mais ângulos/fotos reais.
- Melhorar gestão de cookies com fluxo event-driven em vez de polling.

### P2
- Área simples de administração para gerir modelos, cores e imagens.
- Filtros por marca/compatibilidade/tamanho de jante.
- SEO avançado e metadados específicos por página/modelo.

## Próximas tarefas sugeridas
1. Adicionar botão “Pedir orçamento” em cada modelo.
2. Inserir tamanhos/medidas disponíveis por jante.
3. Criar página individual para cada modelo com galeria e especificações.


## Atualização — Capas e logos de marcas
- Adicionada capa enviada pelo utilizador ao Modelo 01 (`/assets/viper-basic-cover.png`).
- Adicionada parede de logos de marcas compatíveis (`/assets/brand-logos-wall.png`) na homepage, mantendo o estilo monocromático do site.
- Menu superior aumentado visualmente e removido o ano “2026” que aparecia ao lado.
- Modelo 02 agora apresenta divisão visual entre 02 e 02.1, com capa própria para o 02.1 (`/assets/model-02-1-cover.jpeg`) e seleção por hover/click.
- Homepage também mostra o cartão do Modelo 02 dividido entre 02 e 02.1.
- Validação: lint, build e teste visual via browser passaram.


## Atualização — Refinamento hover Modelo 02 e logos
- Homepage mantém os três cartões 01, 02 e 03 limpos; o cartão 02 fica fechado por defeito e só revela a escolha 02 / 02.01 ao passar o rato.
- As opções 02 e 02.01 expandem suavemente no hover para parecerem escolhas distintas.
- Secção de marcas foi substituída por uma grelha premium de logos locais, sem dependência externa e sem imagem desfocada.
- Validação: lint e build passaram; teste visual confirmou hover do Modelo 02 e grelha de logos.


## Atualização — Imagens Modelo 02/YKGG e logos reais
- Atualizada a jante do Modelo 02/Mr Yunk Vino para a nova imagem enviada (`/assets/model-02-myv-gold-new.png`), substituindo a versão menos profissional.
- Atualizada a capa do submodelo YKGG com a segunda imagem enviada (`/assets/model-02-ykgg-cover-new.png`).
- Reformulada a secção de logos: passou a usar ícones reais locais das marcas, apenas símbolos, sem nomes visíveis nos cartões.
- Mantido o estilo premium monocromático com grelha limpa e marquee de ícones.
- Validação: lint, build e teste visual passaram; sem erros JS relevantes.


## Atualização — Capas finais do Modelo 02 e imagens antigas nas cores
- A capa do MR YUNK VINO no split da homepage e catálogo passou a usar a Imagem 2 enviada (`/assets/model-02-myv-cover-final.png`).
- A capa do YKGG no split da homepage e catálogo passou a usar a Imagem 1 enviada (`/assets/model-02-ykgg-cover-final.png`).
- A seleção de cores voltou a usar as imagens antigas/originais: `myv-gold.png` para MR YUNK VINO e `atomo-*` para YKGG.
- Validação: lint, build e teste visual confirmaram capas finais no split e imagens antigas na escolha de cores.


## Atualização — MR YUNK VINO imagem de cor
- Substituída a imagem da opção dourada do MR YUNK VINO por `/assets/myv-gold-updated.png`, removendo o fundo branco anterior.
- A capa split continua separada da imagem de produto; esta atualização afeta a área de escolha/cor no catálogo.
- Validação: lint, build e teste visual confirmaram a nova imagem no Modelo 02.


## Atualização — Capa final homepage Modelo 02
- Adicionada a imagem enviada como capa inicial do Modelo 02 na homepage (`/assets/model-02-home-cover-final.jpeg`).
- Antes do hover, o cartão 02 mostra esta capa única.
- Ao passar o rato, mantém o comportamento final: divisão em 02 e 02.01 para escolha dos submodelos.
- Validação: lint, build e teste visual confirmaram o comportamento antes/depois do hover.


## Atualização — Revisão final mobile/crops
- Feita revisão visual final em desktop e mobile.
- Confirmado que a homepage não tem overflow horizontal no mobile.
- Texto do cartão Modelo 02 alterado de “Passa o rato para escolher” para “Ver submodelos”, funcionando melhor em mobile e desktop.
- Confirmado que o Modelo 02 mostra capa única por defeito e split 02/02.01 no hover desktop.
- Validação: lint, build e screenshots passaram.


## Atualização — Correções do code review
- Corrigidas dependências/estrutura dos hooks em `App.js`, `WelcomeGate.jsx` e `use-toast.js`.
- `CookieBanner` deixou de usar polling com `setInterval` e passou para sincronização por evento/storage.
- Removido uso de índice como `key` em listas relevantes.
- Reduzida complexidade de `App.js` com componentes menores para capas, seletores, cards da homepage e painel de detalhe.
- Removidas expressões ternárias aninhadas reportadas, usando helpers/componentes nomeados.
- Validação: lint, build e teste visual/funcional passaram.
