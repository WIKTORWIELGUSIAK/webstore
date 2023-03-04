import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;
  categories2: Array<any> | undefined;

  constructor(
    private storeService: StoreService,
    private headerService: HeaderService
  ) {}
  ngOnInit(): void {
    // this.storeService.getAllCategories().subscribe((response) => {
    //   this.categories = ['all', ...response];
    // });
    this.storeService.getAllCategories2().subscribe((response) => {
      this.categories = ['all', ...response];
    });
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  replaceDashWithSpace(category: string): string {
    return category.replace(/-/g, ' ');
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
