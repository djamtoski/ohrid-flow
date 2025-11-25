import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerPage } from './qr-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: QrScannerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QrScannerPage]
})
export class QrScannerPageModule {}

