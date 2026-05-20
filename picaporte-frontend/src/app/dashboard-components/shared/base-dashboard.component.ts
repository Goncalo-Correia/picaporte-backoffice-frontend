import { HttpHeaders } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication-service/authentication.service';
import { MessageComponent } from 'src/app/generic-components/message/message.component';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';

export abstract class BaseDashboardComponent {
  messageComponent?: MessageComponent;

  protected constructor(private authenticationService: AuthenticationService) {}

  protected runAuthenticatedRequest<T>(
    requestFactory: (httpOptions: { headers: HttpHeaders }) => Observable<T>,
    onSuccess: (data: T) => void,
    onError?: () => void
  ): void {
    this.authenticationService.refreshHttpOptions().then((httpOptions: { headers: HttpHeaders }) => {
      requestFactory(httpOptions)
        .pipe(
          catchError((err) => {
            this.messageComponent?.showMessage(err?.error ?? 'Ocorreu um erro.');
            onError?.();
            return EMPTY;
          })
        )
        .subscribe((data) => {
          onSuccess(data);
        });
    });
  }

  protected resetToFirstPage(searchAndFilter: SearchAndFilterStructure): void {
    searchAndFilter.page = 0;
  }

  protected updatePagination(searchAndFilter: SearchAndFilterStructure, resultLength: number): { hasPrevious: boolean; hasNext: boolean } {
    return {
      hasPrevious: searchAndFilter.page > 0,
      hasNext: resultLength === searchAndFilter.size
    };
  }

  protected copyElementText(document: Document, elementId: string): void {
    const textToCopy = document.getElementById(elementId)?.innerText?.trim();

    if (!textToCopy) {
      return;
    }

    navigator.clipboard.writeText(textToCopy).catch(() => {
      this.messageComponent?.showMessage('Nao foi possivel copiar o conteudo.');
    });
  }
}
