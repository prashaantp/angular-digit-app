import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from './subscription';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubscriptionService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private subscriptionsUrl = 'api/subscriptions';

  constructor(private http: Http) { }

  public findByEmail(email: string): Promise<Subscription[]> {
    return this.http.get(`${this.subscriptionsUrl}?email=${email}`)
      .toPromise()
      .then((response: Response) => response.json().data as Subscription[])
      .catch(this.handleError);
  }

  public updateSubscription(subscription: Subscription): Promise<Subscription> {
    return this.http.put(this.subscriptionsUrl, JSON.stringify(subscription), { headers: this.headers })
      .toPromise()
      .then((response: Response) => response.json().data as Subscription)
      .catch(this.handleError);
  }

  public createSubscription(subscription: Subscription): Promise<Subscription> {
    return this.http.post(this.subscriptionsUrl, JSON.stringify(subscription), { headers: this.headers })
      .toPromise()
      .then((response: Response) => response.json().data as Subscription)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in subscription service', error);
    return Promise.reject(error.message || error);
  }
}
