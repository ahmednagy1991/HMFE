import { Component, Input } from '@angular/core';
import { HeatControlService } from '../../../Service/heat-control.service';
import { FanModel } from '../../../Models/FanModel';
@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on;ControlFan()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  fan: FanModel;
  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

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
  }

  ControlFan() {
    this.cont.Fan1(this.on).subscribe(res => {
      this.fan = res as FanModel;
    });

  }
}
