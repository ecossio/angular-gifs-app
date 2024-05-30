import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { PaginationDTO } from '../../../gifs/interfaces/gifs.interface';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private gifsSvc: GifsService) {}

  get tags(): string[] {
    return this.gifsSvc.tagsHistory;
  }

  searchTag(tag: string): void {
    const pagination: PaginationDTO = { limit: 50, offset: 0 };
    this.gifsSvc.searchTag(tag, pagination);
  }
}
