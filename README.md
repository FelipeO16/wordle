# Wordle Clone

Este é um projeto **Wordle Clone** construído com **Vue 3** e **Nuxt 4**. O jogo permite que o usuário adivinhe palavras com base em feedback visual, semelhante ao famoso jogo "Wordle".

## Demo
[Wordle](https://wordle.nuxt.dev/)
## 🎯 **Objetivo**
Tente adivinhar a palavra do dia! Após cada tentativa, as letras mudarão de cor para fornecer pistas sobre a palavra correta:

- 🟩 **Verde**: A letra está correta e na posição correta.
- 🟨 **Amarelo**: A letra está na palavra, mas na posição errada.
- ⬛ **Cinza**: A letra não está na palavra.

![image](https://github.com/user-attachments/assets/50cdcdb6-8664-4cf8-ab28-5b6bb1cd3b11)


## 🚀 **Tecnologias Utilizadas**
- **Nuxt 4**
- **Vue 3**
- **Tailwind CSS**
- **Vitest**

## 📂 **Estrutura do Projeto**
```plaintext
.
├── app/                     # Diretório principal do Nuxt
│   ├── components/         # Componentes reutilizáveis
│   │   ├── GuessView.vue   # Exibe o feedback visual da tentativa
│   │   ├── GuessInput.vue  # Entrada de texto para o jogador
│   │   ├── KeyboardView.vue # Teclado virtual para interações
│   │   └── WordleBoard.vue # Gerenciamento da interface principal
│   └── app.vue             # Componente raiz do Nuxt
├── server/                  # Backend (quando aplicável)
├── shared/settings/         # Configurações globais (ex: palavras, constantes)
│   ├── index.ts             # Configuração de palavras e variáveis
│   └── words.json           # Banco de palavras
├── test/                    # Testes unitários
│   └── WordleBoard.nuxt.spec.ts
├── nuxt.config.ts           # Configurações do Nuxt
├── README.md                # Documentação
└── package.json             # Dependências do projeto
```

## 📜 **Instalação e Execução**
1. Clone o repositório:
   ```bash
   git clone https://github.com/FelipeO16/wordle.git
   cd wordle
   ```
2. Instale as dependências usando PNPM:
   ```bash
   pnpm install
   ```
3. Execute o projeto no ambiente de desenvolvimento:
   ```bash
   pnpm dev
   ```
4. Acesse o jogo em [http://localhost:3000](http://localhost:3000).

## 🧪 **Executando Testes**
O projeto utiliza **Vitest** para testes unitários e foi desenvolvido com o intuito de estudar **Test-Driven Development (TDD)**. Toda a aplicação foi testada exaustivamente. Para executar os testes:
```bash
pnpm test
```
![image](https://github.com/user-attachments/assets/b7955d0c-3015-4b0a-b14d-f9292fbbf8a2)



## 🎮 **Como Jogar**
1. Digite uma palavra no campo de entrada.
2. Pressione **Enter** para submeter a palavra.
3. Receba o feedback visual:
   - Letras corretas (**verde**).
   - Letras na posição errada (**amarelo**).
   - Letras inexistentes (**cinza**).
4. Tente adivinhar a palavra em até 6 tentativas.
5. Ao finalizar, você verá uma mensagem de vitória ou derrota!

## 🛠️ **Configurações**
O projeto utiliza um arquivo de configuração para palavras do dia e número de tentativas. Localize o arquivo em:
```plaintext
shared/settings/words.json
```
Você pode adicionar ou modificar palavras diretamente neste arquivo.

## 🌟 **Contribuição**
Contribuições são bem-vindas! Abra uma **issue** ou envie um **Pull Request** com suas melhorias ou sugestões.

## 📄 **Licença**
Este projeto está licenciado sob a licença **MIT**.

---
Desenvolvido com ❤️ por Felipe 🚀
