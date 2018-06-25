import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { timer } from 'rxjs/observable/timer';
import { HomePage } from '../pages/home/home';
//import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:any = HomePage;
  private showSplash : boolean;
  constructor(platform: Platform, statusBar: StatusBar/*, ss : SplashScreen*/) {
    //ss.hide();
    this.showSplash = true; // <-- show animation
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      timer(3000).subscribe(() => this.showSplash = false);
    });
  }
}

