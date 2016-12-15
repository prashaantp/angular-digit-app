
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Subscription } from './subscription';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let subscriptions: Subscription[] = [
      { id: 1, email: 'prshntdp@gmail.com', startDate: new Date(), subscriptionDuration: 2 }
    ];
    return { subscriptions };
  }
}