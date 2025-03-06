import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesService } from './employees.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tequipy-owlcode';

  constructor(
    private employeesService: EmployeesService
  ) {
    this.employeesService.getAll().pipe(take(1)).subscribe()
  }
}
