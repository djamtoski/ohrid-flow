import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/role-select',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'role-select',
        loadChildren: () => import('./auth/role-select/role-select.module').then(m => m.RoleSelectPageModule)
      },
      {
        path: 'login-owner',
        loadChildren: () => import('./auth/login-owner/login-owner.module').then(m => m.LoginOwnerPageModule)
      },
      {
        path: 'login-customer',
        loadChildren: () => import('./auth/login-customer/login-customer.module').then(m => m.LoginCustomerPageModule)
      }
    ]
  },
  {
    path: 'owner',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./owner/home/home.module').then(m => m.OwnerHomePageModule)
      },
      {
        path: 'qr-scanner',
        loadChildren: () => import('./owner/qr-scanner/qr-scanner.module').then(m => m.QrScannerPageModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./owner/customers/customers.module').then(m => m.CustomersPageModule)
      },
      {
        path: 'customer-detail/:id',
        loadChildren: () => import('./owner/customer-detail/customer-detail.module').then(m => m.CustomerDetailPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./owner/settings/settings.module').then(m => m.SettingsPageModule)
      }
    ]
  },
  {
    path: 'customer',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./customer/home/home.module').then(m => m.CustomerHomePageModule)
      },
      {
        path: 'loyalty-card',
        loadChildren: () => import('./customer/loyalty-card/loyalty-card.module').then(m => m.LoyaltyCardPageModule)
      },
      {
        path: 'qr-display',
        loadChildren: () => import('./customer/qr-display/qr-display.module').then(m => m.QrDisplayPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
