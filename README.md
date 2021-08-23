# MapasApp

[Gracias a Fernando Herrera por este curso](https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24246646#questions)

En esta aplicación veremos el manejo de librerías escritas en JavaScript en TypeScript, usando mapas basados en [Mapbox](https://www.mapbox.com/) (el API es similar a la de Google Maps)

Algunos temas puntuales que veremos:

- Marcadores
- Eventos
- FlyTo
- Coordenadas geográficas
- Componentes para re-utilización de mapas
- Mantener objetos de forma persistente
- @types
- Zoom
- Range

## Instalación de mapbox

Los pasos para la instalación los podemos encontrar en [mapbox.com/install](https://www.mapbox.com/install/js/bundler-install/)

### Instalar pakete

``` code
npm install mapbox-gl --save
```

### Instalar CSS, enl index.html

``` code
<link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />
```

### Importar librería

``` code
import * as mapboxgl from 'mapbox-gl';
```

### Instalar tipado de librería

``` code
npm i --save-dev @types/mapbox-gl
```

### Adicionar mapa a la página

Reemplaza "YOUR_CONTAINER_ELEMENT_ID" con la Id de un elemento en tu página donde te gustaría ver el mapa.

``` code
(mapboxgl as any).accessToken = 'pk.eyJ1Ijoib3JsYW5kb2YxMzc2IiwiYSI6ImNrc2tkczh0bjA0dHIydnF6ZmVjaHZidHYifQ.Keu2PqVlj8oDj14H9N0pJQ';
var map = new mapboxgl.Map({
container: 'YOUR_CONTAINER_ELEMENT_ID',
style: 'mapbox://styles/mapbox/streets-v11'
});
```
