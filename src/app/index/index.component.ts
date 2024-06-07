import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import '../lit/weather-widget'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndexComponent {
  coordinates: GeolocationCoordinates | undefined;
  gotCoordinates: boolean = false;

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(location => {
      this.coordinates = location.coords;
      this.gotCoordinates = true;
    }, error => {
      console.log(error);
    })
  }
}
