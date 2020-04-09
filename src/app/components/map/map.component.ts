import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-map, [app-map]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  geocoder: google.maps.Geocoder;
  private lat: number;
  private lng: number;
  private coordinates: google.maps.LatLng;
  private mapOptions: google.maps.MapOptions;
  private marker: google.maps.Marker;
  private searchMarker: google.maps.Marker;
  public userAddress: string;
  private searchAddress: string;

  constructor() {
    this.lat = 40.448318;
    this.lng = -3.648065;
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      zoom: 17,
      disableDefaultUI: true,
      streetViewControl: true,
      zoomControl: true
    };
    this.marker = new google.maps.Marker({
      position: this.coordinates,
    });
    this.userAddress = '';
    this.searchAddress = '';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.geocoder = new google.maps.Geocoder();
  }

  getAddress() {
    this.searchAddress = this.userAddress;
    console.log(this.searchAddress);
    this.geocoder.geocode( { address: this.searchAddress}, (results, status) => {
      if (status === 'OK') {
       // this.map.setCenter(results[0].geometry.location);
        this.searchMarker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location,
          animation: google.maps.Animation.DROP
        });
        const bounds =  new google.maps.LatLngBounds();
        const loc = new google.maps.LatLng(this.searchMarker.getPosition().lat(), this.searchMarker.getPosition().lng());
        bounds.extend(loc);
        bounds.extend(this.coordinates);
        this.map.fitBounds(bounds);
        this.map.panToBounds(bounds);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
