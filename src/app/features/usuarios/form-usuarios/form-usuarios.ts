import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';
import { CidadeService } from '../../../core/services/cidade.service';
import { UsuarioRequest } from '../../../core/models/usuario.model';
import { CidadeResponse } from '../../../core/models/cidade.model';

@Component({
  selector: 'app-form-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './form-usuarios.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUsuariosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private cidadeService = inject(CidadeService);
  private cdr = inject(ChangeDetectorRef);

  @Input() id: number | null = null;
  @Output() salvo = new EventEmitter<void>();

  cidades: CidadeResponse[] = [];

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    role: ['CLIENTE', Validators.required],
    cidadeId: [null as number | null]
  });

  ngOnInit(): void {
    this.cidadeService.listar().subscribe({
      next: (dados) => { this.cidades = dados; this.cdr.markForCheck(); },
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