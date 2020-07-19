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
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  private lat: number;
  private lng: number;
  private coordinates: google.maps.LatLng;
  private mapOptions: google.maps.MapOptions;
  private marker: google.maps.Marker;
  public searchMarker: google.maps.Marker;
  public userAddress: string;
  public searchAddress: string;
  public isSearching: boolean;
  public travelModeConfig: object;
  public activeTravelMode: google.maps.TravelMode;
  public travelInstructions: {
    duration: string,
    steps: string[]
  };
  public isTravelInstructionsClose: boolean;

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
    this.isSearching = false;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.travelModeConfig = {
      transit: {
        name: google.maps.TravelMode.TRANSIT,
        icon: 'icon-directions_subway'
      },
      walking: {
      name: google.maps.TravelMode.WALKING,
        icon: 'icon-directions_walk'
      },
      driving: {
        name: google.maps.TravelMode.DRIVING,
        icon: 'icon-directions_car'
      }
    };
    this.activeTravelMode = google.maps.TravelMode.TRANSIT;
    this.isTravelInstructionsClose =  true;
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
    this.directionsRenderer.setMap(this.map);
  }

  getAddress(travelMode: google.maps.TravelMode = google.maps.TravelMode.TRANSIT) {
    if (!this.isSearching) {
      this.activeTravelMode = travelMode;
      this.isSearching = true;
      this.geocoder.geocode( { address: this.userAddress, region: 'es' }, (results, status) => {
        if (status === 'OK') {
          this.searchAddress = results[0].formatted_address;
          this.searchMarker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location,
            animation: google.maps.Animation.DROP
          });
          const bounds =  new google.maps.LatLngBounds();
          const addressLatLng = new google.maps.LatLng(this.searchMarker.getPosition().lat(), this.searchMarker.getPosition().lng());
          bounds.extend(addressLatLng);
          bounds.extend(this.coordinates);
          this.map.fitBounds(bounds);
          this.map.panToBounds(bounds);
          this.getRoute(addressLatLng, this.coordinates, travelMode);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
        this.isSearching = false;
      });
    }
  }

  getRoute(
    origin: google.maps.LatLng,
    destination: google.maps.LatLng,
    travelMode: google.maps.TravelMode = google.maps.TravelMode.TRANSIT
  ) {
    this.directionsService.route({origin, destination, travelMode}, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
        this.travelInstructions = {
          duration: result.routes[0].legs[0].duration.text,
          steps: result.routes[0].legs[0].steps.map(step => {
            return `${step.instructions} ${step.duration.text} (${step.distance.text})`;
          })
        };
      }
    });
  }

  deleteAddress() {
    this.searchAddress = '';
    this.userAddress = '';
    this.searchMarker.setMap(null);
  }

  toggleTravelInstructions() {
    this.isTravelInstructionsClose =  !this.isTravelInstructionsClose;
    console.log(this.isTravelInstructionsClose);
  }
}
