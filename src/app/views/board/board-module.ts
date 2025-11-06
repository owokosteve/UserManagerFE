import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompMap } from './comp-map/comp-map';
import { WhiteBoard } from './white-board/white-board';
import { DrawingBoard } from './drawing-board/drawing-board';

import { BasicEj } from '../../commonComponents/basic-ej.modules';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CompMap,
    WhiteBoard,
    DrawingBoard,
  ],
  imports: [
    CommonModule,
    BasicEj,
    RouterModule.forChild([
      { path: '', component: DrawingBoard },
    ])
  ],
  exports: [
    DrawingBoard
  ],
})
export class BoardModule { }
