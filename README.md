# API Rest GED

## Funcionalidades

API REST que fornece as seguintes funcionalidades no ambiente Alfresco:

- Autenticação;
- Criação, alteração, listagem e remoção de arquivos;
- Criação, alteração, listagem e remoção de pastas;
- Criação, alteração e listagem de informações de usuários;
- Realização de busca simples por termo em arquivos e pastas.

### 1. Executar ambiente de desenvolvimento Alfresco

- Clonar o repositório: [acs-community-deployment](https://github.com/Alfresco/acs-community-deployment);
- Copiar o arquivo 'docker-compose.yml' de dentro da pasta 'docker-compose' para a pasta principal;
- Executar o seguinte comando `docker-compose up` no terminal.

### 2. Executar a aplicação

- Clonar este repositório;
- Executar o comando `yarn` para instalação de dependências;
- Executar o seguinte comando `yarn dev` no terminal.

### 3. Testar rotas da aplicação

- Utilizar algum programa que faça requisções http: [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/);

#### Autenticação

- Realizar a seguinte requisição:
```javascript
POST base_url/sessions
```
Enviando através do body as seguintes informações:

```javascript
{
  username,
  password
}
```

#### Arquivos

- Realizar as seguintes requisições:

1. Criação:

```javascript
POST base_url/folders/id/files
```
O campo id na url deve ser preenchido pelo `id` da pasta onde o arquivo ficará.
Caso não tenha criado uma pasta ainda, pode utilizar `-my-` como id, será criado na pasta onde fica todos seu conteúdo.

Enviando através de um Multipartform as seguintes informações:

```javascript
{
  file,
  type,
  number,
  year,
  description,
  author,
  date
}
```

2. Listar

```javascript
GET base_url/files/id
```
O campo id na url deve ser preenhido pelo `id` do arquivo que deseja as informações.

3. Alterar

```javascript
PUT base_url/files/id
```
O campo id na url deve ser preenchido pelo `id` do arquivo que deseja alterar as informações.

Enviando através do body os dados que deseja alterar com as possíveis informações:

```javascript
{
  type,
  number,
  year,
  description,
  author,
  date
}
```

4. Deletar

```javascript
DELETE base_url/files/id
```
O campo id na url deve ser preenhido pelo `id` do arquivo que deseja deletar.

#### Pastas

- Realizar as seguintes requisições:

1. Criação:

```javascript
POST base_url/folders/id
```
O campo id na url deve ser preenchido pelo `id` da pasta onde a pasta ficará.
Caso não tenha criado uma pasta ainda, pode utilizar `-my-` como id, será criada na pasta onde fica todos seu conteúdo.

Enviando através do body o nome da pasta:

```javascript
{
  name
}
```

2. Listar

```javascript
GET base_url/fdolers/id
```
O campo id na url deve ser preenhido pelo `id` da pasta que deseja ver os conteúdos presente na pasta.

3. Alterar

```javascript
PUT base_url/folders/id
```
O campo id na url deve ser preenchido pelo `id` da pasta que deseja alterar as informações.

Enviando através do body o nome que deseja alterar:

```javascript
{
  name
}
```

4. Deletar

```javascript
DELETE base_url/folders/id
```
O campo id na url deve ser preenhido pelo `id` da pasta que deseja deletar.

#### Usuários

- Realizar as seguintes requisições:

Aqui é necessário ter privéligio para realizar as operações, ou seja, ser um administrador.

1. Criação:

```javascript
POST base_url/users
```

Enviando através do body o nome da pasta:

```javascript
{
  username
  firstName
  lastName,
  email
  password
}
```

2. Listar

```javascript
GET base_url/users/id
```
O campo id na url deve ser preenhido pelo `id` do usuário que deseja ver suas informações.

3. Alterar

```javascript
PUT base_url/users/id
```
O campo id na url deve ser preenchido pelo `id` do usuários que deseja alterar as informações.

Enviando através do body os dados que deseja alterar nas seguintes possibilidades:

```javascript
{
  username
  firstName
  lastName,
  email
  password
}
```

#### Pesquisa

1. Buscar

```javascript
GET base_url/search
```

Enviando através de query params o termo que deseja buscar:

```javascript
{
  content
}
```
