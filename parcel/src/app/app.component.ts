import { Component, OnInit, OnDestroy } from '@angular/core';
import { SingleSpaProps, singleSpaPropsSubject } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  singleSpaProps: SingleSpaProps = null;
  subscription: Subscription = null;

  value = 0;

  ngOnInit() {
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        console.log(props);
        this.singleSpaProps = props;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
