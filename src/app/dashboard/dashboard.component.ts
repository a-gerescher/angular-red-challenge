import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SiteTitleService } from '@red-probeaufgabe/core';
import { ISearchFormData } from '@red-probeaufgabe/types';
import { IUnicornTableColumn } from '@red-probeaufgabe/ui';

import { SearchService } from '@red-probeaufgabe/search';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ SearchService ], // provider added. fix
})
export class DashboardComponent implements OnInit, OnDestroy{
  // Init unicorn columns to display
  columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>([
    'number',
    'resourceType',
    'name',
    'gender',
    'birthDate',
  ]);

  isLoading = this.searchService.isLoading;

  searchSubscription: Subscription = null;

  constructor(private siteTitleService: SiteTitleService, public searchService: SearchService) {
    this.siteTitleService.setSiteTitle('Dashboard');
  }

  public searchChanged( newSearch: ISearchFormData ) {
    this.searchService.search(newSearch);
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchService.getSearchObserver().subscribe();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
