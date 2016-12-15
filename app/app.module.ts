import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';
import { SubscriptionEditComponent } from './subscription-edit.component';

import { SubscriptionService } from './subscription.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule, InMemoryWebApiModule.forRoot(InMemoryDataService),],
  declarations: [AppComponent, HomeComponent, SubscriptionEditComponent],
  providers: [SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
