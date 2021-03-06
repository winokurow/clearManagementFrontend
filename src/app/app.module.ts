import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import { AuthGuard } from './shared/auth/auth.guard'
import { RegistrationService } from './shared/services/registration/registration.service'
import { TasksService } from './shared/services/tasks/tasks.service'
import { AuthService } from 'src/app/shared/auth/auth.service'
import { Register } from 'src/app/register/register'
import { Login } from 'src/app/login/login'
import { TasksList } from 'src/app/tasks/tasks-list/tasks-list'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { ROUTES } from './app.routes'
import { RouterModule } from '@angular/router'
import { Home } from 'src/app/home/home'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RequestInterceptorService } from 'src/app/shared/services/request-interceptor.service'
import { UserService } from 'src/app/shared/services/user/user.service'

import { TasksAdministration } from 'src/app/tasks/administration/tasks-administration'
import { MatDialogModule, MatSortModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AlertService } from 'src/app/shared/alert/alert.service'
import { AlertComponent } from 'src/app/shared/alert/alert.component'
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime'
import { UserStatistic } from './user/statistic/user-statistic'
import { HistoryService } from 'src/app/shared/services/history/history.service'
import { HouseholdService } from 'src/app/shared/services/household/household.service'
import { HouseholdStatistic } from 'src/app/statistic/household/household-statistic'
import { AssignTasks } from 'src/app/tasks/assign-tasks/assign-tasks'
import { AdminGuard } from 'src/app/shared/auth/admin.guard'
import { Wizard } from 'src/app/wizard/wizard'

@NgModule({
  declarations: [
    AppComponent,
    Home,
    Register,
    Login,
    TasksList,
    AlertComponent,
    TasksAdministration,
    UserStatistic,
    HouseholdStatistic,
    AssignTasks,
    Wizard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatDialogModule,
    MatSortModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,        // <----- import for date formating(optional) 
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [AuthService, RegistrationService, TasksService, AlertService,
    UserService, HistoryService, HouseholdService, AuthGuard, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptorService,
    multi: true,
  },  {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
