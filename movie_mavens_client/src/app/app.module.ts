import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegistrationComponent } from './security/registration/registration.component';
import { LoginComponent } from './security/login/login.component';
import { UserComponent } from './users/user/user.component';
import { MovieComponent } from './movies/movie/movie.component';
import { WriteComponent } from './reviews/write/write.component';
import { ReviewComponent } from './reviews/review/review.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component'
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { MaterialModule } from './material.module';
import { PopularComponent } from './movies/popular/popular.component';
import { PlayingComponent } from './movies/playing/playing.component';
import { TopComponent } from './movies/top/top.component';
import { TrendingComponent } from './movies/trending/trending.component';
import { UpcomingComponent } from './movies/upcoming/upcoming.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserComponent,
    MovieComponent,
    WriteComponent,
    ReviewComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    SearchComponent,
    PopularComponent,
    PlayingComponent,
    TopComponent,
    TrendingComponent,
    UpcomingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
