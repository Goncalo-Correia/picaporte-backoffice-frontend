import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { CustomerDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-search-and-filter.structure';
import { CustomerDashboardStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard.structure';
import { CustomerStructure } from 'src/app/structures/main-structures/customer.structure';
import { QueriesCustomerService } from '../queries-customer/queries-customer.service';
import { AsyncState, errorState, loadingState, successState } from 'src/app/shared/async-state.type';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {
  private _list$ = new BehaviorSubject<AsyncState<CustomerDashboardStructure[]>>(successState([]));
  private _kpis$ = new BehaviorSubject<AsyncState<DashboardKpiStructure[]>>(successState([]));
  private _detail$ = new BehaviorSubject<AsyncState<CustomerStructure>>(successState(null as unknown as CustomerStructure));

  readonly list$ = this._list$.asObservable();
  readonly kpis$ = this._kpis$.asObservable();
  readonly detail$ = this._detail$.asObservable();

  constructor(
    private customerSvc: QueriesCustomerService,
    private authSvc: AuthenticationService
  ) {}

  loadList(filter: CustomerDashboardSearchAndFilterStructure): void {
    this._list$.next(loadingState());
    this.authSvc.refreshHttpOptions().then(opts => {
      this.customerSvc.Post_SearchAndFilter_CustomerStructure(filter, opts)
        .pipe(catchError(err => {
          this._list$.next(errorState(err?.error ?? 'Erro ao carregar clientes.'));
          return EMPTY;
        }))
        .subscribe(data => this._list$.next(successState(data)));
    });
  }

  loadKpis(): void {
    this._kpis$.next(loadingState());
    this.authSvc.refreshHttpOptions().then(opts => {
      this.customerSvc.Get_Kpis(opts)
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
      this.customerSvc.Get_CustomerStructure(id, opts)
        .pipe(catchError(err => {
          this._detail$.next(errorState(err?.error ?? 'Erro ao carregar cliente.'));
          return EMPTY;
        }))
        .subscribe(data => this._detail$.next(successState(data)));
    });
  }
}
