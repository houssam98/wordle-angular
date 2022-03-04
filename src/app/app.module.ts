import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterComponent } from './components/letter/letter.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatchColorPipe } from './pipes/match-color.pipe';
import { GuessComponent } from './components/guess/guess.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { EndPageComponent } from './pages/end-page/end-page.component';
import { TriesNumberPipe } from './pipes/tries-number.pipe';

@NgModule({
  declarations: [
    AppComponent,

    // PAGE COMPONENTS
    HomePageComponent,
    GamePageComponent,
    EndPageComponent,

    // DUMB COMPONENTS
    LetterComponent,
    GuessComponent,
    KeyboardComponent,

    // PIPES
    MatchColorPipe,
    TriesNumberPipe
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
