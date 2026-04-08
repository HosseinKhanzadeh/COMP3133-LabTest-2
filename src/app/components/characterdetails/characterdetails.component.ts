import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characterdetails',
  imports: [],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.scss',
})
export class CharacterdetailsComponent {
  private readonly route = inject(ActivatedRoute);

  readonly characterId = this.route.snapshot.paramMap.get('id');
}
