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
import { CloseButtonComponent } from './components/unrouted/close-button/close-button.component';
import { IconsService } from './services/icons/icons.service';
import { InitSessionComponent } from './components/unrouted/init-session/init-session.component';
import { RegisterAccountComponent } from './components/unrouted/register-account/register-account.component';
import { MenuComponent } from './components/unrouted/menu/menu.component';
import { SettingsComponent } from './components/routed/settings/settings.component';
import { PopupComponent } from './components/unrouted/popup/popup.component';
import { EntranceComponent } from './components/unrouted/entrance/entrance.component';
import { EntranceComponent as REntranceComponent } from './components/routed/entrance/entrance.component';
import { VotesComponent } from './components/unrouted/votes/votes.component';
import { SortComponent } from './components/unrouted/sort/sort.component';
import { AccountDetailsComponent } from './components/unrouted/account-details/account-details.component';
import { CommunityComponent } from './components/routed/community/community.component';
import { AccountComponent } from './components/routed/account/account.component';
import { CommunitiesComponent } from './components/routed/communities/communities.component';
import { AccountsComponent } from './components/routed/accounts/accounts.component';
import { AdminComponent } from './components/routed/admin/admin.component';
import { ListEndComponent } from './components/unrouted/list-end/list-end.component';
import { CopyrightComponent } from './components/unrouted/copyright/copyright.component';
import { NotFoundComponent } from './components/routed/not-found/not-found.component';

@NgModule({
	declarations: [
		AppComponent,

		AlertComponent,
		BackgroundComponent,
		CloseButtonComponent,
		InitSessionComponent,
		RegisterAccountComponent,
		MenuComponent,
		PopupComponent,
		EntranceComponent,
		VotesComponent,
		SortComponent,
		AccountDetailsComponent,
		ListEndComponent,

		AuthComponent,
		HomeComponent,
		SettingsComponent,
		CommunityComponent,
		AccountComponent,
		REntranceComponent,
		CommunitiesComponent,
		AccountsComponent,
		AdminComponent,
  CopyrightComponent,
  NotFoundComponent,
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [IconsService],
	bootstrap: [AppComponent],
})
export class AppModule {}
