import { Injectable } from '@angular/core';
import { SearchFacadeService } from '@red-probeaufgabe/search';
import { FhirSearchFn, IFhirPatient, IFhirPractitioner, IFhirSearchResponse, ISearchFormData } from '@red-probeaufgabe/types';
import { asyncScheduler, BehaviorSubject, Observable, queueScheduler, scheduled } from 'rxjs';
import { mergeMap, catchError, tap, map, startWith, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchData$: BehaviorSubject<ISearchFormData> = new BehaviorSubject({searchFuncSelect: FhirSearchFn.SearchAll,searchText:''});

  constructor(private searchFacade: SearchFacadeService) {
  }

  search(search: ISearchFormData) {
    this.isLoading = true;
    this.searchData$.next(search);
  }

  isLoading = true;

  search$ = this.handleError();

  entries$: Observable<Array<IFhirPatient | IFhirPractitioner>> = this.handleError().pipe(
    map((data) => !!data && data.entry),
    startWith([]),
  );

  totalLength$ = this.handleError().pipe(
    map((data) => !!data && data.total),
    startWith(0),
  );

  getSearchObserver() {
    return this.searchData$.asObservable().pipe(
      debounceTime(500,queueScheduler),
      tap(data => console.log('search:',data.searchText)),
      mergeMap( result => this.searchFacade.search(result.searchFuncSelect,result.searchText)),
      catchError(this.handleError),
      tap((data) => {
        this.isLoading = false;
        const results = scheduled([data],queueScheduler);
        this.search$ = results;
        this.entries$ = this.search$.pipe(
          map((data) => !!data && data.entry),
          startWith([]),
        );
        this.totalLength$ = this.search$.pipe(
          map((data) => !!data && data.total),
          startWith(0),
        );
      })
    );
  }

  
  private handleError(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return scheduled([{ entry: [], total: 0 }],asyncScheduler);
  }
}
