import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsModule } from './contacts/contacts.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';

import { AlertService } from './services/alert.service';

const routes: Routes = [
	{ path: '', redirectTo: '/contacts', pathMatch: 'full' }
];

@NgModule({
	declarations: [
    	AppComponent,
    	AlertComponent
  	],
  	imports: [
    	BrowserModule,
		ContactsModule,
		RouterModule.forRoot(routes)
	],
	providers: [
		AlertService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
