import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { UserDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard-search-and-filter.structure';
import { UserDashboardStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard.structure';
import { UserStructure } from 'src/app/structures/main-structures/user.structure';
import { QueriesUserService } from '../queries-user/queries-user.service';
import { AsyncState, errorState, loadingState, successState } from 'src/app/shared/async-state.type';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private _list$ = new BehaviorSubject<AsyncState<UserDashboardStructure[]>>(successState([]));
  private _kpis$ = new BehaviorSubject<AsyncState<DashboardKpiStructure[]>>(successState([]));
  private _detail$ = new BehaviorSubject<AsyncState<UserStructure>>(successState(null as unknown as UserStructure));

  readonly list$ = this._list$.asObservable();
  readonly kpis$ = this._kpis$.asObservable();
  readonly detail$ = this._detail$.asObservable();

  constructor(
    private userSvc: QueriesUserService,
    private authSvc: AuthenticationService
  ) {}

  loadList(filter: UserDashboardSearchAndFilterStructure): void {
    this._list$.next(loadingState());
    this.authSvc.refreshHttpOptions().then(opts => {
      this.userSvc.Post_SearchAndFilter_UserStructure(filter, opts)
        .pipe(catchError(err => {
          this._list$.next(errorState(err?.error ?? 'Erro ao carregar utilizadores.'));
          return EMPTY;
        }))
        .subscribe(data => this._list$.next(successState(data)));
    });
  }

  loadKpis(): void {
    this._kpis$.next(loadingState());
    this.authSvc.refreshHttpOptions().then(opts => {
      this.userSvc.Get_Kpis(opts)
        .pipe(catchError(err => {
          this._kpis$.next(errorState(err?.error ?? 'Erro ao carregar KPIs.'));
          return EMPTY;
        }))
        .subscribe(data => this._kpis$.next(successState(data as DashboardKpiStructure[])));
    });
  }

  loadDetail(id: string): void {
    this._detail$.next(loadingState());
    this.authSvc.refreshHttpOptions().then(opts => {
      this.userSvc.Get_UserStructure(id, opts)
        .pipe(catchError(err => {
          this._detail$.next(errorState(err?.error ?? 'Erro ao carregar utilizador.'));
          return EMPTY;
        }))
        .subscribe(data => this._detail$.next(successState(data)));
    });
  }
}
