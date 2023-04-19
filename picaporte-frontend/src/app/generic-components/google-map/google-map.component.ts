import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';

declare var google: any; // Add this line to declare the 'google' variable

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {

  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Output() latitudeEvent = new EventEmitter<number>();
  @Output() logitudeEvent = new EventEmitter<number>();

  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map!: google.maps.Map;
  marker!: google.maps.Marker;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          let currentPosition;
          if (this.latitude != 0 && this.longitude != 0) {
            currentPosition = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
          } else {
            currentPosition = new google.maps.LatLng(
              this.latitude,
              this.longitude
            );
          }

          const mapOptions: google.maps.MapOptions = {
            center: currentPosition,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };

          this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

          if (this.latitude != 0 && this.longitude != 0) {
            const markerPosition = new google.maps.LatLng(
              this.latitude,
              this.longitude
            );
            this.marker = new google.maps.Marker({
              position: markerPosition,
              map: this.map,
              title: 'Marcador'
            });
          } else {
            this.marker = new google.maps.Marker({
              position: currentPosition,
              map: this.map,
              title: 'Marcador'
            });
          }
    
          this.map.addListener('click', event => {
            this.marker.setPosition(event.latLng);
            this.latitudeEvent.emit(event.latLng.lat());
            this.logitudeEvent.emit(event.latLng.lng());
          });
        },
        () => {
          // Handle geolocation error (e.g., user denied permission)
          console.error('Error obtaining user location.');

          let defaultPosition;
          if (this.latitude != 0 && this.longitude != 0) {
            defaultPosition = new google.maps.LatLng(
              this.latitude,
              this.longitude
            );
          } else {
            defaultPosition = new google.maps.LatLng(38.652997388, -27.218665792);
          }

          const mapOptions: google.maps.MapOptions = {
            center: defaultPosition,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };

          this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

          if (this.latitude != 0 && this.longitude != 0) {
            const markerPosition = new google.maps.LatLng(
              this.latitude,
              this.longitude
            );
            this.marker = new google.maps.Marker({
              position: markerPosition,
              map: this.map,
              title: 'Marcador'
            });
          } else {
            this.marker = new google.maps.Marker({
              position: defaultPosition,
              map: this.map,
              title: 'Marcador'
            });
          }
    
          this.map.addListener('click', event => {
            this.marker.setPosition(event.latLng);
            this.latitudeEvent.emit(event.latLng.lat());
            this.logitudeEvent.emit(event.latLng.lng());
          });
        }
      );
    } else {
      // Geolocation API is not supported by the browser
      console.error('Geolocation API not supported.');

      let defaultPosition;
      if (this.latitude != 0 && this.longitude != 0) {
        defaultPosition = new google.maps.LatLng(
          this.latitude,
          this.longitude
        );
      } else {
        defaultPosition = new google.maps.LatLng(38.652997388, -27.218665792);
      }

      const mapOptions: google.maps.MapOptions = {
        center: defaultPosition,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

      if (this.latitude != 0 && this.longitude != 0) {
        const markerPosition = new google.maps.LatLng(
          this.latitude,
          this.longitude
        );
        this.marker = new google.maps.Marker({
          position: markerPosition,
          map: this.map,
          title: 'Marcador'
        });
      } else {
        this.marker = new google.maps.Marker({
          position: defaultPosition,
          map: this.map,
          title: 'Marcador'
        });
      }

      this.map.addListener('click', event => {
        this.marker.setPosition(event.latLng);
        this.latitudeEvent.emit(event.latLng.lat());
        this.logitudeEvent.emit(event.latLng.lng());
      });
    }
  }
}
