# geslub-platform-session

Librería de manipulación de sesión de usuario entre subdominios de Geslub.

## Instalación

En terminal:

    npm install git+https://github.com/Belray-Ventec/geslub-platform-session.git

## Uso

```js
import GeslubSession from "geslub-platform-session";

const Session = new GeslubSession();

if (Session.isSession()) {
    // Si existe una sesión de usuario activa...

    const session = Session.getSession(); // Se obtiene los datos de la sesión

    const user = await Session.getUser(); // Se obtiene los datos del usuario de la sesión activa

} else {
    // Si no existe una sesión de usuario activa...

    window.location.href = Session.getLoginURL(<MI_SUBDOMINIO_GESLUB>); // Se redirige al usuario a la pagina de inicio de sesión de Geslub
}
```

## Configuraciones

```js
const Session = new GeslubSession(

    // 'id' es la id de la sesion
    id: "geslub-session" // default

    // 'domain' es el dominio en el que participa la sesión
    domain: "geslub.cl" // default

    // 'apiURL' es la URL base del sistema de apis
    apiURL: "https://api.geslub.cl" // default

    // 'loginURL' es la URL del inicio de sesión
    loginURL: "https://geslub.cl" // default

);
```
