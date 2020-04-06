# API Rest GED

## Como utilizar

### 1. Executar ambiente de desenvolvimento Alfresco

- Clonar o repositório: [acs-community-deployment](https://github.com/Alfresco/acs-community-deployment);
- Copiar o arquivo 'docker-compose.yml' de dentro da pasta 'docker-compose' para a pasta principal;
- Executar o seguinte comando no terminal: 
```console
docker-compose up
```

### 2. Executar a aplicação

- Clonar o repositório este repositório;]
- Executar o comando de instalação das dependências:
```console
yarn
```
- Executar o seguinte comando no terminal: 
```console
yarn dev
```

### 3. Testar rotas da aplicação

- Utilizar algum programa que faça requisções http;
- Testar as rotas usando a baseUrl: 'localhost:8080'