import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/routed/auth/auth.component';
import { SessionResolver } from './resolvers/session.resolver';
import { SettingsComponent } from './components/routed/settings/settings.component';
import { AdminComponent } from './components/routed/admin/admin.component';
import { NotFoundComponent } from './components/routed/not-found/not-found.component';
import { MainComponent } from './components/routed/main/main.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: MainComponent,
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
		component: MainComponent,
		resolve: { session: SessionResolver },
	},
	{
		path: 'community/:community',
		component: MainComponent,
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
