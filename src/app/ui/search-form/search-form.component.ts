import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FhirSearchFn, ISearchFormData } from 'app/types/search';
import { CustomErrorStateMatcher, searchFieldValidator } from 'app/search';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, AfterViewInit {

  public selectedValue;

  @Output() doSearch = new EventEmitter<ISearchFormData>();

  searchTypes = FhirSearchFn;

  searchForm = new FormGroup({
    searchText: new FormControl('', [searchFieldValidator(/[^A-Za-z0-9]/i)]),
    searchFuncSelect: new FormControl('')
  });

  matcher = new CustomErrorStateMatcher();

  ngOnInit(): void {
    this.selectedValue = FhirSearchFn.SearchAll;
    this.searchForm.get('searchFuncSelect').setValue(FhirSearchFn.SearchAll);
  }

  ngAfterViewInit() {
    this.searchForm.valueChanges.subscribe((change) => {
      if(this.searchForm.valid && !this.searchForm.pristine){
        this.doSearch.emit(this.searchForm.value);
        this.searchForm.markAsPristine();
      }
    })
  }
}
