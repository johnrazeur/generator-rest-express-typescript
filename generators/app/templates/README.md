# <%= name %>

<%= description %>

## Quick Start

First modify the `ormconfig.json` file and put your database configuration.

```bash
# install deps
npm install

# run in development mode
# server will listen the 3000 port
npm run start

# run tests
npm run test
```
You can run it in debug mode:

```bash
npm run debug
```

## Default endpoint

This project comes with these endpoints:

`POST` /auth/login 
> Authenticate the user, return the auth token
```json
{
    username: "myusername",
    password: "mypassord"
}
```

`POST` /auth/login 
> Register the user
```json
{
    username: "myusername",
    password: "mypassord"
}
```

`POST` auth/change-password
> Change the user password, you need to put the auth token in the Authorization header

`Authorization: Bearer theauthtoken`
```json
{
    username: "myusername",
    password: "mypassord"
}
```

## Documentation

The swagger document is available at: http://localhost:3000

If you modify the endpoint documentation or add a new one, run the following command:
```bash
npm run swagger:generate
```

## Production

To build the production files:

```bash
npm run build

# start the server
node build/lib/server.js
```
## Docker

You can use docker during your developement process.
First, build the docker image:
```bash
docker build -t myapp .
```

And run it:
```bash
docker run -p 3000:3000 -v $(pwd):/usr/src/app myapp
```