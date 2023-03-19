import { Component, OnInit } from '@angular/core';
import { CookieService } from 'core/auth/service/cookie.service';
import { groupBy } from 'core/helper/functions';
import { EducationDto } from 'core/model/cv.model';
import { JobRequirementOptionDto } from 'core/model/job_requirement_option';
import { UserReturnDto } from 'core/model/user.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  // private
  private _unsubscribeAll: Subject<any>;

  public studentId: number;
  public educations: Array<EducationDto>;
  public skills: Array<JobRequirementOptionDto> = [];
  public loading: boolean = true;
  public selected: string = 'foryou';

  public currentUser: UserReturnDto = new UserReturnDto();
  public editable: Boolean = false;
  public submitted = false;

  public isCollapsed: boolean[] = [];

  loadDataSubscription: Subscription = new Subscription();

  groupBy = groupBy;

  constructor(private _cookieService: CookieService) {
    this._unsubscribeAll = new Subject();
    this.currentUser = JSON.parse(
      this._cookieService.getCookie('currentUser')
    );
    this.studentId = this.currentUser.id;
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.getDatasForProfile();
  }

  getDatasForProfile() {
    this.loading = false;
    this.currentUser = JSON.parse(
      this._cookieService.getCookie('currentUser')
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  changeView(selected: string) {
    this.selected = selected;
  }
}
