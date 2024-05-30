import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {
  Gif,
  PaginationDTO,
  SearchResponse,
} from '../interfaces/gifs.interface';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: SearchResponse = {
    data: [],
    meta: { status: 0, msg: '', response_id: '' },
    pagination: { total_count: 0, count: 0, offset: 0 },
  };
  private _tagsHistory: string[] = [];
  private apiKey: string = environment.GIPHY_API_KEY;
  private serviceUrl: string = environment.GIPHY_URL;
  private isSearchingGifs: boolean = false;

  constructor(private http: HttpClient) {
    this.getLoadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  get isSearching(): boolean {
    return this.isSearchingGifs;
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(
        (oldTag) => oldTag.toLowerCase() !== tag
      );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private getLoadLocalStorage(): void {
    const history = localStorage.getItem('history');
    if (history) {
      this._tagsHistory = JSON.parse(history);

      if (this._tagsHistory.length) {
        const pagination: PaginationDTO = { limit: 50, offset: 0 };
        this.searchTag(this._tagsHistory[0], pagination);
      }
    }
  }

  searchTag(tag: string, pagination: PaginationDTO) {
    if (tag.length) {
      this.organizeHistory(tag);

      this.isSearchingGifs = true;
      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', pagination.limit)
        .set('offset', pagination.offset)
        .set('q', tag);

      this.http
        .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
        .pipe(
          finalize(() => {
            this.isSearchingGifs = false;
          })
        )
        .subscribe({
          next: (resp) => {
            if (pagination.offset > 0) {
              this.gifList.data = [...this.gifList.data, ...resp.data];
            } else {
              this.gifList.data = resp.data;
            }

            this.gifList.meta = resp.meta;
            this.gifList.pagination = resp.pagination;
          },
          error: (e) => {},
        });
    }
  }
}
