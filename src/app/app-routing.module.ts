import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/routed/home/home.component';
import { AuthComponent } from './components/routed/auth/auth.component';
import { SessionResolver } from './resolvers/session.resolver';
import { SettingsComponent } from './components/routed/settings/settings.component';
import { CommunityComponent } from './components/routed/community/community.component';
import { AccountComponent } from './components/routed/account/account.component';
import { CommunitiesComponent } from './components/routed/communities/communities.component';
import { AccountsComponent } from './components/routed/accounts/accounts.component';
import { EntranceComponent } from './components/routed/entrance/entrance.component';
import { AdminComponent } from './components/routed/admin/admin.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'auth',
		component: AuthComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'settings',
		component: SettingsComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'communities',
		component: CommunitiesComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'accounts',
		component: AccountsComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'account/:account',
		component: AccountComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'entrance/:entrance',
		component: EntranceComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'community/:community',
		component: CommunityComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'admin',
		component: AdminComponent,
		resolve: { session: SessionResolver },
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
