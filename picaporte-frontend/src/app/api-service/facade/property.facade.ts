import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { PropertyDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-search-and-filter.structure';
import { PropertyDashboardStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard.structure';
import { PropertyStructure } from 'src/app/structures/main-structures/property.structure';
import { QueriesPropertyService } from '../queries-property/queries-property.service';
import { AsyncState, errorState, loadingState, successState } from 'src/app/shared/async-state.type';

@Injectable({ providedIn: 'root' })
export class PropertyFacade {
  private _list$ = new BehaviorSubject<AsyncState<PropertyDashboardStructure[]>>(successState([]));
  private _kpis$ = new BehaviorSubject<AsyncState<DashboardKpiStructure[]>>(successState([]));
  private _detail$ = new BehaviorSubject<AsyncState<PropertyStructure>>(successState(null as unknown as PropertyStructure));

  readonly list$ = this._list$.asObservable();
  readonly kpis$ = this._kpis$.asObservable();
  readonly detail$ = this._detail$.asObservable();

  constructor(
    private propertySvc: QueriesPropertyService,
    private authSvc: AuthenticationService
  ) {}

  loadList(filter: PropertyDashboardSearchAndFilterStructure): void {
    this._list$.next(loadingState());
    this.authSvc.refreshHttpOptions().then(opts => {
      this.propertySvc.Post_SearchAndFilter_PropertyStructure(filter, opts)
        .pipe(catchError(err => {
          this._list$.next(errorState(err?.error ?? 'Erro ao carregar imóveis.'));
          return EMPTY;
        }))
        .subscribe(data => this._list$.next(successState(data)));
    });
  }

  loadKpis(): void {
    this._kpis$.next(loadingState());
    this.authSvc.refreshHttpOptions().then(opts => {
      this.propertySvc.Get_Kpis(opts)
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
      this.propertySvc.Get_PropertyStructure(id, opts)
        .pipe(catchError(err => {
          this._detail$.next(errorState(err?.error ?? 'Erro ao carregar imóvel.'));
          return EMPTY;
        }))
        .subscribe(data => this._detail$.next(successState(data)));
    });
  }
}
