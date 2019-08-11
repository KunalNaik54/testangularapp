import { UploadFileService } from './testderective/UploadFileService';
import { TempModel } from './testderective/testderectivemodel';
import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { GridOptions} from 'ag-grid';
import {Router , 
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as html2canvas from "html2canvas"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  './ag-grid.css',
  './ag-theme-balham.css'],

})
export class AppComponent implements OnInit {
  title = 'app';
  productList : any;
  gridOptions : GridOptions;
  loading = true

  template: string =`<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`


  @Output() open: EventEmitter<any> = new EventEmitter();

  public components;
  
  constructor(private router: Router ,private spinnerService: Ng4LoadingSpinnerService,
    private uploadService: UploadFileService ){
    
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })


  }// constructor ends

goTestDirective(){
  this.router.navigate(['testderective']); 
}
goHomecomponent(){
  this.router.navigate(['homeworknew']); 
}

navigationInterceptor(event: RouterEvent): void {

   if (event instanceof NavigationStart) {
    this.spinnerService.show();
  }
  if (event instanceof NavigationEnd) {
    this.spinnerService.hide();
  }

  // Set loading state to false in both of the below events to hide the spinner in case a request fails
  if (event instanceof NavigationCancel) {
    this.spinnerService.hide();
  }
  if (event instanceof NavigationError) {
    this.spinnerService.hide();
  }
}



ngOnInit()
{

  this.spinnerService.show();

  this.productList = [{id : 1 , name : "name1"} ,
    {id : 2 , name : "name2"}];

  this.gridOptions = <GridOptions>{};
  this.gridOptions.rowData = [
    {make: "Toyota1", model: "Celica1", price: 35000,country: "",edit:""},
    {make: "Ford2", model: "Mondeo2", price: 32000,country: "",edit:""},
    {make: "Porsche3", model: "Boxter3", price: 72000,country: "",edit:""}
];

this.gridOptions.columnDefs = [
  {
    headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
    suppressMenu: true, pinned: true
  },
  {headerName: "MakeHeader", field: "make" , width : 150 },
  {headerName: "ModelHeader", field: "model" , width : 150},
  {headerName: "PriceHeader", field: "price" , width : 150},
  {
    headerName: "Country", field: "country", width: 150,
    cellRenderer: "singleClickEditRenderer"
    //filterParams: {cellRenderer: singleClickEditRenderer, cellHeight: 20}
  },
  {
    headerName: "Edit", field: "edit", width: 150,
    cellRenderer: "moodCellRenderer"
    
    //filterParams: {cellRenderer: singleClickEditRenderer, cellHeight: 20}
  }

];

this.gridOptions.rowHeight = 50;
this.gridOptions.headerHeight = 40;


this.components = { singleClickEditRenderer: this.getRenderer() ,
  moodCellRenderer: MoodCellRenderer};

} //ngOnInit ends



private percentCellRenderer(params) {
  
  var eValue = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = 'Hi Kunal Here';

  var eOuterDiv = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  
  return eOuterDiv;
}

deleteRecord(){

  window.alert('Sample button pressed!! deleteRecord');
}

editRecord(){

  window.alert('Sample button pressed!! editRecord');

}

public onRowClicked(e) {
  if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      if(actionType == "edit") {
           this.editRecord();
          }else if(actionType == "delete"){
        this.deleteRecord();
      }
  }
}



myTestFunctionInsideComp(emit : any){
  this.productList;
  window.alert('Sample button pressed!! myTestFunctionInsideComp');
  console.log(" Inside myTypeScriptFunction myTestFunctionInsideComp");

if(emit.target.value == 'edit')
{
  this.editRecord();
}else if(emit.target.value == 'delete'){

  this.deleteRecord();
}

}

captureScreenshot(){
  html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas);
    var url = canvas.toDataURL('image/jpeg', 1.0);
    //var file = this.dataURItoBlob(url);
    //const imageFile = new File([file], 'TestImg', { type: 'image/jpeg' });

var self = this ;

function sendFile(blob){
   let lTempModel = new TempModel();
   const formData: any = new FormData();
   let  files: Array<File> = [];
   files.push(new File([blob], "Screenshot",{type: 'image/jpeg'}));      
   lTempModel.fileArray = files;


   self.uploadService.uploadFile(lTempModel).subscribe(event => {
   console.log('sucess');
   });
 };

  let bindThis = sendFile.bind('uploadService',this.uploadService);
  
  //bindThis();
    var blob = canvas.toBlob(sendFile,'image/jpeg');

    console.log('Outside' +blob);
//Upload File

//Upload File end

    console.log('inside Canvas');
  });
  
