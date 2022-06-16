import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FhirUtilService } from '@red-probeaufgabe/search';
import { IFhirPatient, IFhirPractitioner, IPreparedIFhirPatient, IPreparedIFhirPractitioner } from '@red-probeaufgabe/types';

@Component({
  selector: 'app-imprint',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: []
})
export class DetailComponent {

  public dialogData;
  public preparedData: IPreparedIFhirPatient | IPreparedIFhirPractitioner;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IFhirPatient|IFhirPractitioner,public util: FhirUtilService) {
    this.preparedData = FhirUtilService.prepareData(data)
    this.dialogData = JSON.stringify(this.preparedData, null, 4);
    console.log(JSON.stringify(this.data, null, 4));
  }

}
