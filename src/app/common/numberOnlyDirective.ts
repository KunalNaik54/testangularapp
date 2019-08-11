import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
 selector: '[myNumberOnly]'
})
export class NumberOnlyDirective {
 // Allow decimal numbers and negative values
 //private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
 //private regex: RegExp = new RegExp(/[0-9\+\-\ ]/);
 //private regex: RegExp = new RegExp(/[0-9]/);
 private regex: RegExp = new RegExp(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)// positive decimal no
 

 // Allow key codes for special events. Reflect :
 // Backspace, tab, end, home
 private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home'];

 private ieKeys: Array<string> = [ 'Decimal'];
 private equivalentKeys: Array<string> = [ '.'];

constructor(private el: ElementRef) {
 }
 @HostListener('keydown', [ '$event' ])
 onKeyDown(event: KeyboardEvent) {
 // Allow Backspace, tab, end, and home keys
 if (this.specialKeys.indexOf(event.key) !== -1) {
 return;
 }
 let current: string = this.el.nativeElement.value;

 let currVal = event.key;
 let keyIndex = this.ieKeys.indexOf(currVal)

 if(keyIndex >= 0){
    currVal = this.equivalentKeys[keyIndex];
 }

 let next: string = current.concat(currVal);
 if (next && !String(next).match(this.regex)) {
 event.preventDefault();
 }
 }
}
