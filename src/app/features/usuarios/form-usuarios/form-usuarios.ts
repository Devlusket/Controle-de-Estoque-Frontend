import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioRequest } from '../../../core/models/usuario.model';
import { CidadeService } from '../../../core/services/cidade.service';
import { CidadeResponse } from '../../../core/models/cidade.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-usuarios',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './form-usuarios.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUsuariosComponent implements OnInit{


  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);

  @Input() id: number | null = null;
  @Output() salvo = new EventEmitter<void>();

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    senha: ['', Validators.required],
    role: ['CLIENTE', Validators.required],
    cidadeId: [null as number | null, Validators.required]
  });

  private cidadeService = inject(CidadeService);
  cidades: CidadeResponse[] = [];

  ngOnInit(): void {
    this.cidadeService.listar().subscribe({
      next: (dados) => this.cidades = dados,
      error: (err) => console.error(err)
    });

    if (this.id) {
      this.usuarioService.buscarPorId(this.id).subscribe({
        next: (usuario) => this.form.patchValue(usuario),
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit(): void {
        if (this.form.invalid) return;
    
        const request = this.form.value as UsuarioRequest;
    
        const operacao = this.id
        ? this.usuarioService.atualizar(this.id, request)
        : this.usuarioService.criar(request);
    
        operacao.subscribe({
          next: () => this.salvo.emit(),
          error: (err) => console.error(err)
        });
    
      }

  


}
