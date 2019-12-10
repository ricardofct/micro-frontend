import { Component, OnInit, OnDestroy, Input, AfterContentInit, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { SingleSpaProps, singleSpaPropsSubject } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';

@Component({
  selector: 'utente-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnDestroy, OnInit, AfterContentChecked {
  @Input() id: number;
  @ViewChild('content') content: ElementRef;
  title = 'utente';

  singleSpaProps: SingleSpaProps = null;
  subscription: Subscription = null;

  ngOnInit() {
    this.subscription = singleSpaPropsSubject.subscribe(
      async props => {
        const { mountRootParcel } = props.singleSpa;
        this.singleSpaProps = props;
        // How to mount the parcel
        const domElement = this.content.nativeElement;
        const parcelProps = { domElement, cenas: 'cenas' + this.id }

        const parcel = mountRootParcel(this.singleSpaProps['parcel'], parcelProps);
        // The parcel is being mounted. We can wait for it to finish with the mountPromise.
        const mounted = await parcel.mountPromise;
      }
    );
  }

  ngAfterContentChecked() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
