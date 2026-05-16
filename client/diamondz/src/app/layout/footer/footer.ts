import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
