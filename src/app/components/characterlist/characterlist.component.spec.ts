import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterlistComponent } from './characterlist.component';

describe('CharacterlistComponent', () => {
  let component: CharacterlistComponent;
  let fixture: ComponentFixture<CharacterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterlistComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
