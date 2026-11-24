# Tech Oferta — site de afiliados

Site estático em HTML, CSS e JavaScript, preparado para publicação no GitHub Pages.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `tech-oferta`).
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório, preservando a pasta `.github` e a pasta `assets`.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**; selecione `main` e `/ (root)` e salve.
5. Aguarde a publicação. O endereço será semelhante a `https://SEU-USUARIO.github.io/tech-oferta/`.

## Cadastrar novos produtos

1. Coloque as imagens do novo produto em `assets/products/`.
2. Abra `products.json` e acrescente um novo objeto à lista, separando os objetos por vírgula.
3. Preencha `id`, `title`, `subtitle`, `category`, `description`, `specs`, `images` e `affiliateUrl`.
4. Salve e envie as alterações ao GitHub. O Pages publica a nova versão automaticamente.

Exemplo de produto:

```json
{
  "id": "produto-exemplo",
  "title": "Nome do produto",
  "subtitle": "Resumo das especificações",
  "category": "Notebooks",
  "description": "Descrição curta do produto.",
  "specs": ["Especificação 1", "Especificação 2"],
  "images": ["assets/products/foto-exemplo.png"],
  "affiliateUrl": "https://seu-link-de-afiliado"
}
```

**Importante:** mantenha JSON válido (aspas duplas e vírgulas corretas). O site não exibe preços.

## Sobre monitoramento e e-mail

O site é estático e não consulta estoque por conta própria. O workflow em `.github/workflows/monitor.yml` é apenas uma base agendada/desativada; ainda não existe integração de estoque nem envio de e-mail. Para ativar isso corretamente, será necessário definir uma fonte autorizada de disponibilidade e configurar credenciais protegidas em GitHub Actions Secrets. Não coloque senhas, tokens ou chaves no HTML, JavaScript ou `products.json`.

## Observações

- O link de afiliado do primeiro produto foi mantido exatamente como recebido.
- Não foi possível confirmar o ASIN a partir do link curto informado; por isso, o catálogo não inventa nem registra um ASIN.
- A declaração de afiliado está visível no rodapé.
