import { ComponentFactory, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/routed/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/unrouted/alert/alert.component';
import { BackgroundComponent } from './components/unrouted/background/background.component';
import { IconsService } from './services/icons/icons.service';
import { InitSessionComponent } from './components/unrouted/init-session/init-session.component';
import { RegisterAccountComponent } from './components/unrouted/register-account/register-account.component';
import { MenuComponent } from './components/unrouted/menu/menu.component';
import { SettingsComponent } from './components/routed/settings/settings.component';
import { PopupComponent } from './components/unrouted/popup/popup.component';
import { VotesComponent } from './components/unrouted/votes/votes.component';
import { SortComponent } from './components/unrouted/sort/sort.component';
import { AdminComponent } from './components/routed/admin/admin.component';
import { ListEndComponent } from './components/unrouted/list-end/list-end.component';
import { CopyrightComponent } from './components/unrouted/copyright/copyright.component';
import { NotFoundComponent } from './components/routed/not-found/not-found.component';
import { AsideDetailsComponent } from './components/unrouted/aside-details/aside-details.component';
import { MainComponent } from './components/routed/main/main.component';
import { SessionService } from './services/session/session.service';
import { AccountsService } from './services/accounts/accounts.service';
import { EntrancesService } from './services/entrances/entrances.service';
import { CommunitiesService } from './services/communities/communities.service';
import { ErrorService } from './services/error/error.service';
import { ComponentFactoryService } from './services/componentFactory/component-factory.service';
import { DatePipe } from './pipes/date/date.pipe';
import { VotePipe } from './pipes/vote/vote.pipe';
import { PostsService } from './services/posts/posts.service';
import { PostComponent } from './components/unrouted/post/post.component';
import { FollowPipe } from './pipes/follow/follow.pipe';
import { CiteComponent } from './components/unrouted/cite/cite.component';
import { LocationService } from './services/location/location.service';
import { EntityComponent } from './components/unrouted/entity/entity.component';
import { EntitiesService } from './services/entities/entities.service';
import { PinspectComponent } from './components/unrouted/pinspect/pinspect.component';

@NgModule({
	declarations: [
		AppComponent,

		AlertComponent,
		BackgroundComponent,
		InitSessionComponent,
		RegisterAccountComponent,
		MenuComponent,
		PopupComponent,
		PostComponent,
		VotesComponent,
		SortComponent,
		EntityComponent,
		ListEndComponent,
		CopyrightComponent,
		AsideDetailsComponent,

		AuthComponent,
		MainComponent,
		SettingsComponent,
		AdminComponent,
		NotFoundComponent,
		DatePipe,
		VotePipe,
		FollowPipe,
		CiteComponent,
  PinspectComponent,
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [
		ComponentFactoryService,
		ErrorService,
		SessionService,
		AccountsService,
		EntrancesService,
		CommunitiesService,
		IconsService,
		PostsService,
		LocationService,
		EntitiesService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
