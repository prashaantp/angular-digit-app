import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from './subscription';
import { SubscriptionService } from './subscription.service';

@Component({
    moduleId: module.id, // needed to resolve relative url in current module.
    templateUrl: 'subscription-edit.component.html'
})
export class SubscriptionEditComponent implements OnInit, OnDestroy {
    submittedEmail: string;
    subscription: Subscription;
    paramsSubsciption: any;

    constructor(private router: Router, private route: ActivatedRoute, private subscriptionService: SubscriptionService) {
    }

    ngOnInit() {
        this.paramsSubsciption = this.route.params.subscribe(params => {
            this.submittedEmail = params['email'];
            this.subscriptionService
                .findByEmail(this.submittedEmail)
                .then((result: Subscription[]) => this.subscription = (result && result.length > 0) ? result[0] : null);
        });
    }

    ngOnDestroy() {
        this.paramsSubsciption.unsubscribe();
    }

    updateSubscription(subscription: Subscription, subscriptionType: string, subscriptionDuration: number) {
        if (subscription) {
            if ('extend_subscription' === subscriptionType) {
                subscription.subscriptionDuration += subscriptionDuration;
            } else {
                subscription.subscriptionDuration = 0;
            }

            this.subscriptionService
                .updateSubscription(subscription)
                .then((subscription: Subscription) => { window.alert(`Updated subscription for ${subscription.email}`); });
        } else {
            subscription = new Subscription();
            subscription.email = this.submittedEmail;
            subscription.startDate = new Date();
            subscription.subscriptionDuration = subscriptionDuration;

            this.subscriptionService
                .createSubscription(subscription)
                .then((subscription: Subscription) => { window.alert(`Created subscription for ${subscription.email}`); });
        }
    }
}
