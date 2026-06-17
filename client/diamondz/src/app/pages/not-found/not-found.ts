import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}