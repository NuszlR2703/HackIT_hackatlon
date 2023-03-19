import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { forkJoin, Subject, Subscription } from 'rxjs';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { CookieService } from 'core/auth/service/cookie.service';
import { UserReturnDto } from 'core/model/user.model';
import { CustomToastrService } from 'core/services/toastr.service';
import { first } from 'rxjs/operators';
import { StudentService } from 'core/services/client.service';
import { SkillService } from 'core/services/skill.service';
import {
  EducationDto,
  EducationTypeDto,
  SkillDto,
  UpdateSkillsDto,
} from 'core/model/cv.model';
import { JobRequirementOptionService } from 'core/services/job_requirement_option.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageDto } from 'core/model/file.model';
import { JobRequirementOptionDto } from 'core/model/job_requirement_option';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public data: any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true,
  };

  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public avatarImage: Blob;
  public currentUser: UserReturnDto = new UserReturnDto();
  public student: UserReturnDto = new UserReturnDto();
  public studentd: number;
  public loading: boolean;
  public educations: Array<EducationDto> = [];
  public skills: Array<JobRequirementOptionDto> = [];
  public SelectTag;
  public selectedOption = 8;
  public ColumnMode = ColumnMode;
  public selectBasicLoading = false;
  public src = '';

  croppedImage: any;
  imageDto: ImageDto = new ImageDto();
  cropperLoaded: boolean = false;
  currentFileUpload: File;
  imageChangedEvent: any;

  public jobRequirements = [];
  public educationTypes: Array<EducationTypeDto> = [];
  public isRequiredFull: boolean = true;

  // private
  private _unsubscribeAll: Subject<any>;

  private loadDataSubscription: Subscription = new Subscription();
  private saveGeneralDataSubscription: Subscription =
    new Subscription();

  constructor(
    private cookieService: CookieService,
    private studentService: StudentService,
    private skillService: SkillService,
    private toastrService: CustomToastrService,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
    this.currentUser = JSON.parse(
      this.cookieService.getCookie('currentUser')
    );
    this.studentd = this.currentUser.id;
  }

  getDatasForProfile() {
    this.loading = true;
    this.loadDataSubscription = forkJoin([
      this.skillService.getSkillsbyUser(this.currentUser.id),
      this.skillService.getAllJobRequirementOptions(),
    ]).subscribe(
      ([skills, jobRequirementOptions]) => {
        this.SelectTag = skills.skillList;

        this.jobRequirements = jobRequirementOptions;

        this.loading = false;
      },
      (error) => {
        this.toastrService.toastrError(error.error.messages[0]);
      }
    );
  }

  saveStudentSkills() {
    let updateSkillsDto: UpdateSkillsDto = new UpdateSkillsDto();
    updateSkillsDto.userId = this.currentUser.id;
    this.SelectTag.forEach((element) => {
      updateSkillsDto.skillList.push(element);
    });

    this.skillService
      .updateSkillsList(updateSkillsDto)
      .pipe(first())
      .subscribe({
        next: (skills) => {
          this.loading = false;
        },
        error: (e) => {
          this.toastrService.toastrError(
            'An error occurred while create the new position!'
          );
        },
      });
  }

  saveStudentEducations() {
    this.skillService
      .updateEducationsList(this.educations)
      .pipe(first())
      .subscribe({
        next: (educations) => {
          this.loading = false;
        },
        error: (e) => {
          this.toastrService.toastrError(
            'An error occurred while create the new position!'
          );
        },
      });
  }

  removeFromList(id: number) {
    this.educations = this.educations.filter((e) => e.id !== id);
    this.checkBeforeSave();
  }

  checkBeforeSave() {
    let bool: boolean = true;
    this.educations.forEach((e) => {
      if (
        !e.cvDtoID ||
        !e.institutionName ||
        !e.major ||
        !e.type ||
        !e.startDate ||
        !e.endDate
      ) {
        bool = false;
      }
    });
    this.isRequiredFull = bool;
  }

  uploadImage(file: any) {
    if (this.croppedImage.size == 0) {
      return;
    }
    let formData = new FormData();
    formData.append('file', file);
    this.studentService
      .upLoadFile(
        formData,
        this.student.id,
        'profile-pictures/',
        'student/'
      )
      .pipe(first())
      .subscribe({
        next: (file) => {
          this.src = file.fileDownloadUri;
          this.toastrService.toastrSuccess(
            'File has been uploaded successfully!'
          );
        },
        error: (e) => {
          this.toastrService.toastrError(
            'Error with uploading image!'
          );
        },
      });
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  /**
   * Upload new profile image to the server
   */

  onSubmitImage() {
    var file: Blob = this.dataURLtoFile(
      this.croppedImage,
      (
        new Date().getTime().toString() +
        Math.random() * 1000
      ).replace('.', '') + '.png'
    );
    this.uploadImage(file);
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  handleFileChange(event: any) {
    this.imageChangedEvent = event;
    document.getElementById('openModalThumbnailButton').click();
  }

  addNewEducationItem() {
    this.isRequiredFull = false;
    let newEducation: EducationDto = new EducationDto();
    this.educations.push(newEducation);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.getDatasForProfile();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
