import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { PosComponent } from './pos/pos.component';
import { PosVideoComponent } from './pos-video/pos-video.component';
import { CallbackComponent } from './auth/callback.component';
import { HomeComponent } from './home/home.component';

const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: 'review/:reviewId',
    component: ReviewComponent
  },
  {
    path: 'pos/video/:videoId',
    component: PosVideoComponent
  },
  {
    path: 'pos/:posId',
    component: PosComponent
  },
  {
    path: 'pos/:posId/:order',
    component: PosComponent
  },
  {
    path: 'pos/:posId/:order/:category',
    component: PosComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '**',
    component: HomeComponent
    // TODO: 建立 NotfoundComponent
  }
];

export const AppRoutingProviders: any[] = [

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
