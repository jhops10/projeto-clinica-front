import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosCEP } from 'src/app/model/DadosCEP';
import { FichaPaciente } from 'src/app/model/FichaPaciente';
import { Midia } from 'src/app/model/Midia';
import { PathToFile } from 'src/app/model/PathToFile';
import { CepService } from 'src/app/services/cep.service';
import { FichaService } from 'src/app/services/ficha.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css'],
})
export class FichaPacienteComponent implements OnInit {
  public ficha: FichaPaciente;
  public loading: boolean = false;
  private idFicha: string = '';
  public msgModal: string = '';
  public estiloMsg: string = '';
  private pathToFile: PathToFile;
  private mode: string = '';
  public midiaDesc: string = '';

  public constructor(
    private cepService: CepService,
    private activatedRoute: ActivatedRoute,
    private fichaService: FichaService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.ficha = new FichaPaciente();
    console.log(this.ficha);
    this.ficha.linkFoto = '/assets/avatar.png';
    this.pathToFile = new PathToFile();
    this.idFicha = this.activatedRoute.snapshot.params['id'];
    if (this.idFicha != 'NOVA') {
      // se não for nova ficha, busca da API
      this.loading = true;
      this.fichaService.buscarFichaPeloId(this.idFicha).subscribe({
        next: (res: FichaPaciente) => {
          this.ficha = res;
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          this.exibirModal('Erro a recuperar ficha');
        },
      });
    }
  }

  ngOnInit(): void {}

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
        this.exibirModal('Impossivel recuperar CEP');
        this.loading = false;
      },
    });
  }

  public salvarFicha() {
    if (this.ficha.idFicha == 0) {
      this.gravarNovaFicha();
    } else {
      this.atualizarFichaExistente();
    }
  }

  public atualizarFichaExistente() {
    this.loading = true;
    this.fichaService.atualizarFicha(this.ficha).subscribe({
      next: (res: FichaPaciente) => {
        this.exibirModal('Ficha Atualizada com sucesso!');
        this.loading = false;
        this.ficha = res;
        this.idFicha = this.ficha.idFicha.toString();
      },
      error: () => {
        this.loading = false;
        this.exibirModal('Erro ao atualizar ficha');
      },
    });
  }
  public gravarNovaFicha() {
    this.loading = true;
    this.fichaService.cadastrarNovaFicha(this.ficha).subscribe({
      next: (res: FichaPaciente) => {
        this.loading = false;
        this.exibirModal('Ficha cadastrada com sucesso!');
        this.ficha = res;
        this.idFicha = this.ficha.idFicha.toString();
      },
      error: () => {
        this.loading = false;
        this.exibirModal('Erro ao cadastrar nova ficha');
      },
    });
  }

  public voltar(): void {
    this.router.navigate(['main']);
  }

  public realizarUpload(data: any): void {
    let file = data.target.files[0];
    let formData = new FormData();
    formData.append('arquivo', file, file.name);
    this.loading = true;
    this.uploadService.uploadFile(formData).subscribe({
      next: (res: PathToFile) => {
        this.loading = false;
        this.pathToFile = res;
        this.exibirModal('Upload Realizado');
        if (this.mode == 'profile') {
          this.ficha.linkFoto = '/assets/media/' + this.pathToFile.path;
          console.log(this.ficha.linkFoto);
        } else {
          // vou fazer upload de uma midia
          let midia: Midia = new Midia();
          midia.descricao = this.midiaDesc;
          midia.linkMidia = '/assets/media/' + this.pathToFile.path;
          this.ficha.midias.push(midia);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.exibirModal('Falha ao realizar Upload');
      },
    });
  }

  public exibirModal(mensagem: string): void {
    this.msgModal = mensagem;
    document.getElementById('btnModalAlerta')?.click();
  }

  public chamarUpload(mode: string): void {
    this.mode = mode;
    if (mode == 'profile') {
      document.getElementById('btnModalUpload')?.click();
    } else {
      document.getElementById('btnModalUploadMidia')?.click();
    }
  }
}
