import { Component, Input, OnInit } from '@angular/core';
import { SkillDto } from 'core/model/cv.model';
import { SkillService } from 'core/services/skill.service';
import { CustomToastrService } from 'core/services/toastr.service';
import { forkJoin, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  @Input() currentUser;
  public loading: boolean = true;
  public skills: Array<SkillDto>;

  public level: string;
  public aIloading: boolean = false;
  public loadDataSubscription: Subscription = new Subscription();

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
      this.skillService.getSkillsbyUser(this.currentUser.id),
    ]).subscribe(
      ([skills]) => {
        this.skills = skills.skillList.map((e) => {
          e.level = 0;
          return e;
        });
        this.loading = false;
      },
      (error) => {
        this.toastrService.toastrError('Szaaaaaaar!!!');
      }
    );
  }

  getCourses(skill) {
    let dto = {
      id: skill.id,
      userId: this.currentUser.id,
      experienceLevel: skill.level,
    };

    this.aIloading = true;
    this.skillService
      .getCourses(dto)
      .pipe(first())
      .subscribe({
        next: (courses) => {
          let coursestest = null;
          coursestest = courses.detail;
          console.log(coursestest);
          if (coursestest.length == 0) {
            this.toastrService.toastrInfo('Try again!');
            this.aIloading = false;
          } else {
            this.skills.map((e) => {
              if (skill.id == e.id) {
                e.courses = courses.detail;
              }
              return e;
            });
            this.aIloading = false;
            this.toastrService.toastrSuccess(
              'Courses generated successfully!'
            );
          }
        },
        error: (e) => {
          this.aIloading = false;
          this.toastrService.toastrError(
            'An error occured while generating courses!'
          );
        },
      });
  }

  getCertificates(skill) {
    this.aIloading = true;
    let dto = {
      id: skill.id,
      userId: this.currentUser.id,
      experienceLevel: skill.level,
    };

    this.skillService
      .getCertificates(dto)
      .pipe(first())
      .subscribe({
        next: (certificates) => {
          let certificatestest = null;
          certificatestest = certificates.detail;
          console.log(certificatestest);
          if (certificatestest.length == 0) {
            this.toastrService.toastrInfo('Try again!');
            this.aIloading = false;
          } else {
            this.skills.map((e) => {
              if (skill.id == e.id) {
                e.certificates = certificates.detail;
              }
              return e;
            });
            this.aIloading = false;
            this.toastrService.toastrSuccess(
              'Certificates generated successfully!'
            );
          }
        },
        error: (e) => {
          this.aIloading = false;
          this.toastrService.toastrError(
            'An error occured while generating certificates!'
          );
        },
      });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
