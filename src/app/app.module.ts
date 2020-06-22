import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { BlogComponent } from './blog/blog.component';
import { SettingsComponent } from './settings/settings.component';
import { PhotosComponent } from './photos/photos.component';
import { UserListComponent } from './user-list/user-list.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { ReportListComponent } from './report-list/report-list.component';
import { MyPipe, PostPipe } from './user-list/user-list.pipe';
import { AdminComponent } from './admin/admin.component';
import { CzatComponent } from './czat/czat.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LogInComponent,
    BlogComponent,
    SettingsComponent,
    PhotosComponent,
    UserListComponent,
    RegistrationComponent,
    ReportListComponent,
    MyPipe,
    PostPipe,
    AdminComponent,
    CzatComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    MyPipe,
    PostPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
