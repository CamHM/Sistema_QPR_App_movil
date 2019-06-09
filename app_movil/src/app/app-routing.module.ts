import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: 'report',
        loadChildren: './home/report/report.module#ReportPageModule'
      }, {
        path: 'my-reports',
        loadChildren: './home/my-report/my-report.module#MyReportPageModule'
      },
      {
        path: 'reports-wall',
        loadChildren: './home/reports-wall/reports-wall.module#ReportsWallPageModule'
      }
    ]
  },
  { path: 'camera', loadChildren: './home/report/camera/camera.module#CameraPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
