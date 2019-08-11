import { HiddenDirective } from './common/hiddenDirective';
import { RequestInterceptorService } from './common/RequestInterceptorService';
import { HomeworkTermGuard } from './common/UnsearchedTermGuard';
import { AlwaysAuthChildrenGuard } from './common/AlwaysAuthChildrenGuard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,EventEmitter, Output} from '@angular/core';

import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';

import {AgGridModule} from 'ag-grid-angular'; // ag grid


import { HomeworkComponentNew } from './homework/homework.component';
import {DropdownModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DataTableModule} from 'primeng/datatable';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { Homeworkervice } from './homework/homeworkservice';
import { HttpModule } from '@angular/http';
import {SliderModule} from 'primeng/slider';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { NouisliderModule } from 'ng2-nouislider';
import {TabViewModule} from 'primeng/tabview';
import {TestDerectiveComp} from './testderective/testderective.component';
import {PickListModule} from 'primeng/picklist';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {TreeModule} from 'primeng/tree';
import { UploadFileService } from './testderective/UploadFileService';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {Ang4Component} from './testAngular4/Ang4.component';
import { ChangeTextDirective } from './testAngular4/change-text.directive';
import { SqrtPipe } from './testAngular4/app.sqrt.pipe';
import { RouterModule, Routes } from '@angular/router';

import {AlwaysAuthGuard} from './common/AlwaysAuthGuard';

import { NumberOnlyDirective } from './common/numberOnlyDirective';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';



const appRoutes: Routes = [
  { path: 'parent',  
  canActivateChild: [AlwaysAuthChildrenGuard],
  children: [
    {path: 'homeworknew', component: HomeworkComponentNew 
    
 }
  ]
    
  

},
{ path: 'testderective/:id',      
  component: TestDerectiveComp ,
  canActivate: [AlwaysAuthGuard],
  canDeactivate: [HomeworkTermGuard]
  

}
  /*{
    path: 'homeworknew',
    component: HomeworkComponentNew,
    data: { title: 'Heroes List' }
  },
   { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },*/
  ,{ path: '**', component: HomeworkComponentNew } 
];


@NgModule({
  declarations: [
    AppComponent ,HomeworkComponentNew,TestDerectiveComp ,Ang4Component , ChangeTextDirective , SqrtPipe,
    NumberOnlyDirective , HiddenDirective 
  ],
  exports: [NumberOnlyDirective, HiddenDirective]
,

  imports: [
    RouterModule.forRoot(
      appRoutes,
      {useHash: true} // <-- debugging purposes only
    ),

    BrowserModule,
    DataTablesModule,
    AgGridModule.withComponents([]),
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputTextareaModule,
    DataTableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    HttpModule,
    SliderModule,
    IonRangeSliderModule,
    NouisliderModule,
    TabViewModule,
    PickListModule,
    AngularFontAwesomeModule,
    TreeModule,
    FileUploadModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    
    
     
  ],
  providers: [ConfirmationService,Homeworkervice, UploadFileService, AlwaysAuthGuard , 
    AlwaysAuthChildrenGuard , HomeworkTermGuard,
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }*/
],
  bootstrap: [AppComponent]
})
export class AppModule { }

