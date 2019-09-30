import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', loadChildren: './home/home.module#HomePageModule', canLoad: [AuthGuard]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'confirm-password', loadChildren: './confirm-password/confirm-password.module#ConfirmPasswordPageModule' },
  { path: 'confirm-email', loadChildren: './confirm-email/confirm-email.module#ConfirmEmailPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
