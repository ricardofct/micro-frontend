import { Component, OnInit, OnDestroy } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { SingleSpaProps, singleSpaPropsSubject } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';

import { Eev } from 'eev';

@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'utente';
  imgSrc = assetUrl('./../assets/S3_SCSH_A2_geral_comprido_cor.png');

  menu = [];

  e: Eev = null;

  singleSpaProps: SingleSpaProps = null;
  subscription: Subscription = null;

  ngOnInit() {
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        console.log(props);
        this.singleSpaProps = props;
        this.e = props['eev'];
        this.setMenu();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  expanded(event): void {
    this.e.emit('menuIsExpanded', event);
  }

  setMenu(): void {
    this.singleSpaProps['endpoints'].forEach((element, id) => {
      if (element.menu) {
        this.menu.push({ ...element.menu, id: id + 1 });
      }
    });
  }
}
