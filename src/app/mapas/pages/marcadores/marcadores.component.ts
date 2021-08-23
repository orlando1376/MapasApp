import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMarcador {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      height: 100%;
      width: 100%;
    }
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li {
      cursor: pointer;
    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-74.09991777553728, 4.705410590201224];
  marcadores: ColorMarcador[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',

      // inicializar en una posición
      center: this.center, // longitud, latitud
      zoom: this.zoomLevel
    });

    this.obtenerMarcadores();

    // new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );

    // otro ejemplo agregando marcador personalizado con un elemento HTML
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Esto es un marcador.';
    // new mapboxgl.Marker({ element: markerHtml })
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );

  }

  irMarcador( marker: mapboxgl.Marker ) {    
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    // draggable: true hace que se pueda mover el marcador
    const nuevoMarcador = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat( this.center )
      .addTo( this.mapa );

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadores();

    // listener que escucha cuando termina de moverse el marcador y luego se manda a guardar
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadores();
    })    
  }

  guardarMarcadores() {
    const lngLatArr: ColorMarcador[] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro: [ lng, lat ]
      })
    })

    localStorage.setItem( 'marcadores', JSON.stringify(lngLatArr) );
  }
 
  obtenerMarcadores() {
    if ( !localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: ColorMarcador[] = JSON.parse( localStorage.getItem('marcadores')! );

    lngLatArr.forEach( m => {
      const nuevoMarcador = new mapboxgl.Marker({
        color: m.color,
        draggable: true
        })
        .setLngLat( m.centro! )
        .addTo( this.mapa );
      
      this.marcadores.push({
        marker: nuevoMarcador,
        color: m.color
      });

      // listener que escucha cuando termina de moverse el marcador y luego se manda a guardar
      nuevoMarcador.on('dragend', () => {
        this.guardarMarcadores();
      })
    })
  }

  borrarMarcador( i: number ) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice( i, 1 );
    this.guardarMarcadores();
  }
}
