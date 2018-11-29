import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashbord/dashbord.module#DashbordPageModule' },
  { path: 'home', loadChildren: './../home/home.module#HomePageModule' },
  { path: 'add-event', loadChildren: './../add-event/add-event.module#AddEventPageModule' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
