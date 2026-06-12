import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDropdown } from '@components/cart-dropdown.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartDropdown],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App { }
