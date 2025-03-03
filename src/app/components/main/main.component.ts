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
        if ((err.status = 404)) {
          alert('Não encontrei pacientes com esse nome');
        } else {
          alert('Erro! Paciente não encontrado!');
        }
        this.loading = false;
      },
    });
  }

  public adicionarFicha() {
    this.router.navigate(['ficha']);
  }
}
