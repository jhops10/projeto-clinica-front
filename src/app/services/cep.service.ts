import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosCEP } from '../model/DadosCEP';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  public buscarCEP(cep: string): Observable<DadosCEP> {
    return this.http.get<DadosCEP>('https://viacep.com.br/ws/' + cep + '/json');
  }
}
