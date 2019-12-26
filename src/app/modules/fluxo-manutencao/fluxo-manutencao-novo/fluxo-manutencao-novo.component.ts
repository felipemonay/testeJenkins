import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FluxoManutencao } from 'src/app/shared/models/fluxo-manutencao';
import { FluxoManutencaoService } from '../fluxo-manutencao.service';
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SuccessHandler } from 'src/app/shared/http/responses/success-handler';

@Component({
  selector: 'app-fluxo-manutencao-novo',
  templateUrl: './fluxo-manutencao-novo.component.html',
  styleUrls: ['./fluxo-manutencao-novo.component.scss']
})
export class FluxoManutencaoNovoComponent implements OnInit {

  public fluxo: FluxoManutencao = new FluxoManutencao();
  public fileTypes;

  constructor(private FluxoManutencaoService: FluxoManutencaoService,
    private downloadService: DownloadService) { }

  ngOnInit() {
    this.fileTypes = [{ name: 'Exclusão PI ou STS', subject: 'exclusao' },
    { name: 'Manutenção STS(Cadastro e/ou Alteração)', subject: 'manutencao' }];
    this.fluxo.file = '';
  }

  send() {
    const formData: FormData = new FormData();
    if (this.fluxo.description !== '' || this.fluxo.description !== undefined) {
      formData.append('description', this.fluxo.description);
    }
    if (this.fluxo.subject) {
      formData.append('subject', this.fluxo.subject);
    }
    formData.append('file', this.fluxo.file);
    this.FluxoManutencaoService.send(formData).subscribe(() => {
      new SuccessHandler('Mensagem enviada com sucesso').show().then(() => {
        this.fluxo = new FluxoManutencao();
      });
    }, error => {
      new ErrorHandler(error).show();
    });;
  }

  getFile(subject: string) {
    if (subject === '' || subject === undefined || subject === null) {
      swal.fire('Atenção', 'Por favor selecione o assunto para o download do arquivo', 'warning');
    } else if (subject === 'Exclusão PI ou STS') {
      this.FluxoManutencaoService.download(this.fileTypes[0].subject).subscribe(
        data => {
          this.downloadService.run(data, this.fileTypes[0].subject + '.xlsx');
        },
        error => {
          new ErrorHandler().show(error);
        });
    } else if (subject === 'Manutenção STS(Cadastro e/ou Alteração)') {
      this.FluxoManutencaoService.download(this.fileTypes[1].subject).subscribe(
        data => {
          this.downloadService.run(data, this.fileTypes[1].subject + '.xlsx');
        },
        error => {
          new ErrorHandler().show(error);
        });
    }
  }

  uploadFile(event) {
    this.fluxo.file = event.target.files[0];
  }

}
