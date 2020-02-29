import { DoCheck, KeyValueDiffers, KeyValueDiffer, Component, OnDestroy } from '@angular/core';
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
  differ: KeyValueDiffer<string, any>;
  temperatureData: Temperature;
  temperature: number=0;
  speed: number=0;
  temperatureOff = false;
  temperatureMode = 'cool';
  
  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = 'heat';
  current_status=false;
  theme: any;
  themeSubscription: any;

  
  constructor(private differs: KeyValueDiffers,private themeService: NbThemeService, private cont: HeatControlService,
              private temperatureHumidityService: TemperatureHumidityData) {
    this.differ = this.differs.find({}).create();

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.theme = config.variables.temperature;
     
    });
   
    

    // forkJoin(
    //   this.temperatureHumidityService.getTemperatureData(),
    //   this.temperatureHumidityService.getHumidityData(),
    // )
    //   .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
    //     debugger;
    //     this.temperatureData = temperatureData;
    //     //this.temperature = this.temperatureData.value;
    //     alert(this.temperature);
    //     this.humidityData = humidityData;
    //     this.humidity = this.humidityData.value;
    //   });
    // cont.ReadTemp().subscribe(res => {
    //   this.temperature = (res as any).Temprature;
    // });

    // var sub = Observable.interval(3000)
    //   .subscribe((val) => {
    //     cont.ReadTemp().subscribe(res => {
    //       this.temperature = (res as any).Temprature;
    //     }); });
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        var cur_speed = Math.round(item.currentValue);
        if(cur_speed<=10)
        {
          cur_speed=0;
        }
        this.cont.ControlVarFan(cur_speed).subscribe((res) => { });
        console.log('item changed', item);
      });
    }
  }
  
  changeSpeed()
  {
   
  //  alert("ok  ok ");
  }
  power(val)
  {
   alert(val);
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
