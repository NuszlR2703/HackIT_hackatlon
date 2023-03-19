import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './layout/layout.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreDirectivesModule } from 'core/directives/directives';
import { CoreSidebarModule } from 'core/components';
import { CorePipesModule } from 'core/pipes/pipes.module';

import { CoreCommonModule } from 'core/common.module';
import { SharedModule } from 'app/shared/shared.module';
import { EducationTypeComponent } from './education-type/education-type.component';

// routing
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { animation: 'decommerce' },
  },
  {
    path: 'education-type',
    component: EducationTypeComponent,
    data: { animation: 'EducationTypeComponent' },
  },
];

@NgModule({
  declarations: [DashboardComponent, LayoutComponent],
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
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    NgxDatatableModule,
    SharedModule,
    Ng2FlatpickrModule,
  ],
  exports: [],
  providers: [DatePipe],
})
export class AdminModule {}
