import { Component, OnInit } from '@angular/core';
import { DadosCEP } from 'src/app/model/DadosCEP';
import { FichaPaciente } from 'src/app/model/FichaPaciente';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css'],
})
export class FichaPacienteComponent implements OnInit {
  public ficha: FichaPaciente;
  public loading: boolean = false;

  public constructor(private cepService: CepService) {
    this.ficha = new FichaPaciente();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public scroll(id: string) {
    document.getElementById(id)?.scrollIntoView();
  }

  public buscarCep() {
    this.loading = true;
    let cep = this.ficha.cep.replaceAll('-', '').replaceAll('.', '');
    this.cepService.buscarCEP(cep).subscribe({
      next: (res: DadosCEP) => {
        this.loading = false;
        this.ficha.endereco = res.logradouro;
        this.ficha.cidade = res.localidade;
        this.ficha.estado = res.uf;
      },
      error: (err: any) => {
        alert('ERRO! CEP Inválido');
        this.loading = false;
      },
    });
  }

  public salvarFicha() {
    throw new Error('Method not implemented.');
  }
}
