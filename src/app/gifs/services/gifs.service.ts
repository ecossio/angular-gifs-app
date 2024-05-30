import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = environment.GIPHY_API_KEY;
  private serviceUrl: string = environment.GIPHY_URL;

  constructor(private http: HttpClient) {
    this.getLoadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
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
        this.searchTag(this._tagsHistory[0]);
      }
    }
  }

  searchTag(tag: string) {
    if (tag.length) {
      this.organizeHistory(tag);

      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', 10)
        .set('q', tag);

      this.http
        .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
        .subscribe({
          next: (resp) => {
            this.gifList = resp.data;
          },
        });
    }
  }
}
