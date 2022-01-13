import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/routed/home/home.component';
import { AuthComponent } from './components/routed/auth/auth.component';
import { SessionResolver } from './resolvers/session.resolver';
import { SettingsComponent } from './components/routed/settings/settings.component';

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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
