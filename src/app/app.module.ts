import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { TodosService } from './services/todos.service';
import { FocusDirective } from './directives/focus.directive';
import { MyFilterPipe } from './my-filter.pipe';

@NgModule({
  declarations: [
   	AppComponent,
		AccueilComponent,
		TodosComponent,
		TodoComponent,
		FocusDirective,
		MyFilterPipe
  ],
  imports: [
   	BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
