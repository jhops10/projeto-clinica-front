import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicaToken } from 'src/app/model/ClinicaToken';
import { Usuario } from 'src/app/model/Usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public usuario: Usuario = new Usuario();
  public loading: boolean = false;
  public mensagem: string = '';

  public constructor(private route: Router, private service: LoginService) {}

  public logar() {
    this.loading = true;
    this.service.efetuarLogin(this.usuario).subscribe(
      (result: ClinicaToken) => {
        this.loading = false;
        localStorage.setItem('ClinicaToken', result.token);
        this.route.navigate(['main']);
      },
      (err: any) => {
        this.loading = false;
        this.mensagem = 'Usuário/Senha Inválidos';
      }
    );
  }
}
