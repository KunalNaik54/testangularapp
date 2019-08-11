import { Directive ,ElementRef} from "@angular/core";


@Directive({

    selector: '[changeText]'  
})


export class ChangeTextDirective {
    constructor(Element: ElementRef) { 

        Element.nativeElement.innerText="Text is changed by changeText Directive. ";


    }
 }
 