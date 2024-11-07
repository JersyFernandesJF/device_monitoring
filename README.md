# device_monitoring
Para organizar a documentação do seu projeto de forma robusta e detalhada, com as instruções para o ambiente de desenvolvimento, a configuração do banco de dados, e como executar o backend, você pode usar o formato markdown, ideal para um README.md. Abaixo, segue a documentação com todos os detalhes, incluindo a estrutura do projeto, rotas, e instruções de execução.

Device Monitoring

Descrição

Este projeto é uma aplicação de monitoramento de dispositivos simulados em rede. Ele fornece uma API para gerenciar e simular o estado de dispositivos, como Smart TVs, smartphones e dispositivos IoT. Através dessa API, você pode adicionar, listar e atualizar dispositivos, incluindo a simulação de ações em dispositivos IoT (ligar/desligar, ajustar a temperatura, etc.).

A aplicação é construída com Node.js, Express, TypeORM, e um banco de dados PostgreSQL.

Instalação e Configuração

	1.	Clonar o repositório:

git clone <URL_DO_REPOSITORIO>
cd device_monitoring


	2.	Criar um arquivo .env:
O arquivo .env é necessário para configurar a conexão com o banco de dados. Crie o arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=Ii13a2019
DB_NAME=device_monitoring


	3.	Rodar o Docker Compose:

Agora, execute o Docker Compose para iniciar o banco de dados e o backend:

docker-compose up



Executando o Backend

Após o Docker Compose ter iniciado o banco de dados, rode o backend da aplicação:

	1.	Instalar dependências:
Certifique-se de ter as dependências do Node instaladas:

npm install


	2.	Iniciar o servidor de desenvolvimento:
Utilize o comando abaixo para iniciar o servidor em modo de desenvolvimento (com live reload via nodemon):

npm run dev

Isso vai iniciar a aplicação na porta 3000. A API estará acessível em http://localhost:3000.

Endpoints

A API do backend oferece os seguintes endpoints:

1. GET /api/devices

Retorna a lista de dispositivos simulados.

Resposta Exemplo:

[
  {
    "id": "1",
    "name": "Smart TV Living Room",
    "ipAddress": "192.168.1.2",
    "macAddress": "00:14:22:01:23:45",
    "deviceType": "Smart TV",
    "status": "online",
    "lastActivity": "2024-11-06T12:34:56.000Z"
  },
  {
    "id": "2",
    "name": "Thermostat",
    "ipAddress": "192.168.1.3",
    "macAddress": "00:14:22:01:23:46",
    "deviceType": "IoT device",
    "status": "offline",
    "lastActivity": "2024-11-06T12:00:00.000Z"
  }
]

2. GET /api/devices/:id

Retorna os detalhes de um dispositivo específico.

Parâmetros de URL:

	•	id (obrigatório): ID do dispositivo.

Resposta Exemplo:

{
  "id": "1",
  "name": "Smart TV Living Room",
  "ipAddress": "192.168.1.2",
  "macAddress": "00:14:22:01:23:45",
  "deviceType": "Smart TV",
  "status": "online",
  "lastActivity": "2024-11-06T12:34:56.000Z"
}

3. PUT /api/devices/:id/status

Atualiza o status de um dispositivo específico.

Parâmetros de URL:

	•	id (obrigatório): ID do dispositivo.

Corpo da Requisição (JSON):

{
  "status": "offline"
}

Resposta Exemplo:

{
  "id": "1",
  "name": "Smart TV Living Room",
  "ipAddress": "192.168.1.2",
  "macAddress": "00:14:22:01:23:45",
  "deviceType": "Smart TV",
  "status": "offline",
  "lastActivity": "2024-11-06T12:34:56.000Z"
}

4. POST /api/devices

Cria um novo dispositivo simulado.

Corpo da Requisição (JSON):

{
  "name": "Light Bedroom",
  "ipAddress": "192.168.1.4",
  "macAddress": "00:14:22:01:23:47",
  "deviceType": "IoT device",
  "status": "online"
}

Resposta Exemplo:

{
  "id": "3",
  "name": "Light Bedroom",
  "ipAddress": "192.168.1.4",
  "macAddress": "00:14:22:01:23:47",
  "deviceType": "IoT device",
  "status": "online",
  "lastActivity": "2024-11-06T12:34:56.000Z"
}

Validações

O sistema possui validações para os dados das requisições. A validação de status do dispositivo verifica se o status fornecido é válido, ou seja, se pertence ao conjunto de valores definidos na enumeração DeviceStatus. Se inválido, a resposta será um erro 400 Bad Request.

A validação de novo dispositivo assegura que todos os campos necessários (como name, ipAddress, macAddress, deviceType e status) estão presentes e corretos antes de criar o dispositivo.

Tecnologias Usadas

	•	Node.js (back-end)
	•	Express.js (framework para servidor)
	•	TypeORM (ORM para PostgreSQL)
	•	PostgreSQL (banco de dados)
	•	Docker (para facilitar a configuração do banco de dados)