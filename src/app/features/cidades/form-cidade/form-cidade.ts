import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CidadeService } from '../../../core/services/cidade.service';
import { CidadeRequest } from '../../../core/models/cidade.model';

@Component({
  selector: 'app-form-cidade',
  imports: [ReactiveFormsModule],
  templateUrl: './form-cidade.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCidadeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cidadeService = inject(CidadeService);

  @Input() id: number | null = null;
  @Output() salvo = new EventEmitter<void>();

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    estado: ['', Validators.required],
    sede: [false]
  });

  ngOnInit(): void {
    if (this.id) {
      this.cidadeService.buscarPorId(this.id).subscribe({
        next: (cidade) => this.form.patchValue(cidade),
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const request = this.form.value as CidadeRequest;
    const operacao = this.id
      ? this.cidadeService.atualizar(this.id, request)
      : this.cidadeService.criar(request);
    operacao.subscribe({
      next: () => this.salvo.emit(),
      error: (err) => console.error(err)
    });
  }
}