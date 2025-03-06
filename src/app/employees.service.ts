import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Employee, EmployeeParsed } from './employees.types';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  employeesStore = new BehaviorSubject<EmployeeParsed[]>([]);

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get<Employee[]>('/api/employees')
      .pipe(
        map((data) => data.map((item) => this.transformEmployee(item))),
        tap((data) => this.employeesStore.next(data))
      )
  }

  get(id: string) {
    return this.httpClient.get<Employee>(`api/employees/${id}`).pipe(map(data => this.transformEmployee(data)))
  }

  offboardEmployee(id: string | null) {
    if (!id) {
      return
    }
    const values = this.employeesStore.getValue()
    const index = values.findIndex((el) => el.id === id)
    const newItem = { ...values[index], status: 'OFFBOARD' as const }
    const newList = [
      ...this.employeesStore.getValue().slice(0, index),
      newItem,
      ...this.employeesStore.getValue().slice(index + 1)

    ]
    this.employeesStore.next(newList)
  }

  private transformEmployee(employee: Employee): EmployeeParsed {
    return { ...employee, equipment: employee.equipments.map((e) => e.name).join(', ') }
  }



}
