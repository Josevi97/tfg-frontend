import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/routed/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/routed/home/home.component';
import { AlertComponent } from './components/unrouted/alert/alert.component';
import { BackgroundComponent } from './components/unrouted/background/background.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloseButtonComponent } from './components/unrouted/close-button/close-button.component';
import { IconsService } from './services/icons/icons.service';
import { InitSessionComponent } from './components/unrouted/init-session/init-session.component';
import { RegisterAccountComponent } from './components/unrouted/register-account/register-account.component';
import { MenuComponent } from './components/unrouted/menu/menu.component';
import { SettingsComponent } from './components/routed/settings/settings.component';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		HomeComponent,
		AlertComponent,
		BackgroundComponent,
		CloseButtonComponent,
		InitSessionComponent,
  RegisterAccountComponent,
  MenuComponent,
  SettingsComponent,
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
	],
	providers: [IconsService],
	bootstrap: [AppComponent],
})
export class AppModule {}
