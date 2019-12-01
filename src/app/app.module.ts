import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { EnvServiceProvider } from './env.service.provider';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { ErrorInterceptor } from './utils/error.interceptor';
import {ToastModule} from 'primeng/toast';
import { ToastComponent } from './toast/toast.component';
import { MessageService } from 'primeng/components/common/messageservice';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ProgressBarModule,
    ToastModule,
    ConfirmDialogModule
      
  ],
  providers: [
    EnvServiceProvider,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
