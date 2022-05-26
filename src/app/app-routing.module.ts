import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThreadComponent } from './thread/thread.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ImprintComponent } from './imprint/imprint.component';
import { LeagalNoticeComponent } from './leagal-notice/leagal-notice.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signup',component:SignUpComponent},
  {path:'dashboard',component:DashboardComponent, // check AngularFireAuthGuard doc
  canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'channel/:id', component:ChannelComponent, canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'directMessage/:id', component:UserChatComponent,canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'forgotPassword', component:ForgotPasswordComponent},
  {path:'imprint', component:ImprintComponent},
  {path:'legalnotice', component:LeagalNoticeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
