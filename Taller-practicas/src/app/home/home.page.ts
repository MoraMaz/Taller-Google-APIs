import { Component, OnInit } from '@angular/core';

declare var google;

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  origin = { lat: 14.641798, lng: -90.513380 }; // Parque Central
  destination = { lat: 14.588094, lng: -90.553459 }; // Facultad de ingeniería USAC

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });
  
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }  

  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.origin,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }
  
  wayPoints: WayPoint[] = [
    {
      location: { lat: 14.601377, lng: -90.518785 }, // Plazuela España
      stopover: true,
    },
    {
      location: { lat: 14.609184, lng: -90.523772 }, // Parque de la Industria
      stopover: true,
    },
    {
      location: { lat: 14.613046, lng: -90.535815 }, // Trébol
      stopover: true,
    },
  ];

}
