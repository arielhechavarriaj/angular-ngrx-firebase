/***
 * https://stackblitz.com/edit/input-with-pipe-in-the-reactive-form?file=src%2Fapp%2Fthousand-separator.directive.ts
 */

import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Input,
  Optional
} from "@angular/core";
import { NgControl } from "@angular/forms";
import { DecimalPipe } from "@angular/common";

@Directive({
  selector: "[appProdCurrency]"
})
export class ProdCurrencyDirective {
  textbox!: HTMLInputElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() private ngControl: NgControl,
    private decimalPipe: DecimalPipe
  ) {}

  ngAfterViewInit() {
    this.textbox =
      this.el.nativeElement.tagName === "INPUT"
        ? this.el.nativeElement
        : this.el.nativeElement.querySelector("input");
  }

  @HostListener("blur", ["$event"]) onBlur(event:any) {
    const formattedVal = this.decimalPipe.transform(
      this.textbox.value,
      "1.0-10"
    );
    if (this.ngControl) {
      // @ts-ignore
      this.ngControl.control.setValue(formattedVal, { emitEvent: false });
    } else {
      this.renderer.setProperty(this.textbox, "value", formattedVal);
    }
  }

  @HostListener("focus", ["$event"]) onFocus(event:any) {
    const initVal = this.textbox.value.replace(/,/g, '');
    if (this.ngControl) {
      // @ts-ignore
      this.ngControl.control.setValue(initVal, { emitEvent: false });
    } else {
      this.renderer.setProperty(this.textbox, "value", initVal);
    }
  }
}

