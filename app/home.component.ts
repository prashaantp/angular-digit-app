import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id, // needed to resolve relative url in current module.
  selector: 'home-page',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriberEmail: string;
  paramsSubscription: any;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.subscriberEmail = params['email'];
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  showEditSubscriptionDetails(email: string) {
    this.router.navigate(['home/subscription-edit', { email: email }]);
  }
}
