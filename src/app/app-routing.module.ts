import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './auth/login/login.module#LoginPageModule' },
  //{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  //{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile-information', loadChildren: './auth/profile-information/profile-information.module#ProfileInformationPageModule' },
  { path: 'signup', loadChildren: './auth/signup/signup.module#SignupPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
