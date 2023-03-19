import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';
@NgModule({
  declarations: [LoaderComponent, PreLoaderComponent],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [LoaderComponent, PreLoaderComponent],
})
export class SharedModule {}