console.log('outside Canvas');
}

uploadCanvas() {
  
}

getRenderer() {
  
  function CellRenderer() {}
  CellRenderer.prototype.createGui = function() {
  // var templateEdit =
    //  "<span><button id='theEditButton'><img border='0' width='15' height='10' style='margin-bottom: 2px' src='favicon.ico'></img> </button><span id='theValue' style='padding-left: 4px;'></span></span>";
   
    
var templateEdit =
     "<span><button id='theEditButton' value='edit' data-action-type='edit' (click)='onButtonClick(edit)'><img data-action-type='edit' border='0' width='15' height='10' style='margin-bottom: 2px' src='favicon.ico'></img> </button> <span id='theValue' style='padding-left: 4px;'></span>";
var templateDelete =
      "<button id='theDeleteButton' value='delete' data-action-type='delete' (click)='onButtonClick(delete)'><img data-action-type='delete' border='0' width='15' height='10' style='margin-bottom: 2px' src='favicon.ico'></img> </button></span>";
   
  //var templateEdit =
  //"<span><button id='theEditButton' value='edit' data-action-type='edit' (click)='onButtonClick(edit)'></button> <span id='theValue' style='padding-left: 4px;'></span>";
  //var templateDelete =
  //"<button id='theDeleteButton' value='delete' data-action-type='delete' (click)='onButtonClick(delete)'></button></span>";



  var tempEditDiv = document.createElement("div");
  tempEditDiv.innerHTML = templateEdit + templateDelete;
    this.eGui = tempEditDiv.firstElementChild;
    
    //var tempDeleteDiv = document.createElement("div");
    //tempDeleteDiv.innerHTML = templateDelete;
    //this.eGui = tempDeleteDiv.firstElementChild;

  };
 
  

  CellRenderer.prototype.init = function(params) {
    this.createGui();
    this.params = params;
    var eValue = this.eGui.querySelector("#theValue");
    eValue.innerHTML = params.value;
    this.eButtonEdit = this.eGui.querySelector("#theEditButton");
   // this.eButtonDelete = this.eGui.querySelector("#theEditButton");
    
    //this.eButtonEdit = this.eGui.querySelector("#theEditButton");
    this.eButtonDelete = this.eGui.querySelector("#theDeleteButton");
    this.buttonClickListener = this.onButtonClicked.bind(this);
    this.eButtonEdit.addEventListener("click", this.buttonClickListener);
    this.eButtonDelete.addEventListener("click", this.buttonClickListener)
  };
  CellRenderer.prototype.onButtonClicked = function(button: any) {
    var startEditingParams = {
      rowIndex: this.params.rowIndex,
      colKey: this.params.column.getId()

    };
    this.params.api.startEditingCell(startEditingParams);
    window.alert('Sample button pressed!!'+ button.currentTarget.value);
    
   // myTestFunctionoutsideComp();
   //CellRenderer.prototype.myTestFunctionInsidegetRender();
     // this.open.emit(null);
       
  };
  
  CellRenderer.prototype.myTestFunctionInsidegetRender = function() {
    
    window.alert('Sample button pressed!! CellRenderer.prototype.myTestFunctionInsidegetRender');
  console.log(" Inside myTypeScriptFunction CellRenderer.prototype.myTestFunctionInsidegetRender");
    
  };

  CellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  CellRenderer.prototype.destroy = function() {
    this.eButton.removeEventListener("click", this.buttonClickListener);
  };
  return CellRenderer;
}


}


function myTestFunctionoutsideComp(){
  window.alert('Sample button pressed!! myTestFunctionoutsideComp');
  console.log(" Inside myTypeScriptFunction  myTestFunctionoutsideComp");
}

//function countryCellRenderer(params) {
//  var flag = "<button (click)='myTestFunction()'><img border='0' width='15' "+
//   " height='10' style='margin-bottom: 2px' src='favicon.ico'></img></button>";
//  return flag;
//}

function MoodCellRenderer() {
}

MoodCellRenderer.prototype.init = function (params) {

  var templateDelete =
      "<button id='theDeleteButton' value='delete' (click)='myTestFunctionInsideComp()'><img border='0' width='15' height='10' style='margin-bottom: 2px' src='favicon.ico'></img> </button></span>";
   
    this.eGui = document.createElement('span');
    if (params.value !== "" || params.value !== undefined || params.value !== null) {
        var imgForMood = params.value === 'Happy' ? 'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/images/smiley.png' : 'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/images/smiley-sad.png';
        this.eGui.innerHTML = templateDelete;
    }
};

MoodCellRenderer.prototype.getGui = function () {
    return this.eGui;
};






