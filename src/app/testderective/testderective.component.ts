import { TempModel } from './testderectivemodel';
import { Component, OnInit ,ViewChild, Input } from '@angular/core';
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
import {TreeNode} from 'primeng/api';

import { UploadFileService } from '../testderective/UploadFileService';
import { FileUpload } from './file-upload';

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { HOMEWORK } from '../homework/homework.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-test-directive',
  templateUrl: './testderective.component.html',
  styleUrls: ['./testderective.component.css'
]  

})
export class TestDerectiveComp implements OnInit {
  homeworkDetails =new HOMEWORK();
  gridDetails: HOMEWORK[]=[];
    
  userform: FormGroup;

    type : string;
    location : string;
    signatory : string ="";
    //executionDate : string;
    clauseDeviations : string ="";
    noteText : string= "";

  selectedHomeworkType: HOMEWORKTYPE =null;
  homeworkLocations: HOMEWORKALOCATION[];
  tempHomeworkLocations: HOMEWORKALOCATION[];
  selectedHomeworkLocation : HOMEWORKALOCATION =null;
  executionDateEdit: Date = null;
  saveDialog: boolean = false;
  
  myfile: any[] = [];
  
  rangeValues: number[] = [0 ,10,20,30,40,50,60,70,80,90,100];
  rangeValues1: number[] = [10];

  someRange2: any[] ;
  name : string;

  picklist1: any[];
    
  picklist2: any[];

  dataTree: TreeNode[];

  dataTreeRight: TreeNode[];

  selectedFile: any;
  selectedFile2: TreeNode;

  tempNode: TreeNode;
  dataArray: string[] = []; 

  

  constructor(private uploadService: UploadFileService, private route: ActivatedRoute ) { }
  

