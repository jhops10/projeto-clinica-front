import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichaPaciente } from 'src/app/model/FichaPaciente';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public lista: FichaPaciente[] = [];
  public keyword: string = '';
  public loading: boolean = false;
  public msgErro: string = '';
  public constructor(
    private fichaService: FichaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public pesquisar() {
    this.loading = true;
    this.fichaService.buscarPacientes(this.keyword).subscribe({
      next: (res: FichaPaciente[]) => {
        this.loading = false;
        this.lista = res;
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status == 404) {
          this.exibirModal('Não encontrei pacientes com este nome');
        } else {
          this.exibirModal('Erro ao Buscar Paciente');
        }
      },
    });
  }

  public adicionarFicha(): void {
    this.router.navigate(['ficha']);
  }

  public logout(): void {
    localStorage.removeItem('SalutarTK');
    this.router.navigate(['/']);
  }

  public exibirModal(msg: string): void {
    this.msgErro = msg;
    document.getElementById('btnModal')?.click();
  }
}
