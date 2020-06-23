import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {BlogComponent} from './blog/blog.component';
import {LogInComponent} from './log-in/log-in.component';
import {SettingsComponent} from './settings/settings.component';
import {UserListComponent} from './user-list/user-list.component';
import {RegistrationComponent} from './registration/registration.component';
import {ReportListComponent} from './report-list/report-list.component';
import {AdminComponent} from './admin/admin.component';
import { CzatComponent } from './czat/czat.component';

const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'log-in', component: LogInComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'user-list', component: UserListComponent},
      {path: 'blog/:id', component: BlogComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'report-list', component: ReportListComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'czat', component: CzatComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
