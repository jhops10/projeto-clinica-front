import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  public getTokenHeader(): any {
    let token = localStorage.getItem('ClinicaToken') || '';

    if (token == '') {
      this.router.navigate(['/']);
    }

    let header = {
      Authorization: token,
    };

    return header;
  }
}
