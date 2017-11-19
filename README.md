## Running the application

chat-demo-app relies on MySQL DBMS and node.js environment. In order to connect with a database, `.env` file has to be created and filled with database configuration.

```
cp .env.example .env
```

After .env is filled with a correct MySQL configuration, the following commands sould be used to run the app:

```
npm install release
npm run migrations
npm run server
```

At this point, assuming that the above commands succeeded, the chat sould be reachable at address `localhost:3000`.  


## Development

Server application is written using ES6 standard and should run directly on node ^6.0.0.

Scripts for client-side do also use ES6, but for compatibility reasons it is transpiled with babel.
Transpilation is done with use of __gulp__. Watching and transription can be started by following command:

```
sudo npm install gulp -g
gulp
```

Whereas single transpilation can be run with:
```
npm run build
```

For tests I used __ava__ test framework. Watching files and running tests:

```
sudo npm install ava -g
npm run test-watch
```

Single test run:
```
npm run test
```
