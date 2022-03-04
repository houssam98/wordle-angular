import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndPageComponent } from './pages/end-page/end-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'game',
    component: GamePageComponent
  },
  {
    path: 'end',
    component: EndPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
