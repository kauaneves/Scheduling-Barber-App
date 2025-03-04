# ✂️ **Barbearia Agendada** 💈

**Bem-vindo ao Barbearia Agendada!** O seu novo jeito de agendar cortes, barbas e outros serviços de barbearia com facilidade e praticidade. Esqueça as filas e o telefone! Aqui, agendar seu horário nunca foi tão rápido e simples! 🙌

---

## 🚀 **Funcionalidades**:

- 📅 **Agendamento rápido**: Escolha o melhor horário e agende seu serviço em minutos!
- 👥 **Perfis personalizados**: Salve seus dados, histórico de agendamentos e preferências.
- ✂️ **Diversos serviços**: Corte de cabelo, barba, e muito mais!

---

## 🛠️ **Tecnologias Utilizadas**:

- **Front-end**: React 💻
- **Back-end**: Node.js ⚡
- **Banco de Dados**: PostgreSQL 🗃️
- **Autenticação**: JWT (JSON Web Token) 🔐
- **Hospedagem**: Heroku / Vercel 🌐

---

## 🔒 **Segurança**:

A **segurança** dos dados dos nossos usuários é nossa prioridade. Para garantir a proteção das informações sensíveis, implementamos um sistema de **criptografia utilizando hash + salt** nas senhas.

### O que é hash + salt?

- **Hashing**: O algoritmo de hash converte a senha do usuário em uma string única e de tamanho fixo. Mesmo que duas senhas sejam idênticas, o hash resultante será sempre único.
- **Salt**: Um valor aleatório (salt) é adicionado à senha antes de ser "hasheada", tornando ainda mais difícil a quebra da senha através de ataques de força bruta ou dicionário.

### Benefícios:

- 🔐 **Segurança aprimorada**: Mesmo se os dados forem acessados indevidamente, as senhas estarão protegidas por hash e salt, tornando impossível recuperá-las diretamente.
- 🛡️ **Proteção contra ataques**: A combinação de hash e salt dificulta ataques como "rainbow table" (tabelas pré-calculadas de hashes), oferecendo uma camada extra de proteção.
- 🔒 **Privacidade do usuário**: A senha nunca é armazenada de forma legível, garantindo que, mesmo em caso de falha de segurança, os dados do usuário permaneçam privados.

---

💡 **Objetivo**:
Este projeto tem como objetivo proporcionar uma experiência de agendamento mais fluida, sem complicação. Chega de perder tempo em ligações ou aguardando para ser atendido! ✂️

🧑‍💻 **Equipe**:
Kauã Neves - Desenvolvedor Principal 💻
