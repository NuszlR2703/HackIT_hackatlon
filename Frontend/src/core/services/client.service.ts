import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  UserRegisterDto,
  UserReturnDto,
} from 'core/model/user.model';
import { FileDto } from 'core/model/file.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<UserReturnDto>(
      `${environment.apiUrl}/student/${id}`
    );
  }

  /**
   * Create Student
   */
  registerClient(
    userDto: UserRegisterDto
  ): Observable<UserRegisterDto> {
    return this._http.post<UserRegisterDto>(
      `${environment.apiUrl}/register-user`,
      userDto
    );
  }

  /**
   * Delete Student
   */
  deleteStudent(id: number) {
    return this._http.delete<any>(
      `${environment.apiUrl}/student/delete/${id}`
    );
  }

  /**
   * Update Student
   */
  updateStudent(student: UserReturnDto) {
    return this._http.patch<UserReturnDto>(
      `${environment.apiUrl}/student/update`,
      student
    );
  }

  upLoadFile(file: FormData, id: number, path: string, type: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', []);

    return this._http.post<FileDto>(
      `${environment.apiUrl}/student/` +
        type +
        path +
        id +
        `/uploadFile`,
      file,
      { headers: headers }
    );
  }

  getProfileImage(fileName: string, id: number) {
    return this._http.get<any>(
      `${environment.apiUrl}/student/downloadFile/${id}/${fileName}`
    );
  }
}
