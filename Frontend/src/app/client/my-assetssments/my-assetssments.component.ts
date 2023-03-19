import { Component, Input, OnInit } from '@angular/core';
import { Assessment, SkillDto } from 'core/model/cv.model';
import { SkillService } from 'core/services/skill.service';
import { CustomToastrService } from 'core/services/toastr.service';
import { forkJoin, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-assetssments',
  templateUrl: './my-assetssments.component.html',
  styleUrls: ['./my-assetssments.component.scss'],
})
export class MyAssetssmentsComponent implements OnInit {
  @Input() currentUser;
  public assessments: Array<Assessment> = [];
  public loadDataSubscription: Subscription = new Subscription();
  public loading: boolean = false;
  constructor(
    private skillService: SkillService,
    private toastrService: CustomToastrService
  ) {}

  ngOnInit(): void {
    this.getDatasForProfile();
  }

  getDatasForProfile() {
    this.loading = true;
    this.loadDataSubscription = forkJoin([
      this.skillService.getAllAssessments(this.currentUser.id),
    ]).subscribe(
      ([assessments]) => {
        this.assessments = assessments.skillList;
        this.loading = false;
      },
      (error) => {
        this.toastrService.toastrError('Szaaaaaaar!!!');
      }
    );
  }

  deleteAssessment(assessment, id) {
    let dto = {
      id: assessment.id,
      userId: this.currentUser.id,
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonColor: '#da0037',
      cancelButtonColor: '#080a18',
      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.skillService.deleteAssessment(dto).subscribe({
          next: () => {
            this.assessments.forEach((e) => {
              if (e.id === id) {
                e.courseList = e.courseList.filter(
                  (x) => x.id != assessment.id
                );
                e.certificateList = e.certificateList.filter(
                  (x) => x.id != assessment.id
                );
              }
            });
            this.toastrService.toastrSuccess(
              'Assessment deleted successfully!'
            );
            this.loading = false;
          },
          error: (e) => {
            this.toastrService.toastrError(
              'An error occurred while deleting the assessment!'
            );
            this.loading = false;
          },
        });
      }
    });
  }

  getProgressInSkill(assessment, id) {
    let done = 0;
    let all = 0;

    assessment.courseList.forEach((x) => {
      if (x.courseFile == '1') {
        done++;
      }
      all++;
    });
    assessment.certificateList.forEach((x) => {
      if (x.certificateFile == '1') {
        done++;
      }
      all++;
    });

    let progress = (done * 100) / all;

    return progress;
  }

  markAsDone(assessment, id) {
    let dto = {
      id: assessment.id,
      userId: this.currentUser.id,
    };

    this.loading = true;
    this.skillService.markAsDone(dto).subscribe({
      next: () => {
        this.assessments.forEach((e) => {
          if (e.id === id) {
            e.courseList = e.courseList.map((x) => {
              if (x.id == assessment.id) {
                x.courseFile = '1';
              }
              return x;
            });
            e.certificateList = e.certificateList.map((x) => {
              if (x.id == assessment.id) {
                x.certificateFile = '1';
              }
              return x;
            });
          }
        });
        this.toastrService.toastrSuccess(
          'Assessment marked as done successfully!'
        );
        this.loading = false;
      },
      error: (e) => {
        this.toastrService.toastrError(
          'An error occurred while marking as done your assessment!'
        );
        this.loading = false;
      },
    });
  }
}
