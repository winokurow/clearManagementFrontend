import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AuthGuard } from './shared/auth/auth.guard';
import { RegistrationService } from './shared/services/registration/registration.service';
import { TasksService } from './shared/services/tasks/tasks.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Register } from 'src/app/register/register';
import { Login } from 'src/app/login/login';
import { TasksList } from 'src/app/tasks/tasks-list/tasks-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { Home } from 'src/app/home/home';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptorService } from 'src/app/shared/services/request-interceptor.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TasksAdministration } from 'src/app/tasks/administration/tasks-administration';
import { ConfirmationDialog } from './shared/delete-task-confirm-dialog/confirmation-dialog';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
@NgModule({
  declarations: [
    AppComponent,
    Home,
    Register,
    Login,
    TasksList,
    AlertComponent,
    TasksAdministration
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [AuthService, RegistrationService, TasksService, AlertService, UserService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
