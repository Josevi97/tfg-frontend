import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/routed/home/home.component';
import { AuthComponent } from './components/routed/auth/auth.component';
import { SessionResolver } from './resolvers/session.resolver';
import { SettingsComponent } from './components/routed/settings/settings.component';
import { EntranceComponent } from './components/routed/entrance/entrance.component';
import { AdminComponent } from './components/routed/admin/admin.component';
import { NotFoundComponent } from './components/routed/not-found/not-found.component';

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
		path: 'account/:account',
		component: HomeComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'community/:community',
		component: HomeComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'entrance/:entrance',
		component: EntranceComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'admin',
		component: AdminComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
