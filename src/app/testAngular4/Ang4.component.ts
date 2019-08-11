import { Component, OnInit ,ElementRef, Input } from '@angular/core';


@Component({
  selector: 'app-angu4',
  templateUrl: './Ang4.component.html',
  styleUrls: ['./Ang4.component.css'
]  

})
export class Ang4Component implements OnInit {
  
   cond1 : boolean = false;
   cond2 : boolean = true;
   title : string = 'Directive Title';
   todaydate : Date = new Date();
   jsonval = {name:'Rox', age:'25', address:{a1:'Mumbai', a2:'Karnataka'}};
   months = ["Jan", "Feb", "Mar", "April", "May", "Jun",
             "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  
constructor(){


}

  ngOnInit() {

    


     }

}