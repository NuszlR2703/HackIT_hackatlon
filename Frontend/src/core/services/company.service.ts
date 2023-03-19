import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CompanyDto } from 'core/model/company.model';
import { UserReturnDto } from 'core/model/user.model';
import { FileDto } from 'core/model/file.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  /**
   * Get all Companies
   */
  getAllCompanies(): Observable<CompanyDto[]> {
    return this._http.get<CompanyDto[]>(
      `${environment.apiUrl}/company/get-all`
    );
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<CompanyDto>(
      `${environment.apiUrl}/company/${id}`
    );
  }

  /**
   * Create Company
   */
  createCompany(companyDto: CompanyDto): Observable<CompanyDto> {
    return this._http.post<CompanyDto>(
      `${environment.apiUrl}/company/create`,
      companyDto
    );
  }

  /**
   * Create Company
   */
  createCompanyManager(
    userDto: UserReturnDto
  ): Observable<UserReturnDto> {
    return this._http.post<UserReturnDto>(
      `${environment.apiUrl}/manager/create-company-manager`,
      userDto
    );
  }

  getAllManagersOfCompany(id: number): Observable<UserReturnDto[]> {
    return this._http.get<UserReturnDto[]>(
      `${environment.apiUrl}/manager/get-all-of-company/${id}`
    );
  }

  deleteCompany(id: number) {
    return this._http.delete<any>(
      `${environment.apiUrl}/company/delete/${id}`
    );
  }

  updateCompany(company: CompanyDto) {
    return this._http.patch<CompanyDto>(
      `${environment.apiUrl}/company/update`,
      company
    );
  }

  upLoadFile(file: FormData, id: number, path: string, type: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', []);

    return this._http.post<FileDto>(
      `${environment.apiUrl}/company/` +
        type +
        path +
        id +
        `/uploadFile`,
      file,
      { headers: headers }
    );
  }
}
