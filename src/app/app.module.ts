import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PageComponent } from './components/page/page.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { BalanceComponent } from './components/balance/balance.component';
import { ButtonComponent } from './components/button/button.component';
import { PageBarComponent } from './components/page-bar/page-bar.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleMainComponent } from './components/title-main/title-main.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';

const appRoutes : Routes = [
  {path: '', component: TransactionListComponent},
  {path: 'create-transaction', component: CreateTransactionComponent},
  {path: 'edit-transaction', component: EditTransactionComponent},		
]


@NgModule({
  declarations: [
    AppComponent,
    EditTransactionComponent,
    PageComponent,
    TimeSelectorComponent,
    BalanceComponent,
    ButtonComponent,
    PageBarComponent,
    TransactionListComponent,
    TransactionItemComponent,
    TitleMainComponent,
    MainContentComponent,
    CreateTransactionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
