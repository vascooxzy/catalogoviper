# Catálogo Viper — PRD

## Problema
Criar catálogo visual "Viper" com 3 jantes.
- Cores: Branco, Cinza e Preto
- Referências visuais a cobras (decoração)
- Utilizador vai substituir imagens e nomes depois
- Apenas catálogo visual, sem formulários

## Arquitetura
- Frontend único (React + Tailwind)
- Sem backend adicional (mantido o template FastAPI default mas não usado)
- Fontes: Cabinet Grotesk (display) + Manrope (body)
- Imagens: placeholders Pexels (Pexels URLs) a substituir pelo utilizador

## Personas
- Dono do negócio Viper — mostra catálogo a clientes
- Cliente — navega catálogo visualmente

## Implementado (2026-04-22)
- Hero full-screen com imagem de cobra em grayscale + overlay
- Header fixo com glass-morphism e menu mobile
- Marquee com palavras-chave VIPER
- Catálogo com 3 jantes em layout alternado (zig-zag)
- Secção "Sobre" com cobra decorativa grayscale
- Secção "Manifesto" com tipografia massiva
- Footer com paleta de cores e navegação
- SVG decorativos (cobra, presas, textura de escamas)
- Animações: slither, marquee, fade-in-up, hover rotação das jantes
- Cursor custom, selection custom, scrollbar escura
- data-testid em todos os elementos interativos e secções

## Backlog
- P1: Utilizador fornece nomes finais e imagens reais das 3 jantes
- P2: Botão de contacto / WhatsApp (opcional)
- P2: Galeria com mais ângulos por janta
- P2: Página de detalhe por janta (clique em "Ver detalhe")
- P2: Formulário de orçamento
- P2: Modo claro (toggle opcional)

## Próximas ações
- Aguardar nomes reais das 3 jantes do utilizador
- Aguardar imagens reais das 3 jantes
