import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WaitIconComponent } from './components/wait-icon/wait-icon.component';
import { FichaPacienteComponent } from './components/ficha-paciente/ficha-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    WaitIconComponent,
    FichaPacienteComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
