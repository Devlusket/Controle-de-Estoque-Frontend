import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormUsuariosComponent } from '../form-usuarios/form-usuarios';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioResponse } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [MatTableModule, MatButtonModule, MatIconModule, FormUsuariosComponent],
  templateUrl: './lista-usuarios.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaUsuariosComponent implements OnInit{


  private usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService)
  
  
  usuarios: UsuarioResponse[] = [];
  colunas = ['id', 'nome', 'email', 'role', 'ativo', 'acoes'];


  ngOnInit(): void {
    this.carregar()
  };

  carregar(): void {
    this.usuarioService.listar().subscribe({
      next: (dados) => {
        this.usuarios = dados,
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  desativar(id: number): void {
    this.usuarioService.desativar(id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error(err)
    });
  }

  mostrarForm = false;
  idSelecionado: number | null = null;

    abrirForm(id: number | null = null): void {
    this.idSelecionado = id;
    this.mostrarForm = true;
  };

  aoSalvar(): void {
    this.mostrarForm = false;
    this.idSelecionado = null;
    this.carregar();
  }



}
