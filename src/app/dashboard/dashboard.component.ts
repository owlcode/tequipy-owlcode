import { Component } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EmployeesService } from '../employees.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeParsed } from '../employees.types';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatTableModule, MatSortModule, CommonModule, MatFormFieldModule, MatInputModule
  ]
})
export class DashboardComponent {

  displayedColumns: string[] = ['name', 'email', 'department', 'equipment', 'status']

  data: Observable<EmployeeParsed[]>
  filter = new BehaviorSubject('')

  constructor(
    private router: Router,
    private employeesService: EmployeesService,
  ) {

    this.data = combineLatest([
      this.employeesService.employeesStore.asObservable(),
      this.filter.asObservable()
    ])
      .pipe(
        map(([data, filterValue]) => data.filter((entry) => `${entry.department}${entry.name}`.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))),
      )

  }
  goto(row: any) {
    this.router.navigate([`/details/${row.id}`])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.next(filterValue)
  }
}
