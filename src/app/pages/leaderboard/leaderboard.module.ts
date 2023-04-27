import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardComponent } from './leaderboard.component';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CustomDatePipe } from '../../shared/pipes/custom-date.pipe';

@NgModule({
  declarations: [
    LeaderboardComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class LeaderboardModule { 

}
