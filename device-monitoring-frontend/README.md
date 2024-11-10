Device_Monitoring_FE

Device Monitoring_FE

This Angular project is an application for managing networked devices. The interface allows users to view a list of devices, filter by status and MAC address, toggle the connectivity status of devices, and receive real-time notifications on device creation, updates, or deletions.

Features
	•	Display Device List: View a list of devices with details like type, status, IP address, MAC address, and last activity.
	•	Status Filter: Filter devices by status (“All,” “Online,” and “Offline”) using a toggle button.
	•	MAC Address Filter: Search for devices by MAC address using an input field.
	•	Update Device Status: Toggle the status (online/offline) of devices directly from the interface.
	•	Real-Time Notifications: Automatically receive updates on device status (creation, update, and deletion) via sockets.
	•	Actions Menu: Access additional actions for each device, including editing status and viewing details.

Technologies Used

Frontend
	•	Angular: The main framework used to build the SPA application.
	•	Angular Material: Used for creating user interface components (such as buttons, menus, icons, etc.) with a modern design.
	•	FormsModule: Angular module for reactive form handling and data binding.
	•	RxJS: Library for working with reactive programming and handling data streams.

Backend (APIs)
	•	HTTP Client Module: Used for communication with the REST API, which provides the device list and enables actions like status changes.
	•	DeviceService: Service that facilitates backend communication, offering methods like getDevices(), toggleDeviceById(), deleteDevice(), etc.
	•	Socket.IO: Real-time event management with the server via WebSocket for immediate device updates in the interface.

Project Structure
	•	device-list.component: Main component for the device list, responsible for rendering and managing the state of devices and filters.
	•	device.service: Service responsible for HTTP calls to the backend, retrieving and updating device data.
	•	socket.service: Service for handling WebSocket connections and listening to real-time device status change events.

How to Run the Project

Prerequisites
	•	Node.js and Angular CLI installed.
	•	Backend server available at the specified URL (http://localhost:3000).

Steps
	1.	Install dependencies:

npm install


	2.	Start the development server:

ng serve


	3.	Access the application:
Open your browser and go to http://localhost:4200.

Note

For WebSocket functionality to work correctly, the backend server must be running and accessible at http://localhost:3000.

This README provides an overview of the application’s main features and technologies, allowing new developers to quickly understand how to start and contribute to the project.