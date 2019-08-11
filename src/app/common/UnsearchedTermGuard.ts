import { TestDerectiveComp } from './../testderective/testderective.component';
import { HomeworkComponentNew } from './../homework/homework.component';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate } from "@angular/router";
import { inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
 
@Injectable()
export class HomeworkTermGuard implements CanDeactivate<TestDerectiveComp> { 
    canDeactivate(component: TestDerectiveComp, 
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): boolean {
      console.log("UnsearchedTermGuard");
      console.log(route.params);
      console.log(state.url);
      return component.canDeactivate() ;
    }

    constructor() { }
  }
  