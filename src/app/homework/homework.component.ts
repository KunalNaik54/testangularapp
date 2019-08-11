import { NumberOnlyDirective } from './../common/numberOnlyDirective';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { HOMEWORK } from '../homework/homework.model';
import { GridOptions} from 'ag-grid';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { Homeworkervice } from '../homework/homeworkservice';
import {Http} from '@angular/http';

import {IonRangeSliderComponent} from "ng2-ion-range-slider";

import {TestDerectiveComp} from "../testderective/testderective.component";



@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css'],
  //directives:[NumberOnlyDirective],
  /* '../../dashboard.css'  */ // , './rich-grid.css' ,
  providers: [Homeworkervice] 

})
export class HomeworkComponentNew implements OnInit {

  @ViewChild(TestDerectiveComp)
  private testDerectiveComp: TestDerectiveComp;


  homeworkDetails =new HOMEWORK();
  gridDetails: HOMEWORK[]=[];
  homeworkDetailList: HOMEWORK[]=[];
  
  userform: FormGroup;

    col1 : string;
    col4 : string;
    col2 : string ="";
    col5 : string ="";
    
  homeworkTypes: HOMEWORKTYPE[];
  selectedHomeworkType: HOMEWORKTYPE =null;
  homeworkLocations: HOMEWORKALOCATION[];
  tempHomeworkLocations: HOMEWORKALOCATION[];
  selectedHomeworkLocation : HOMEWORKALOCATION =null;
  homeDateEdit: Date = null;
  saveDialog: boolean = false;
  

  //Reactive forms start
  col4Form = new FormControl('', [Validators.required, Validators.maxLength(15)]); 
  col4FormModel : string;
  selectedHomeworkLocationForm = new FormControl('', [Validators.required, Validators.maxLength(15)]); 
  selectedHomeworkLocationModel : string;
  

  tempform: FormGroup;
  //Reactive form end

  errors: string[];

  gridOptions : GridOptions;
  private components;

  homeworkEdit = new HOMEWORK();
  

  val: number;
  rangeValues: number[] = [0 ,10,20,30,40,50,60,70,80,90,100];
  rangeValues1: number[] = [10];

  someRange2: any[] ;

  minVal : any;

  someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    start : [1,50],
    margin: 1,
    /* format: wNumb({
      decimals: 1,
      thousand: '.',
      postfix: "days"
      
      
    })
    , */ 
    tooltips: true,
    step: 1,
    //limit: 5, // NOTE: overwritten by [limit]="10"
    range: {
      min: 0,
      max: 100,
    },
    pips: {
      //mode: 'steps',
      //density: 5
      mode: 'count',
    density: 2,
    values: 6,
    stepped: true
    }
  };
  
  
  
  @ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;



  constructor(
    private confirmationService: ConfirmationService, private fb: FormBuilder ,
    private homeworkservice: Homeworkervice, private http:Http) { }
  

    ngOnInit() {


    
    this.sliderElement;
    this.http.get('http://localhost:8090/home/testToken')
    .map(data => {
      data.json();
      console.log("I CAN SEE DATA HERE: ", data.json());
});


//Reactive forms start
this.col4Form.setValue('');
//Reactive forms start

this.homeworkservice;

this.homeworkservice.name='kunal';

this.tempform = this.fb.group({
  tempselectedHomeworkLocationForm : new FormControl('',Validators.required )
});

    this.userform = this.fb.group({
     
  });


  this.errors = [];
  this.homeworkTypes = [
            {id: 'SELECT', code: 'SELECT'},
            {id: 'col11', code: 'col11'},
            {id: 'col12', code: 'col12'},
            {id: 'col13', code: 'col13'},
            {id: 'col14', code: 'col14'},
            {id: 'col15', code: 'col15'}
        ];

this.homeworkLocations = [
            {id: 'SELECT', code: 'SELECT'},
            {id: 'col41', code: 'col41'},
            {id: 'col42', code: 'col42'},
            {id: 'col43', code: 'col43'},
            {id: 'col44', code: 'col44'},
            {id: 'col45', code: 'col45'}
        ];


        this.tempHomeworkLocations = [
          {id: 'col41', code: 'col41'},
          {id: 'col42', code: 'col42'},
          {id: 'col43', code: 'col43'},
          {id: 'col44', code: 'col44'},
          {id: 'col45', code: 'col45'}
      ];
    //this.getHomeworkDetails(); 
//Grid Modification starts

this.homeworkDetailList = [
    {col1: "col1",col2: "col21", col5: "Clause1", col3 : "col21" , col4 : "01-03-2018",col6: ""},
    {col1: "col1",col2: "col22", col5: "Clause2", col3 : "col22" , col4 : "02-03-2018",col6: ""},
    {col1: "col1",col2: "col23", col5: "Clause3", col3 : "col23" , col4 : "03-03-2018",col6: ""},
];

  
}//ngOnInit ends

sliderButton(e){
 console.log("Hi");
 //this.someRange2;
 this.someRange2=["25","35"]

 this.testDerectiveComp.callingChildMethodFromParent();
}

