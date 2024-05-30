import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif, PaginationDTO } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private gifsSvc: GifsService) {}

  get gifs(): Gif[] {
    return this.gifsSvc.gifList.data;
  }

  loadMoreGifs() {
    const tag = this.gifsSvc.tagsHistory[0];

    const pagination: PaginationDTO = {
      limit: 50,
      offset:
        this.gifsSvc.gifList.pagination.offset +
        this.gifsSvc.gifList.pagination.count,
    };

    if (!this.gifsSvc.isSearching) {
      this.gifsSvc.searchTag(tag, pagination);
    }
  }
}
