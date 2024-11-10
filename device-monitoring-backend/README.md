Device_Monitoring_BE

Device Monitoring_BE

Description

This project is a simulated network device monitoring application. It provides an API to manage and simulate the status of devices, such as Smart TVs, smartphones, and IoT devices. Through this API, you can add, list, and update devices, including simulating actions on IoT devices (turn on/off, adjust temperature, etc.).

The application is built with Node.js, Express, TypeORM, and a PostgreSQL database.

Installation and Setup

1. Clone the repository:

git clone https://github.com/JersyFernandesJF/device_monitoring
cd device_monitoring

2. Create a .env file:

The .env file is necessary to set up the database connection. Create the .env file in the root directory and add the following environment variables:
	•	DB_HOST=localhost
	•	DB_PORT=5432
	•	DB_USERNAME=postgres
	•	DB_PASSWORD=Ii13a2019
	•	DB_NAME=device_monitoring

3. Run Docker Compose:

Now, run Docker Compose to start the database and backend:

docker-compose up

Running the Backend

After Docker Compose has started the database, run the backend of the application:

1. Install dependencies:

Ensure Node dependencies are installed:

npm install

2. Start the development server:

Use the command below to start the server in development mode (with live reload via nodemon):

npm run dev

This will start the application on port 3000. The API will be accessible at http://localhost:3000.

Endpoints

The backend API offers the following endpoints:

1. GET /api/devices

Returns the list of simulated devices.

Example Response:

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

Returns details of a specific device.

URL Parameters:
	•	id (required): Device ID.

Example Response:

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

Updates the status of a specific device.

URL Parameters:
	•	id (required): Device ID.

Request Body (JSON):

{
  "status": "offline"
}

Example Response:

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

Creates a new simulated device. Although this functionality allows creating devices, a seed has been added to pre-populate the database with some devices for testing and development.

Request Body (JSON):

{
  "name": "Light Bedroom",
  "ipAddress": "192.168.1.4",
  "macAddress": "00:14:22:01:23:47",
  "deviceType": "IoT device",
  "status": "online"
}

Example Response:

{
  "id": "3",
  "name": "Light Bedroom",
  "ipAddress": "192.168.1.4",
  "macAddress": "00:14:22:01:23:47",
  "deviceType": "IoT device",
  "status": "online",
  "lastActivity": "2024-11-06T12:34:56.000Z"
}

Validations

The system includes request data validations. Device status validation checks if the provided status is valid, i.e., belongs to the set of values defined in the DeviceStatus enumeration. If invalid, the response will be a 400 Bad Request error.

New device validation ensures that all required fields (such as name, ipAddress, macAddress, deviceType, and status) are present and correct before creating the device.

Technologies Used
	•	Node.js (backend)
	•	Express.js (server framework)
	•	TypeORM (ORM for PostgreSQL)
	•	PostgreSQL (database)
	•	Docker (for easy database setup)