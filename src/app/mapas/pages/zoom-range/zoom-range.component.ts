import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container {
      height: 100%;
      width: 100%;
    }
    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-74.09991777553728, 4.705410590201224];

  constructor() { }

  ngOnDestroy(): void {
    // limpiar o destruir los listeners
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',

      // inicializar en una posición
      center: this.center, // longitud, latitud
      zoom: this.zoomLevel
    });

    // crear un listener
    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom();
    });

    // controlar que el zoom no sea mayor que 18, porque no se ve bien
    this.mapa.on('zoomend', () => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo(18);
      }
    });

    //movimiento del mapa
    this.mapa.on('move', (event) => {
      const {lng, lat} = event.target.getCenter();
      this.center = [lng, lat];
    })
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ) {
    this.mapa.zoomTo( Number(valor) )
  }
}
