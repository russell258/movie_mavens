import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { RegistrationComponent } from './security/registration/registration.component';
import { ReviewComponent } from './reviews/review/review.component';
import { MovieComponent } from './movies/movie/movie.component';
import { WriteComponent } from './reviews/write/write.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { UserComponent } from './users/user/user.component';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { PopularComponent } from './movies/popular/popular.component';
import { PlayingComponent } from './movies/playing/playing.component';
import { TopComponent } from './movies/top/top.component';
import { TrendingComponent } from './movies/trending/trending.component';
import { UpcomingComponent } from './movies/upcoming/upcoming.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'reviews', component: ReviewComponent},
  { path: 'movies', component: MovieComponent},
  { path: 'write/:id', component: WriteComponent},
  { path: 'about', component:AboutComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'user', component: UserComponent},
  { path: 'home', component: HomeComponent},
  { path: 'search', component: SearchComponent},
  { path: 'popular', component: PopularComponent},
  { path: 'playing', component: PlayingComponent},
  { path: 'top', component: TopComponent},
  { path: 'trending', component: TrendingComponent},
  { path: 'upcoming', component: UpcomingComponent},
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
