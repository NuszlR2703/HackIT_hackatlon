import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReturnDto } from 'core/model/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  Assessment,
  EducationDto,
  EducationTypeDto,
  SkillDtoList,
  UpdateSkillsDto,
} from 'core/model/cv.model';
import { JobRequirementOptionDto } from 'core/model/job_requirement_option';
import { CertificationDto, CourseDto } from 'core/model/course.model';

@Injectable({ providedIn: 'root' })
export class SkillService {
  constructor(private _http: HttpClient) {}

  getSkillsbyUser(userId: number): Observable<SkillDtoList> {
    return this._http.post<SkillDtoList>(
      `${environment.apiUrl}/get-user-skills`,
      { userId }
    );
  }

  getEducationsbyUser(
    userID: number
  ): Observable<Array<EducationDto>> {
    return this._http.get<Array<EducationDto>>(
      `${environment.apiUrl}/education/getByUser/${userID}`
    );
  }

  getEducationTypes(): Observable<Array<EducationTypeDto>> {
    return this._http.get<Array<EducationTypeDto>>(
      `${environment.apiUrl}/education-type/get-all`
    );
  }

  updateEducationTypesList(educationTypes: Array<EducationTypeDto>) {
    return this._http.patch<EducationTypeDto>(
      `${environment.apiUrl}/education-type/update-from-list`,
      educationTypes
    );
  }

  updateUserName(userDto: UserReturnDto): Observable<UserReturnDto> {
    return this._http.patch<UserReturnDto>(
      `${environment.apiUrl}/student/update-profile-name`,
      userDto
    );
  }

  updateEducationsList(educations: Array<EducationDto>) {
    return this._http.patch<EducationDto>(
      `${environment.apiUrl}/education/updateEducationsList`,
      educations
    );
  }

  updateSkillsList(skills: UpdateSkillsDto) {
    return this._http.post<UpdateSkillsDto>(
      `${environment.apiUrl}/save-skills`,
      skills
    );
  }

  addEducation(education: EducationDto) {
    return this._http.post<EducationDto>(
      `${environment.apiUrl}/education/create`,
      education
    );
  }

  getCourses(dto: any): Observable<any> {
    return this._http.post<any>(
      `${environment.apiUrl}/get-courses`,
      dto
    );
  }

  getCertificates(dto: any): Observable<any> {
    return this._http.post<any>(
      `${environment.apiUrl}/get-certificates`,
      dto
    );
  }

  getAllAssessments(userId: number): Observable<any> {
    return this._http.post<any>(
      `${environment.apiUrl}/get-all-assessments`,
      { userId }
    );
  }

  deleteAssessment(dto): Observable<any> {
    return this._http.post<any>(
      `${environment.apiUrl}/delete-assessment`,
      dto
    );
  }

  markAsDone(dto): Observable<any> {
    return this._http.post<any>(
      `${environment.apiUrl}/mark-as-done`,
      dto
    );
  }

  /**
   * Get all Job Requirement Options
   */
  getAllJobRequirementOptions(): Observable<
    JobRequirementOptionDto[]
  > {
    return this._http.post<JobRequirementOptionDto[]>(
      `${environment.apiUrl}/get-skills`,
      {}
    );
  }
}
