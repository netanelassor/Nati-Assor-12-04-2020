import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LocationModel } from 'src/app/components/weather/models/locations.model';
import { WeatherService } from 'src/app/components/weather/weather.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {
  searchControl = new FormControl();
  suggestedLocationList$: Observable<LocationModel[]>;
  selectedLocation: LocationModel;

  constructor(
    private weatherService: WeatherService
    ){ }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .subscribe((input) => {
        if (input.length >= 2) {
          this.suggestedLocationList$ = this.weatherService.getLocationSuggestion(input)
            .pipe(
              debounceTime(1000)
            );
        }
      });
  }

  displayFn(location: LocationModel) {
    if (location) { return location.LocalizedName; }
  }

  selectLocation(location: LocationModel) {
    this.selectedLocation = location;
    this.weatherService.setSelectedLocation(location);
  }

}
