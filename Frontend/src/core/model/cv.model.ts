import { CertificationDto, CourseDto } from './course.model';
import { JobRequirementOptionDto } from './job_requirement_option';

export class SkillDto {
  id: number;
  skillName: string;
  level?: number;
  courses: Array<CourseDto> = [];
  certificates: Array<CertificationDto> = [];
}

export class SkillDtoList {
  skillList: Array<SkillDto>;
}

export class UpdateSkillsDto {
  userId: number;
  skillList: Array<SkillDto> = [];
}

export class EducationDto {
  id?: number;
  cvDtoID: number;
  major: String;
  institutionName: string;
  startDate: Date;
  endDate: Date;
  active: Boolean;
  type: EducationTypeDto;
}

export class EducationTypeDto {
  id?: number;
  name: string;
}

export class Assessment {
  id: number;
  skillName: string;
  courseList: Array<CourseDto>;
  certificateList: Array<CertificationDto>;
}
