import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { OffboardDialogComponent } from './offboard-dialog.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  employee$!: Observable<any>;

  constructor(
    private employeesService: EmployeesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee$ = this.employeesService.get(id);
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onOffboard() {
    const employeeId = this.route.snapshot.paramMap.get('id')
    const dialogRef = this.dialog.open(OffboardDialogComponent, {
      width: '500px',
      data: { employeeId }
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result) => result),
        switchMap((result) => this.usersService.offboard(result)),
        tap(() => this.employeesService.offboardEmployee(employeeId))
      ).subscribe(() => {
        
        this.router.navigate(['/']);
      })

  }
}
