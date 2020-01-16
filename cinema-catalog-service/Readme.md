### Commands

```sh
npm install          # setup node dependencies  
npm test             # unit test with mocha  
npm start            # starts the service  
npm run node-debug   # run the server in debug mode 
npm run chrome-debug # debug the node with chrome
npm run lint         # lint the code with standard
```

## Importing sample data into mongodb (docker-container)
### Copy the files one by one or we can zip it and pass the zip file

```sh
$ docker cp countries.json mongoNodeContainer:/tmp
$ docker cp state.json mongoNodeContainer:/tmp
$ docker cp city.json mongoNodeContainer:/tmp
$ docker cp cinemas.json mongoNodeContainer:/tmp
```

### Execute the below commands to load data into mongodb

```sh

$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection countries --file /tmp/countries.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'

$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection states --file /tmp/states.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'

$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection cities --file /tmp/cities.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'

$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection cinemas --file /tmp/cinemas.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'

```