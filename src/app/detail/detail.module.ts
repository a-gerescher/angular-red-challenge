import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, DetailRoutingModule],
  providers: [JsonPipe]
})
export class DetailModule {}
