import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from './users.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  offboard(data: UserDetails & { id: string }) {
    return this.httpClient.post(`/api/users/${data.id}/offboard`, data)
  }
}
