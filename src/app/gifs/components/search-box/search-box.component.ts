import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { PaginationDTO } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsSvc: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    const pagination: PaginationDTO = { limit: 50, offset: 0 };

    this.gifsSvc.searchTag(newTag, pagination);
    this.tagInput.nativeElement.value = '';
  }
}
