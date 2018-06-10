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
import { UsersService } from './shared/services/users/users.service';
import { Home } from 'src/app/home/home';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptorService } from 'src/app/shared/services/request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    Register,
    Login,
    TasksList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [AuthService, RegistrationService, TasksService, UsersService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
