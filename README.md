# loopback-component-socketio
[LoopBack](http://loopback.io) component to use [socket.io](https://socket.io).

## Description
loopback-component-socketio is a package to include socket.io in a loopback application, it was made with the purpose of
having certain model under socket.io real time interaction.
After installation you will notice two important changes in your application:
* New model created called "geoposition".
* Socket.io server is created when app start.

### Enabling the component
In order to use this component you need to enable it as any other component. Edit the file
``` project-dir/server/component-config.json ``` and include it.
```json
{
  "loopback-component-socketio": { 
  }
}
```

### Enabling "geoposition" model
You should have a new model generated after installation of this component, to start using "geoposition" model just enable it
as any other model. Edit the file ``` project-dir/server/model-config.json ``` and include it.
```json
{
  "geoposition": {
    "dataSource": "db",
    "public": true
  }
}
```
Remember to put the datasource of your preference.

### Using middleware
This component provides small security check to use socket.io, if your would like to have your socket just for authenticated
users then you need to add this option in component declaration. ``` project-dir/server/component.config.json ```
```json
{
  "loopback-component-socketio": {
    "authMiddleware": "true"
  }
}
```
Now each connection through your socket.io server needs to include an access_token from a logged user.
```js
let socket = io.connect("http://localhost:3000", {
    query: "accessToken=HJoJKPACAzWk4SRzsYsBzklXzCd2WIWA4TdYyvBgTzO1qCTtIajugh0D44D8lCx4"
});
```


