import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { CharacterdetailsComponent } from './characterdetails.component';

const mockCharacter: Character = {
  id: 'test-id',
  name: 'Test Wizard',
  alternate_names: [],
  species: 'human',
  gender: 'male',
  house: 'Gryffindor',
  dateOfBirth: '',
  yearOfBirth: null,
  wizard: true,
  ancestry: 'half-blood',
  eyeColour: '',
  hairColour: '',
  wand: { wood: 'oak', core: 'unicorn hair', length: 10 },
  patronus: '',
  hogwartsStudent: true,
  hogwartsStaff: false,
  actor: 'Test Actor',
  alternate_actors: [],
  alive: true,
  image: '',
};

describe('CharacterdetailsComponent', () => {
  let fixture: ComponentFixture<CharacterdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterdetailsComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: CharacterService,
          useValue: {
            getCharacterById: () => of(mockCharacter),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'test-id' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterdetailsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
