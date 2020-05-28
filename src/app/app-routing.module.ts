import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { BlogComponent } from './blog/blog.component';
import { LogInComponent } from './log-in/log-in.component';
import { SettingsComponent } from './settings/settings.component';
import { PhotosComponent } from './photos/photos.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent},
  { path: 'user/:id', component: UserComponent,
    children: [
      { path: 'user-list', component: UserListComponent },
      { path: 'blog/:id', component: BlogComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'photos', component: PhotosComponent }
    ]}
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
