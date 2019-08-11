import { TempModel } from './testderectivemodel';
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { FileUpload } from './file-upload';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import {Http, RequestOptionsArgs, RequestOptions, Headers} from "@angular/http";

@Injectable()
export class UploadFileService {

  apiBaseURL = 'http://127.0.0.1:8000/api/'

    /**
     * To be uncomment to check Amazon s3 web service
     * 
     * FOLDER = 'jsa-s3/';
    BUCKET = 'jsa-angular4-bucket-kmn';
*/
    constructor(private http: HttpClient) { }


//Upload file locally start

uploadFile(fileModel : TempModel) : Observable<HttpEvent<{}>>  { 
  let formdata: FormData = new FormData();
  fileModel.type = "type1";

  //formdata.append("file", fileReader.result);
            let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
            //headers.append("Content-Type", "");
            //headers.set("Access-Control-Allow-Origin","*");
            //headers.set('Authorization', 'Basic ' +
            //btoa('kunal:kunal')); 
 

            //options.headers.append("Content-Type", "");

  for(let i =0; i < fileModel.fileArray.length; i++){
    formdata.append("uploadingFiles", fileModel.fileArray[i]);
}

//fileModel.fileArray = "fileArray";
//formdata.append("fdata", JSON.stringify(fileModel));

  const req = new HttpRequest('POST', 'http://localhost:8080/springbootbasic/fileupload', formdata, {
    reportProgress: true,
    responseType: 'text',
    headers
  });

  return  this.http.request(req);
//let fileList =   fileModel.fileArray;
 // console.log('form data variable :   '+ formData.toString());
 //   this.http.post('http://localhost:8080/home/upload',  formdata)
     //   .map(files => files)
   //     .subscribe(files => console.log('files', files))


    //this.http.post('apiUrl', formModel)

   }


//Upload file locally ends




/**
 * Upload file in aws
 * 
 */
/**
 * To be uncomment to check Amazon s3 web service
 * uploadfile(file){

const bucket = new S3(
    {
        accessKeyId: 'AKIAIVCOGAFOX276QPFA',
        secretAccessKey: '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',
        region: 'us-east-1'
    });

    const param = {
            Bucket : 'jsa-angular4-bucket-kmn',
            Key : this.FOLDER + file.name,
            Body: file
        };

bucket.upload(param, function(err ,data){

    if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

    console.log('Successfully uploaded file.', data);
      return true;

});

}
*/
//upload file ends


/**
 * Get list of files
 */
/**
 * To be uncomment to check Amazon s3 web service
private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAIVCOGAFOX276QPFA',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );
 
    return bucket;
  }
 

getlistOfFiles(){

    const fileUploads = new Array<FileUpload>();

    const params = {
        Bucket: this.BUCKET,
        Prefix: this.FOLDER
      };
       
      this.getS3Bucket().listObjects(params, function (err, data) {
        if (err) {
          console.log('There was an error getting your files: ' + err);
          return;
        }
       
        console.log('Successfully get files.', data);
 
        const fileDatas = data.Contents;
   
        fileDatas.forEach(function (file) {
          fileUploads.push(new FileUpload(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
        });

      });

      return Observable.of(fileUploads);


}

*/
//Get List of files end

/**
 * Delete file from aws
 */
/**
 * To be uncomment to check Amazon s3 web service
 deleteFile(file: FileUpload) {
    const params = {
      Bucket: this.BUCKET,
      Key: file.name
    };
 
    this.getS3Bucket().deleteObject(params, function (err, data) {
      if (err) {
        console.log('There was an error deleting your file: ', err.message);
        return;
      }
      console.log('Successfully deleted file.');
    });
  }
*/


}