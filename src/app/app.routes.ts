import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth/auth.guard';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { TasksList } from './tasks/tasks-list/tasks-list';
import { TasksAdministration } from 'src/app/tasks/administration/tasks-administration';

export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'tasks/taskslist', component: TasksList, canActivate: [AuthGuard] },
  { path: 'tasks/administration', component: TasksAdministration, canActivate: [AuthGuard] },
  { path: '**',    component: Home }
];