  @Input() homeworkTypes: HOMEWORKTYPE[];

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log(params);
      
    });

    
    this.name='kunal';

    this.picklist1 = ['a' , 'b' , 'c', 'd' , 'e'] ;//initialize list 1
    this.picklist2 = ['d' , 'e' ] ;//initialize list 2

    this.picklist1 = this.picklist1.filter(item => !this.picklist2.includes(item));

    this.dataTreeRight=[]


    this.dataTree=
    [
        {
            "label": "Documents",
            "data": "Documents Folder",
            "leaf":false,
            "children": [{
                    "label": "Work",
                    "data": "Work Folder",
                    "leaf":false,
                    "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document", "leaf":true}, 
                    {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document", "leaf":true}]
                },
                {
                    "label": "Home",
                    "data": "Home Folder",
                    "leaf":false,
                    "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month" , "leaf":true}]
                }]
        },
        {
            "label": "Pictures",
            "data": "Pictures Folder",
            "leaf":false,
            "children": [
                {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo" , "leaf":true},
                {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo" , "leaf":true},
                {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo" ,"leaf":true}]
        },
        {
            "label": "Movies",
            "data": "Movies Folder",
            "leaf":false,
            "children": [{
                    "label": "Al Pacino",
                    "data": "Pacino Movies",
                    "leaf":false,
                    "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie", "leaf":true},
                     {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie","leaf":true}]
                },
                {
                    "label": "Robert De Niro",
                    "data": "De Niro Movies",
                    "leaf":false,
                    "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie","leaf":true}, 
                    {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie", "leaf":true}]
                }]
        }
    ];



this.dataArray = ["Resume Document" , "Expenses Document","Invoices for this month","PrimeFaces Logo","Untouchables Movie"];

this.addLeafNodes(this.dataTree, this.dataArray,this.dataTree.length);

//this.checkNode(this.dataTree, this.dataArray);

this.dataTreeRight = [];


  }//ngOnInit ends



  canDeactivate(){
    return false;
  }
//Node tree start

  selectedFileTree: TreeNode[] = [];


/**
 * To fill data on page load
 * @param nodes 
 * @param str 
 * @param size 
 */
  addLeafNodes(nodes:TreeNode[], str:string[] ,size : number) {
    
    for(let i=0 ; i < nodes.length ; i++) {
    
      if(!nodes[i].children && str.includes(nodes[i].data) ){

        this.selectedFileTree.push(nodes[i]);
        
        nodes[i].partialSelected=false;

        //return 1;

      }else if(!nodes[i].children){

        //nodes[i].partialSelected=true;
      
      }else if(nodes[i].children){
        this.addLeafNodes(nodes[i].children, str,nodes[i].children.length); 

        let isParentPartial = false;
        for(let k=0 ; k < nodes[i].children.length ; k++) {

          if(nodes[i].children[k].partialSelected == undefined){
            isParentPartial= true;
            break;
          }
          else if(nodes[i].children[k].partialSelected && nodes[i].children[k].partialSelected == true){
            isParentPartial = true; 
            break;           
          }else{
            isParentPartial = false; 
          }
          
        }

        if(isParentPartial){
          nodes[i].partialSelected= true;
        }else{
          this.selectedFileTree.push(nodes[i]);
          nodes[i].partialSelected= false;
        }

      }
    }
 
  }

  nodeSelect(e){

    this.dataTreeRight =[];
    for(var j=0 ; j< this.selectedFileTree.length ;j++)
      {
      if(this.selectedFileTree[j].children == undefined )
       {
      
      this.dataTreeRight.push(this.selectedFileTree[j]);
   }
  }
}

  nodeUnselect(e){
    
  this.nodeSelect(e);

   }

  nodeExpand(e)
  {
   //alert("nodeExpand");
    this.selectedFile;
    
  }

  //Node tree ends

//Calling child method from parent directive using @viewChild  start
  callingChildMethodFromParent(){

    alert("Hi inside callingChildMethodFromParent");
    this.name='naik';
    alert(this.homeworkTypes);

  }
//Calling child method from parent directive using @viewChild  ends 


//Picklist start
updatePicklist(e){

    let test = this.picklist1.filter(item => item == 'a');

    let ct = this.picklist1.indexOf(test[0])

    this.picklist1.splice(ct,1);

    this.picklist2.push(test);

    this.dataTreeRight;

   // this.picklist1 = ['a-new' , 'b-new' , 'c-new'] ;//initialize list 1
   // this.picklist2 = ['d-new' , 'e-new' , 'f-new'] ;//initialize list 2

  }

  //Picklist end

fileList : File[];

//locally file upload starts
 
onSubmitUploadFiles(){
  let lTempModel = new TempModel();
  const formData: any = new FormData();
  const files: Array<File> = this.filesToUpload;
  lTempModel.fileArray = this.filesToUpload;
  console.log(files);

 this.uploadService.uploadFile(lTempModel).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      //this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      console.log('File is completely uploaded!');
    }
  })
;
}

//locally file upload ends 
  selectedFilesUpload: FileList;

  filesToUpload: Array<File> = [];

  selectFile(event){
    this.selectedFilesUpload = event.target.files;
    this.filesToUpload.push(event.target.files[0]);


  }


  selectFileMultiple(event){
    this.selectedFilesUpload = event.target.files;
  }

//File document management starts
fileUploads: Observable<Array<FileUpload>>;
  /**
   * Upload File
   */
  upload(){
    const file = this.selectedFilesUpload.item(0);


    //this.uploadService.uploadfile(file);
  }

  showFile = false;
  

  /**
   * Get list of files
   * @param enable 
   */
  showFiles(enable: boolean) {
    this.showFile = enable;
 
    if (enable) {
      //this.fileUploads = this.uploadService.getlistOfFiles();
    }
  }

/**
 * Delete file
 * @param file 
 */
  delete(file) {
    //this.uploadService.deleteFile(file);
  }
//File document management ends


  
}

interface HOMEWORKTYPE {
    id : string;
    code : string;
}

interface HOMEWORKALOCATION {
    id : string;
    code : string;
}


class Temp{

  label : string;
  data : string;

constructor(){        
    }

}