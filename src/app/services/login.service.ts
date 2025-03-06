import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { ClinicaToken } from '../model/ClinicaToken';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public efetuarLogin(usuario: Usuario): Observable<ClinicaToken> {
    return this.http.post<ClinicaToken>(environment.apiURL + '/login', usuario);
  }
}
