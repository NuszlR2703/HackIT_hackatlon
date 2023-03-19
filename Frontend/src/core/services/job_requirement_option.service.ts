import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { JobRequirementOptionDto } from 'core/model/job_requirement_option';

@Injectable({ providedIn: 'root' })
export class JobRequirementOptionService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}
}
