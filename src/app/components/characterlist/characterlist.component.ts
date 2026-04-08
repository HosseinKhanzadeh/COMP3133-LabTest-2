import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CharacterfilterComponent } from '../characterfilter/characterfilter.component';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-characterlist',
  imports: [AsyncPipe, CharacterfilterComponent],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.scss',
})
export class CharacterlistComponent {
  private readonly characterService = inject(CharacterService);

  readonly characters$ = this.characterService.getAllCharacters();
}
