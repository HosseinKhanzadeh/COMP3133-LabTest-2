import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';

type DetailError = 'missing-id' | 'not-found' | 'http';

interface DetailState {
  loading: boolean;
  character: Character | null;
  error: DetailError | null;
}

@Component({
  selector: 'app-characterdetails',
  imports: [
    AsyncPipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.scss',
})
export class CharacterdetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly characterService = inject(CharacterService);

  readonly placeholderImage = '/character-placeholder.svg';

  readonly detailState$: Observable<DetailState> = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id')?.trim() ?? '';
      if (!id) {
        return of<DetailState>({
          loading: false,
          character: null,
          error: 'missing-id',
        });
      }
      return this.characterService.getCharacterById(id).pipe(
        map((character) =>
          character
            ? { loading: false, character, error: null }
            : { loading: false, character: null, error: 'not-found' as const }
        ),
        startWith<DetailState>({ loading: true, character: null, error: null }),
        catchError(() =>
          of({ loading: false, character: null, error: 'http' as const })
        )
      );
    })
  );

  textField(value: string | null | undefined): string {
    const v = value?.trim();
    return v ? v : 'Unknown';
  }

  houseLabel(character: Character): string {
    const h = character.house?.trim();
    return h ? h : 'No House';
  }

  formatWizard(character: Character): string {
    if (character.wizard === true) {
      return 'Yes';
    }
    if (character.wizard === false) {
      return 'No';
    }
    return 'Unknown';
  }

  wandWood(character: Character): string {
    const w = character.wand;
    if (!w) {
      return 'No Wand Data';
    }
    const x = w.wood?.trim();
    return x ? x : 'No Wand Data';
  }

  wandCore(character: Character): string {
    const w = character.wand;
    if (!w) {
      return 'No Wand Data';
    }
    const x = w.core?.trim();
    return x ? x : 'No Wand Data';
  }

  wandLength(character: Character): string {
    const w = character.wand;
    if (!w) {
      return 'No Wand Data';
    }
    if (w.length === null || w.length === undefined) {
      return 'No Wand Data';
    }
    return String(w.length);
  }

  imageSrc(character: Character): string {
    return character.image?.trim() ? character.image : this.placeholderImage;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('character-placeholder.svg')) {
      img.src = this.placeholderImage;
    }
  }
}
