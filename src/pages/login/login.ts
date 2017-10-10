import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, IonicPage} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {User} from "../../models/user";

@IonicPage({name: 'LoginPage'})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {
    loading: Loading;
    user = {} as User;

    constructor(private afAuth: AngularFireAuth,private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

    public createAccount() {
        this.nav.push('RegisterPage');
    }

    async login(user: User) {
        try{
            const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            console.log(result);
            this.nav.setRoot('HomePage');
        }catch (e){

        }
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        //this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}
