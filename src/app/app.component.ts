import {Component, ViewChild} from '@angular/core';
import { Platform , NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from  '@ionic-native/screen-orientation'
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  rootPage:any = LoginPage;

  constructor(private afAuth: AngularFireAuth,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, ScreenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      ScreenOrientation.lock('portrait');
    });
    this.afAuth.authState.subscribe(
        (auth) => {
          if (auth == null) {
            console.log("Not Logged in.");
            this.rootPage = LoginPage;
          }else{
          console.log("Logged in.");
            this.rootPage = HomePage;
          }
        });
  }
}
