import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Output() latitudeEvent = new EventEmitter<number>();
  @Output() logitudeEvent = new EventEmitter<number>();

  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map: any;
  marker: any;
  isMapAvailable: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    if (!this.isGoogleMapsReady()) {
      this.isMapAvailable = false;
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const currentPosition = this.latitude == 0 && this.longitude == 0
            ? new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            : new google.maps.LatLng(this.latitude, this.longitude);
          this.renderMap(currentPosition);
        },
        () => {
          const defaultPosition = this.latitude != 0 && this.longitude != 0
            ? new google.maps.LatLng(this.latitude, this.longitude)
            : new google.maps.LatLng(38.652997388, -27.218665792);
          this.renderMap(defaultPosition);
        }
      );
    } else {
      const defaultPosition = this.latitude != 0 && this.longitude != 0
        ? new google.maps.LatLng(this.latitude, this.longitude)
        : new google.maps.LatLng(38.652997388, -27.218665792);
      this.renderMap(defaultPosition);
    }
  }

  private isGoogleMapsReady(): boolean {
    return typeof google !== 'undefined'
      && !!google.maps
      && typeof google.maps.Map === 'function'
      && typeof google.maps.Marker === 'function'
      && typeof google.maps.LatLng === 'function';
  }

  private renderMap(position: any): void {
    try {
      const mapOptions = {
        center: position,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

      this.marker = new google.maps.Marker({
        position,
        map: this.map,
        title: 'Marcador'
      });

      this.map.addListener('click', (event: any) => {
        if (!event.latLng) return;
        this.marker.setPosition(event.latLng);
        this.latitudeEvent.emit(event.latLng.lat());
        this.logitudeEvent.emit(event.latLng.lng());
      });
    } catch (error) {
      console.error('Failed to initialize Google Maps.', error);
      this.isMapAvailable = false;
    }
  }
}
