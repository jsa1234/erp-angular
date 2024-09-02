import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-detail-pos-device',
  templateUrl: './detail-pos-device.component.html',
  styleUrls: ['./detail-pos-device.component.scss']
})
export class DetailPosDeviceComponent implements OnInit {
  imagePath$: Observable<string> ;
  posDevice: POSDevice;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPOSDeviceDetails()
  }

  getPOSDeviceDetails(): void {
    this.route.data.subscribe((data: { posDevice: POSDevice }) => {
      if (!data.posDevice) {
        return;
      }
      this.posDevice = data.posDevice
      this.imagePath$ = this.posDevice.imagePath?of(`${environment.apiUrl}${this.posDevice.imagePath}`): of(environment.dummyImage) 
    });
  }

}
