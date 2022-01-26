import { Injectable } from '@angular/core';
import { IEntity } from 'src/app/models/entities.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommunitiesService } from '../communities/communities.service';

@Injectable({
	providedIn: 'root',
})
export class InteractivityService {
	constructor(
		private accountsService: AccountsService,
		private communitiesService: CommunitiesService
	) {}

	calculateFollow(entity: IEntity, callback: Function): void {
		switch (entity.type) {
			case 'account':
				switch (entity.sessionFollow) {
					case -1:
					case 1:
						this.accountsService.followAccount(entity.id).subscribe(() => {
							entity.sessionFollow = 0;
							entity.followers++;
							callback(entity);
						});
						break;
					case 0:
						this.accountsService.unfollowAccount(entity.id).subscribe(() => {
							entity.sessionFollow--;
							entity.followers--;
							callback(entity);
						});
						break;
				}
				break;
			case 'community':
				switch (entity.sessionFollow) {
					case -1:
					case 1:
						this.communitiesService.followAccount(entity.id).subscribe(() => {
							entity.sessionFollow = 0;
							entity.followers++;
							callback(entity);
						});
						break;
					case 0:
						this.communitiesService.unfollowAccount(entity.id).subscribe(() => {
							entity.sessionFollow--;
							entity.followers--;
							callback(entity);
						});
						break;
				}
				break;
		}
	}
}
