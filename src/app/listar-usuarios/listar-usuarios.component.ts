import { UsuarioModel } from './../Models/UsuarioModel';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Repository/UsuarioService';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from '../Store/app-state';
import * as fromUsuariosAction from '../Store/usuarios/usuarios.actions';
import * as fromUsuariosSelector from '../Store/usuarios/usuarios.reducer';
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent implements OnInit {
  listaUsuarios$: Observable<UsuarioModel[]> = this.store.select(
    fromUsuariosSelector.getUsuarios
  );
  usuario$: Observable<UsuarioModel | null> = this.store.select(
    fromUsuariosSelector.getUsuario
  );
  editedUsuario: UsuarioModel = { id: 0, idade: 0, nome: '', perfil: '' }; // Crie um objeto vazio ou defina as propriedades iniciais conforme necessário

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(fromUsuariosAction.LoadUsuarios());
  }

  editar(id: number) {
    this.store.dispatch(fromUsuariosAction.LoadUsuario({ payload: id }));
    this.usuario$.subscribe((usuario) => {
      if (usuario) this.editedUsuario = { ...usuario }; // Cria uma cópia mutável do usuário
    });
  }

  updateUsuario() {
    if (this.editedUsuario.id !== undefined) {
      this.store.dispatch(
        fromUsuariosAction.UpdateUsuario({ payload: this.editedUsuario })
      );
    }
  }
  excluir(id: number) {
    this.store.dispatch(fromUsuariosAction.DeleteUsuario({ payload: id }));
  }
}
