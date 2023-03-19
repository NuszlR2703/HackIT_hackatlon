import { Component, OnInit } from '@angular/core';
import { EducationTypeDto } from 'core/model/cv.model';
import { SkillService } from 'core/services/skill.service';
import { CustomToastrService } from 'core/services/toastr.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-education-type',
  templateUrl: './education-type.component.html',
  styleUrls: ['./education-type.component.scss'],
})
export class EducationTypeComponent implements OnInit {
  loading = false;

  public educationTypes: Array<EducationTypeDto> = [];

  constructor(
    private skillService: SkillService,
    private toastrService: CustomToastrService
  ) {}

  ngOnInit(): void {
    this.skillService
      .getEducationTypes()
      .pipe(first())
      .subscribe({
        next: (educationTypes) => {
          this.loading = false;
          this.educationTypes = educationTypes;
        },
        error: (e) => {
          this.toastrService.toastrError(
            'An error occurred while loading the education types!'
          );
        },
      });
  }
  addNewEducationTypeItem() {
    this.educationTypes.push(new EducationTypeDto());
  }

  removeFromList(id: number) {
    this.educationTypes = this.educationTypes.filter(
      (e) => e.id !== id
    );
  }

  saveEducationTypes() {
    this.skillService
      .updateEducationTypesList(this.educationTypes)
      .pipe(first())
      .subscribe({
        next: (educationTypes) => {
          console.log(educationTypes);
          this.loading = false;
        },
        error: (e) => {
          this.toastrService.toastrError(
            'An error occurred while create the new education type!'
          );
        },
      });
  }
}
