import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './shared/auth/auth.guard'
import { Home } from './home/home'
import { Register } from './register/register'
import { Login } from './login/login'
import { TasksList } from './tasks/tasks-list/tasks-list'
import { TasksAdministration } from 'src/app/tasks/administration/tasks-administration'
import { UserStatistic } from './user/statistic/user-statistic'
import { HouseholdStatistic } from 'src/app/statistic/household/household-statistic'
import { AssignTasks } from 'src/app/tasks/assign-tasks/assign-tasks'
import { AdminGuard } from 'src/app/shared/auth/admin.guard'
import { Wizard } from 'src/app/wizard/wizard'

export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'tasks/taskslist', component: TasksList, canActivate: [AuthGuard] },
  { path: 'tasks/administration', component: TasksAdministration, canActivate: [AdminGuard] },
  { path: 'tasks/wizard', component: Wizard, canActivate: [AdminGuard] },
  { path: 'user/statistic', component: UserStatistic, canActivate: [AuthGuard] },
  { path: 'household/statistic', component: HouseholdStatistic, canActivate: [AuthGuard] },
  { path: 'household/assigntasks', component: AssignTasks, canActivate: [AdminGuard] },
  { path: '**',    component: Home }
]
