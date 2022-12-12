import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

declare global {
  interface Window {
    vtmapgl: any;
    Directions: any;
  }
}

@Component({
  selector: 'app-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.css']
})
export class FlexLayoutComponent implements OnInit{

  garages: Gara[] = [];

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    // Call Api
    const params = new HttpParams()
      .set('pageNumber', '1')
      .set('pageSize', '100000')
      .set('bookingDate', '2022-11-16 08:59:03.000Z')
      .set('bookingTime', '9:00')
      .set('maxDistance', '0')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'bearer 8a706116-5b99-406d-9745-417a4d80251b'
      }),
      params: params
    };

    this.http.get('http://demo.aggregatoricapaci.com:56789/cms/garage/to-booking',
      httpOptions).subscribe((data: any) => {
        data.content.forEach((element: any) => {
          this.garages.push(new Gara(element.latitude, element.longitude, element.name));
      })
      console.log(this.garages);
    })

    // Tao map
    console.log("window", window.vtmapgl, window);
    window.vtmapgl.accessToken = "d353070a772a526aa6bf282e766aef16";
    let map = new window.vtmapgl.Map({
      container: "map",
      style: window.vtmapgl.STYLES.VTRANS,
      center: [105.804817, 21.028511], // tọa độ trung tâm [lng, lat]
      zoom: 10
    });

    const geolocateControl = new window.vtmapgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      fitBoundsOptions: {
        maxZoom: 15
      },
      trackUserLocation: true
    });
    // Add geolocate control to the map.
    map.addControl(geolocateControl);

    // Thêm điều khiển Directions
    const direction : any = new window.Directions({
      accessToken: window.vtmapgl.accessToken,
      controls: {
        profileSwitcher: false
      },
      profile: 'driving'
    });
    console.log('Direction: ', direction);
    map.addControl(direction, 'top-left');
    map.on('click', () => {
      console.log(map.Marker);
    })

    // Add Gara to map
    map.on('load', () => {
      this.garages.forEach((garage: Gara) => {
        // Create popup
        const popup = new window.vtmapgl.Popup()
          .setHTML(`<span class="test" style="font-size: 20px;color: black">Test text</span>`);
        const el = document.createElement('div');
        el.innerHTML = '<div class="custom-marker"><img src="https://placekitten.com/g/50/50" style="width: 30px; height: 30px; border-radius: 50%;">' +
          '<span style="padding: 2px 4px; font-size: 12px; display: block; ">Gara</span>' +
          '</div>'
        const marker = new window.vtmapgl.Marker(el)
          .setLngLat([garage.lng, garage.lat])
          .setPopup(popup)
          .addTo(map);
        marker.getElement().addEventListener('click', (e: any) => {
          e.stopPropagation();
          marker.togglePopup();
          direction.setDestination([marker.getLngLat().lng, marker.getLngLat().lat]);
        });
      })
    })

  }
}

export class Gara {
  lat: String;
  lng: String;
  name: String
  constructor(lat: String, lng: String, name: String) {
    this.lat = lat;
    this.lng= lng;
    this.name = name;
  }
}
