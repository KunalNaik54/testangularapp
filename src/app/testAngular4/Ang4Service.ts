import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import {Http, RequestOptionsArgs, RequestOptions, Headers} from "@angular/http";

@Injectable()
export class UploadFileService {
}