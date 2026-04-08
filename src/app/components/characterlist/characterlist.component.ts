import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterfilterComponent } from '../characterfilter/characterfilter.component';

interface ListState {
  loading: boolean;
  characters: Character[];
  error: string | null;
}

@Component({
  selector: 'app-characterlist',
  imports: [
    AsyncPipe,
    RouterLink,
    CharacterfilterComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.scss',
})
export class CharacterlistComponent {
  private readonly characterService = inject(CharacterService);
  private readonly houseFilter$ = new BehaviorSubject<string | null>(null);

  readonly fallbackImage =
    'https://placehold.co/280x360/263238/eceff1?text=No+image';

  readonly listState$: Observable<ListState> = this.houseFilter$.pipe(
    switchMap((house) => {
      const request$ = house
        ? this.characterService.getCharactersByHouse(house)
        : this.characterService.getAllCharacters();
      return request$.pipe(
        map((characters) => ({
          loading: false,
          characters,
          error: null as string | null,
        })),
        startWith({
          loading: true,
          characters: [] as Character[],
          error: null as string | null,
        }),
        catchError(() =>
          of({
            loading: false,
            characters: [] as Character[],
            error: 'Could not load characters. Try again later.',
          })
        )
      );
    })
  );

  onHouseFilterChange(house: string | null): void {
    this.houseFilter$.next(house);
  }

  houseLabel(character: Character): string {
    const house = character.house?.trim();
    return house ? house : 'No House';
  }

  imageUrl(character: Character): string {
    return character.image?.trim() ? character.image : this.fallbackImage;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.fallbackImage) {
      img.src = this.fallbackImage;
    }
  }
}
