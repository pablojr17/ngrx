import { UsuariosEffects } from './usuarios/usuario.effects';
import { ActionReducerMap } from '@ngrx/store';
import { UsuarioState, usuariosReducer } from './usuarios/usuarios.reducer';

export interface AppState {
  usuarios: UsuarioState;
}

export const appReducer: ActionReducerMap<AppState> = {
  usuarios: usuariosReducer,
};

export const appEffects = [UsuariosEffects];
