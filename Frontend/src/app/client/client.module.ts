import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from 'core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from 'core/pipes/pipes.module';
import { CoreDirectivesModule } from 'core/directives/directives';
import { CoreSidebarModule } from 'core/components';
import { SharedModule } from 'app/shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SettingsComponent } from './profile-settings/profile-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientLayoutComponent } from './layout/client-layout.component';
import { SkillsComponent } from './skills/skills.component';
import { MyAssetssmentsComponent } from './my-assetssments/my-assetssments.component';

// routing
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { animation: 'decommerce' },
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    data: { animation: 'myprofile' },
  },
  {
    path: 'profile-settings',
    component: SettingsComponent,
    data: { animation: 'account-settings' },
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    SettingsComponent,
    ClientLayoutComponent,
    SkillsComponent,
    MyAssetssmentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    CommonModule,
    ContentHeaderModule,
    FormsModule,
    NgApexchartsModule,
    TranslateModule,
    NgSelectModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    NgxDatatableModule,
    SharedModule,
    FlatpickrModule.forRoot(),
    AngularEditorModule,
    FormsModule,
  ],
  exports: [],
  providers: [DatePipe],
})
export class ClientModule {}
