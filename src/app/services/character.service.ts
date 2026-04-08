import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character';

const API_BASE = 'https://hp-api.onrender.com/api';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly http = inject(HttpClient);

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${API_BASE}/characters`);
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    const path = encodeURIComponent(house);
    return this.http.get<Character[]>(`${API_BASE}/characters/house/${path}`);
  }

  getCharacterById(id: string): Observable<Character | undefined> {
    const path = encodeURIComponent(id);
    return this.http
      .get<Character[]>(`${API_BASE}/character/${path}`)
      .pipe(map((list) => list[0]));
  }
}
