import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Config } from '../Configurations/config';
@Injectable({
  providedIn: 'root'
})
export class HeatControlService {

  constructor(private httpClient: HttpClient) { }
  HEAT_CONTROLLER_ENDPOINT: string = "http://192.168.1.8";

  public Fan1(status) {

    if (status) {
      return this.httpClient.get(this.HEAT_CONTROLLER_ENDPOINT + "/fan?pin=13&val=1");
    }
    else {
      return this.httpClient.get(this.HEAT_CONTROLLER_ENDPOINT + "/fan?pin=13&val=0");
    }

  }

  public Fan1Status() {
    return this.httpClient.get(this.HEAT_CONTROLLER_ENDPOINT + "/fanStatus?pin=13");
  }

  public ReadTemp() {
    return this.httpClient.get(this.HEAT_CONTROLLER_ENDPOINT + "/temp");
  }

}
