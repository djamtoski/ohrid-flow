import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailPage } from './customer-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: CustomerDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerDetailPage],
  providers: [DatePipe]
})
export class CustomerDetailPageModule {}

