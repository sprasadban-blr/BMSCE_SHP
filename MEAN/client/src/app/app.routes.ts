import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Issues } from './pages/issues';
import { Report } from './pages/report';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'issues', component: Issues },
  { path: 'report', component: Report },
];
