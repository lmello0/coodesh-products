# Products Parser - Coodesh

>  This is a challenge by [Coodesh](https://coodesh.com/)

Desafio técnico coodesh, que consiste em criar uma API capaz de gerenciar um banco de dados com informações de produtos.

## Tecnologias utilizadas

- NodeJS
- TypeScript
- MongoDB Atlas
- Redis
- Docker

## Bibliotecas utilizadas

- Express
- Axios
- Joi
- Luxon
- Mongoose
- Morgan
- Redis

## Como instalar

### Sem docker

1. Fazer o download do projeto (`git clone`)
2. Instalar as dependências com `npm install`
3. Configurar o arquivo `.env` com base no `.env.example`
4. Configurar o banco Redis e MongoDB 
5. Executar com `npm run dev` para rodar sem transpilar o TypeScript para Javascript OU executar `npm run build` para transpilar o código e executar `npm start` em seguida.

### Com docker

1. Fazer o download do projeto (`git clone`)
2. Buildar a imagem com o seguinte comando:
```docker
docker build -t <nome que a imagem será salva> .
```
3. Configurar os bancos Redis e MongoDB
4. Iniciar o container com
```docker
docker run -d \
--name coodesh-api \
-e MONGODB_USER= \
-e MONGODB_PASSWORD= \
-e MONGODB_URL="<MONGO_URL>/products" \
-e OPENFOODS_FILES_URL= \
-e OPENFOODS_DOWNLOAD_URL= \
-e DOWNLOAD_LOCATION=/app/download \
-e REDIS_URL= \
-e REDIS_PASSWORD= \
-e SYNC_INTERVAL="0 0 * * *" \
-v $(pwd)/download:/app/download \
-p 3000:3000 \
coodesh-products
```

