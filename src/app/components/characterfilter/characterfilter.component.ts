import { Component, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-characterfilter',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.scss',
})
export class CharacterfilterComponent {
  readonly houseChange = output<string | null>();

  readonly houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'] as const;

  selectedHouse: string | null = null;

  onHouseSelected(event: MatSelectChange): void {
    this.selectedHouse = event.value as string | null;
    this.houseChange.emit(this.selectedHouse);
  }
}
