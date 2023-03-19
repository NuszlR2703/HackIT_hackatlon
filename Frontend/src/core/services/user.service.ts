import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReturnDto } from 'core/model/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserServiceG {
  constructor(private _http: HttpClient) {}

  getUser(): Observable<UserReturnDto> {
    return this._http.get<UserReturnDto>(
      `${environment.apiUrl}/user/profile`
    );
  }

  updateUser(userDto: UserReturnDto): Observable<UserReturnDto> {
    return this._http.patch<UserReturnDto>(
      `${environment.apiUrl}/user/update`,
      userDto
    );
  }
}
