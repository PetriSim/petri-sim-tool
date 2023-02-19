
<h2 align="center">:tada: PetriSim [Parametrization of Business Process Simulation] :tada:</h2>

![image](doc/screenshot.png)

![CI](https://github.com/PetriSim/petri-sim-tool/actions/workflows/CI.yml/badge.svg)



## :rocket: Introduction


PetriSim is parametrization and scenario definition tool. It can be used as an intermediary between process discovery tool and business process simulator. User interface allows manual parameter editing and integrated API provides smooth use experience between process discovery and simulation.




## 📦️ Components
User interface represented by: 
 - StartView
 - Model-based Parameters Page
 - Scenario Page
 - Resource Page
 
 The application is connected to the discovery tool - Simod and Business Process Sumulator - Scylla
 
 Below software architecture is represented.

![image](https://user-images.githubusercontent.com/116650351/219905608-2426b477-2469-48eb-b0cd-48032be0797d.png)


### 📦️ Discovery Tool (Simod)   (Tutku/Alex)

Simod integration into PetriSim is still under work and dockerfile needs to be created.

The Simod repository (https://github.com/AutomatedProcessImprovement/Simod) contains two projects, Simod and Simod HTTP, which is created by University of Tartu, Estonia. Simod HTTP is a lightweight web service wrapper around Simod that supports queued job execution. 

Simod HTTP README.md section is available here, https://github.com/AutomatedProcessImprovement/Simod#simod-http.

Simod HTTP source code is located here, https://github.com/AutomatedProcessImprovement/Simod/tree/master/src/simod_http. 

Docker images are available there, https://hub.docker.com/r/nokal/simod-http/tags or https://hub.docker.com/layers/nokal/simod-http/tu-berlin/images/sha256-2cc67052c748a78c610f619778b119af455d7c5027a983295254f6b7c8d574f6?context=explore

### 📦️ Simulator (Scylla) (Andre/Alex)
describe the API and the API-calls


### 📦️ PetriSim frontend (Furat)
The frontend of our web application has been built using the Javascript library React. We have also utilized the Chakra-UI design framework to ensure a modern look for our website. To facilitate deployment and portability, the frontend has been containerized using Docker. 

With Docker Compose, the frontend can be easily connected to different discovery tools and simulators, although currently the other tools are not finished and hence not connected to the frontend. Instead, we are using a mock server called "backend" which has been written in Javascript and Express to simulate the backend and the API calls between the frontend and the other tools.

To ensure a streamlined development process, we have set up a continuous integration (CI) pipeline with Github Actions. This automates the testing and containerizing of the frontend every time changes are pushed to the Github repository. This ensures that the code is always up-to-date and that any errors are caught early on. 

The starting point for the frontend is the App.jsx file, which serves as the entry point to our application. Depending on whether a parameterization session has already been started or not, either the starting page (StartView.jsx) is loaded, or the tool dashboard is displayed.
The tool dashboard always consists of two main components: a navigation panel on the left side (Navigation.jsx), and a content display component. The content of the page is loaded dynamically based on the route path, which is defined in the App.jsx file. Additionally, depending on the page being accessed, there is a sidebar on the right side of the screen (EditorSidebar.jsx), which contains input fields for editing the parameters of the page.

The frontend utilizes the browser's localStorage and sessionStorage to store data. The sessionStorage stores information about whether a session has already started and which project is currently selected. On the other hand, the localStorage stores all data for each project, including updates of the tool parameters, which are automatically transferred to the localStorage.



## :technologist: Getting started (Furat)

### :star: Run with Docker (recommended) :star:
In order to run out tool with all related components, we recommend to run it by using docker compose.

:exclamation: Prerequisites:
- Docker installed
- Git installed

1. Make sure that docker is started and running (check at the dashboard)

2. Clone the repository
```console
git clone https://github.com/PetriSim/petri-sim-tool.git
```

3. Navigate into the project directory
```console
cd petri-sim-tool 
```

3. Start the docker containers by using docker compose

```console
docker-compose -f docker-compose.yml up -d
```

Docker compose will start the frontend, the discovery tool and the simulator together. Alternatively you can run each docker container seperately.


### Run from source

:exclamation: Prerequisites:
- Git installed
- Npm installed
- Node installed


3. Clone git repository

```console
git clone https://github.com/PetriSim/petri-sim-tool.git
```

4. Go to the project directory

```console
cd petri-sim-tool 
```

5. run: 

```console
npm install
```

In order to install all packages successfully, it may be necessary to include the --legacy-peer-deps flag.

```console
npm install --legacy-peer-deps
```


6. run:
```console
npm start
```

### 🚨 Troubleshooting (Furat)
* Please be patient, especially the first time, if the page takes a long time to load.

#### Problems related to docker compose 
* Make sure all ports that are used in the docker compose file are not used by other programs.
* You can download the docker containers separately and start them:

1. Download the frontend:

```console
docker pull ghcr.io/petrisim/frontend:latest
```

2. Download the other tools / backend:

```console
docker pull ghcr.io/petrisim/backend:latest
```

3. Start the frontend:
```console
docker run -dp 3000:3000 ghcr.io/petrisim/frontend:latest
```

4. Start the backend: 
```console
docker run -dp 8000:8000 ghcr.io/petrisim/backend:latest
```

#### Problems related to running the program from the source
* If your are not able to install the node dependencies with npm install from the root directory, navigate to the backend and frontend directory seperately and do the install (and start) from there 

