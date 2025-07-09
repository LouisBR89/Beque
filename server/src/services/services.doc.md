# Respository Pattern

Dentro da pasta geralmente é organizado a regra de negócio relacionado a cada funcionalidade da aplicação.

Exemplo:

- Para fazer uma transação é necessário ter um conjunto de dados para a criação, na própria classe obrigatóriamente deixa isso claro, no entanto, a classe não está responsável por gerenciar as regras de negócio de uma aplicação, pelo menos não deveria.
- Para isso para cada funcinalidade criaremos um "service" que será responsável por executar apenas uma função "execute" e dentro construira por exemplo nossa transação. Isso se extende para a criação de um novo banco e categoria, é de dentro destas funções que será chamado o banco de dados para persistir os dados.
- Outro nome comumente utilizado é "use case", a discussões sobre, mas que na prática tem o mesmo objetivo.

## Atividade para semana 24/06/2025

- Vocês devem criar para Category, Bank e Transaction funcionalidades de buscar um dado por id, buscar todos os dados, criar um dado, deletar um dado e atualizar um dado por id. No metodo de criação devem existir as regras de negócio, por exemplo, em Category e Bank não podem existir dados repetidos.