update(slider, event) {
    console.log("Slider updated: ");
    slider.onUpdate = event;
  }

  finish(slider, event) {
    console.log("Slider finished: ");

    //this.sliderElement.update({from: "50", to:"60"});

    slider.onFinish = event;
  }

  onstarSliderStart(slider, event){
    event.from="50";
     event.to="60";
    //this.sliderElement.update({from: "50", to:"60"});
  }

  setAdvancedSliderTo(from, to) {
    this.sliderElement.update({from: from, to:to});
  }



  cancleHomework(){
  
  //this.router.navigate(['/path']);



}

saveHomework(){

//Form related code

/* console.log(this.homeDateEdit);
this.homeDateEdit.setMinutes(this.homeDateEdit.getTimezoneOffset() );
console.log(this.homeDateEdit); */

this.col4Form;
this.selectedHomeworkLocationForm;
//Formrelated code

this.homeworkservice.name="naik";


this.selectedHomeworkType;
this.selectedHomeworkLocation;
this.col4;
this.col5;

this.errors = [];

if(this.selectedHomeworkType == null){
  this.errors.push("Please enter  Type. ");
}
if(this.selectedHomeworkLocation == null){
  this.errors.push("Please enter  Location. ");
}
if(this.col4 == ""){
  this.errors.push("Please enter col4. ");
}
if(this.homeDateEdit == null){
  this.errors.push("Please enter homeDateEdit Date. ");
}

if(this.errors.length == 0){

this.saveDialog = true;;

let currDate : Date = new Date();
 
this.homeworkDetailList = [
  {col1: "col11",col2: "col21", col5: "Clause1", col3 : "col31" , col4 : "01-03-2018",col6: ""},
  {col1: "col12",col2: "col22", col5: "Clause2", col3 : "col32" , col4 : "02-03-2018",col6: ""},
  {col1: "col13",col2: "col23", col5: "Clause3", col3 : "col33" , col4 : "03-03-2018",col6: ""},
  {col1: "col14",col2: "col24", col5: "Clause4", col3 : "col34" , col4 : "04-04-2018",col6: ""},
];

this.clearHomeworkEdit();
}
}

clearHomeworkEdit(){


        this.selectedHomeworkType = null;
        this.selectedHomeworkLocation = null;
        this.col4 = "";
        this.homeDateEdit = null;
        this.col5 = "";
}

editHomeworkRecord(e,row) {

window.alert('Sample button pressed!! ');
//let data = e.data;
this.selectedHomeworkType = this.homeworkTypes.filter(homeworktype => homeworktype.code == row.type )[0];
this.selectedHomeworkLocation = this.homeworkLocations.filter(homeworkloc => homeworkloc.code == row.col4 )[0];
this.col4 = row.col4;

let date = row.executionDate.split("-");
let executionDate = date[1] +'-'+date[0]+'-'+date[2];
this.homeDateEdit = new Date(executionDate);
this.col5 = row.col5;

}



deleteRecord(homeworkDeleteObj : HOMEWORK){
window.alert('Sample button pressed!! deleteRecord');

this.homeworkDetailList = [
  {col1: "col11",col2: "col21", col5: "Clause1", col3 : "col31" , col4 : "01-03-2018",col6: ""},
  {col1: "col12",col2: "col22", col5: "Clause2", col3 : "col32" , col4 : "02-03-2018",col6: ""},
  {col1: "col13",col2: "col23", col5: "Clause3", col3 : "col33" , col4 : "03-03-2018",col6: ""},
];



this.gridOptions.api.setRowData(this.homeworkDetailList);

}

editRecord(homeworkEditObj : HOMEWORK){

}

public editHomeworkRecord1(e) {

let data = e.data;

}



public deleteHomeworkRecord(e,row) {

  window.alert('Sample button pressed!! ');

  this.confirmationService.confirm({
    message: 'Do you want to delete  Record?',
    accept: () => {
      this.homeworkDetailList = [
        {col1: "col11",col2: "col21", col5: "Clause1", col3 : "col31" , col4 : "01-03-2018",col6: ""},
        {col1: "col12",col2: "col22", col5: "Clause2", col3 : "col32" , col4 : "02-03-2018",col6: ""},
        {col1: "col13",col2: "col23", col5: "Clause3", col3 : "col33" , col4 : "03-03-2018",col6: ""},
      ];
    }
});

  
  
  
}

/**
 * Function get call on Row click of Grid --Kunal
 * 
 */
public onRowClicked(e) {
  if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

this.homeworkEdit.col1 = data.type;
this.homeworkEdit.col4 =data.executionDate;
this.homeworkEdit.col2 = data.col4;
this.homeworkEdit.col3 = data.col3;
this.homeworkEdit.col5 = data.col5;

      if(actionType == "edit") {
           this.editRecord(this.homeworkEdit);
          }else if(actionType == "delete"){
        this.deleteRecord(this.homeworkEdit);
      }
  }
}



  public homeworkAdd(){}
  
}



interface HOMEWORKTYPE {
    id : string;
    code : string;
}

interface HOMEWORKALOCATION {
    id : string;
    code : string;
}