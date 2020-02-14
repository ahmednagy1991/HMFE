import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Temperature, TemperatureHumidityData } from '../../../@core/data/temperature-humidity';
import { takeWhile } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { HeatControlService } from '../../../Service/heat-control.service';
import { FanModel } from '../../../Models/FanModel';
import 'rxjs/add/observable/interval';
@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy {

  private alive = true;

  temperatureData: Temperature;
  temperature: number;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = 'heat';
  current_status=false;
  theme: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService, private cont: HeatControlService,
              private temperatureHumidityService: TemperatureHumidityData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.theme = config.variables.temperature;
    });
   
    forkJoin(
      this.temperatureHumidityService.getTemperatureData(),
      this.temperatureHumidityService.getHumidityData(),
    )
      .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
        debugger;
        this.temperatureData = temperatureData;
        this.temperature = this.temperatureData.value;

        this.humidityData = humidityData;
        this.humidity = this.humidityData.value;
      });
    cont.ReadTemp().subscribe(res => {
      this.temperature = (res as any).Temprature;
    });

    var sub = Observable.interval(3000)
      .subscribe((val) => {
        cont.ReadTemp().subscribe(res => {
          this.temperature = (res as any).Temprature;
        }); });
  }

  power()
  {
   
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
