import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsuarioService } from 'src/app/Repository/UsuarioService';
import * as fromUsuariosAction from './usuarios.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  loadUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIOS),
      exhaustMap(() =>
        this.usuarioService.getUsuarios().pipe(
          map(
            (payload) => fromUsuariosAction.LoadUsuariosSuccess({ payload }),
            catchError((error) =>
              of(fromUsuariosAction.LoadUsuariosFail({ error }))
            )
          )
        )
      )
    )
  );

  loadUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIO),
      exhaustMap((record: any) =>
        this.usuarioService.getUsuario(record.payload).pipe(
          map(
            (payload) => fromUsuariosAction.LoadUsuarioSucess({ payload }),
            catchError((error) =>
              of(fromUsuariosAction.LoadUsuarioFail({ error }))
            )
          )
        )
      )
    )
  );

  createUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeAction.CREATE_USUARIO),
      exhaustMap((record: any) =>
        this.usuarioService.addUsuario(record.payload).pipe(
          map(
            (payload) => fromUsuariosAction.CreateUsuarioSucess({ payload }),
            catchError((error) =>
              of(fromUsuariosAction.CreateUsuarioFail({ error }))
            )
          )
        )
      )
    )
  );

  updateUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeAction.UPDATE_USUARIO),
      exhaustMap((record: any) =>
        this.usuarioService.updateUsuario(record.payload).pipe(
          map(
            (payload) => fromUsuariosAction.UpdateUsuarioSucess({ payload }),
            catchError((error) =>
              of(fromUsuariosAction.UpdateUsuarioFail({ error }))
            )
          )
        )
      )
    )
  );

  deleteUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeAction.DELETE_USUARIO),
      exhaustMap((record: any) =>
        this.usuarioService.deleteUsuario(record.payload).pipe(
          map(
            () =>
              fromUsuariosAction.DeleteUsuarioSucess({
                payload: record.payload,
              }),
            catchError((error) =>
              of(fromUsuariosAction.DeleteUsuarioFail({ error }))
            )
          )
        )
      )
    )
  );
}
