
<h2 align="center">:tada: PetriSim [Title] :tada:</h2>
![image](doc/browser_Kopie2.svg)

![CI](https://github.com/PetriSim/petri-sim-tool/actions/workflows/cypress.yml/badge.svg)
![CI](https://github.com/PetriSim/petri-sim-tool/actions/workflows/dockerCompose.yml/badge.svg)


## :rocket: Introduction

Description:

........

........

.......

## 📦️ Components
PetriSim consists of multiple components 

.....

......

......

### 📦️ Discovery Tool (Simod)
describe the API and the API-calls

### 📦️ Simulator (Scylla)
describe the API and the API-calls

### 📦️ PetriSim Frontend 
- React
- Chakra-Ui

 
### :heavy_plus_sign: Possible extension of the tool  
- Add other simulators and discovery tools

## :technologist: Getting started 

### :star: Run with Docker (recommended) :star:
In order to run out tool with all related components, we recommend to run it by using docker compose.

:exclamation: Prerequisites:
- Docker installed

1. Make sure that docker is running 

2. Clone the repository
```console
git clone https://github.com/PetriSim/petri-sim-tool.git
```

3. Go to the project directory
```console
cd petri-sim-tool 
```

3. Start the docker containers by using docker compose

```console
docker-compose -f docker-compose.yml up -d
```

Docker compose will start the frontend, the discovery tool and the simulator. Alternatively you can run each docker container seperately.


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
