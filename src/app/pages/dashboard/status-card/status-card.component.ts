import { Component, Input } from '@angular/core';
import { HeatControlService } from '../../../Service/heat-control.service';
import { FanModel } from '../../../Models/FanModel';
import { Observable } from 'rxjs';
@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on;ControlFan()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-primary">
         <i class="nb-snowy-circled"></i>
        </div>
      </div>

      <div class="details">
        <div class="title h5">Temperature</div>
        <div class="value temperature h1">{{temperature}}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  fan: FanModel;
  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  
  temperature: number;
  constructor(private cont: HeatControlService) {
    cont.Fan1Status().subscribe(res => {
      this.fan = res as FanModel;
      if (this.fan.Fan_Status == 'ON') {
        this.on = true;
      }
      else if (this.fan.Fan_Status == 'OFF') {
        this.on = false;
      }
    });

    cont.ReadTemp().subscribe(res => {
      this.temperature = (res as any).Temprature;
    });
    var sub = Observable.interval(3000)
      .subscribe((val) => {
        cont.ReadTemp().subscribe(res => {
          this.temperature = (res as any).Temprature;
        });
      });
  }

  ControlFan() {
    this.cont.Fan1(this.on).subscribe(res => {
      this.fan = res as FanModel;
    });

  }
}
