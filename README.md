
<h2 align="center">:tada: PetriSim [Parametrization of Business Process Simulation] :tada:</h2>

![image](doc/browser_Kopie2.svg)

![CI](https://github.com/PetriSim/petri-sim-tool/actions/workflows/CI.yml/badge.svg)



## :rocket: Introduction

Description (Lana): 

........

........

.......



## 📦️ Components
PetriSim consists of multiple components 

(Image of PetriSim and the other components)

......

......

### 📦️ Discovery Tool (Simod)   (Tutku/Alex)
describe the API and the API-calls

### 📦️ Simulator (Scylla) (Andre/Alex)
describe the API and the API-calls

### 📦️ PetriSim Frontend (Furat)
- React
- Chakra-Ui
- CI

 
### :heavy_plus_sign: Possible extension of the tool  (Andre,Alex,Tutku,Lana,Furat)
- Explain how to add other tools

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

1. Install node

2. Install npm 

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

6. run:
```console
npm start
```

### 🚨 Troubleshooting 

#### Problems related to docker compose (Furat)
* Make sure all ports that are used in the docker compose file are not used by other programs.

#### Problems related to running the program from the source (Furat)
* If your are not able to install the node dependencies with npm install from the root directory, navigate to the backend and frontend directory seperately and do the install (and run) from there 
