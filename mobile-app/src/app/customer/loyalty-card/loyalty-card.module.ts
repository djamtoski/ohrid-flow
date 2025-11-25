import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { LoyaltyCardPage } from './loyalty-card.page';

const routes: Routes = [
  {
    path: '',
    component: LoyaltyCardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoyaltyCardPage]
})
export class LoyaltyCardPageModule {}

