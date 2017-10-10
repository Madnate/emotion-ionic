
import {Component, NgZone} from "@angular/core";
import {NavController} from "ionic-angular";
import {HomeService} from "./home.service";

/**
 *
 * Component
 *
 */
declare let CameraPreview:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})

/**
 *
 * Preview Class
 *
 */


export class HomePage {
  public getWidth: number;
  public getHeight : number;
  public calcWidth : number;
  public dataimage: string;
  public youremotion: string;
  public hideButtonTakepicture: boolean;
  public hideButtonPicture: boolean;
  constructor(private nav: NavController, private zone:NgZone, private homeservice:HomeService){
    this.dataimage = "";
    this.hideButtonPicture = true;

    this.zone.run(() => {
      this.getWidth = window.innerWidth;

      this.getHeight = window.innerHeight;
    });
    console.log('width',this.getWidth);

    this.calcWidth = this.getWidth;  // Calculate the width of device and substract 80 from device width;

    console.log('calc width',this.calcWidth);

    this.startCamera();

  }
  /**
   *
   * Before Using Ionic Native Camera Preview Please Note...
   *
   * 1. Camera Drag Working in android (However not tested in IOS)
   * 2. tap Photo not working in android (However not tested in IOS)
   * 3. Default Camera Direction i.e Front/Back is Working (However not tested in IOS)
   * 4. toBack and Alpha are useless in Android (However not checking in IOS)
   *
   *
   * */

  startCamera(){
    // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
    CameraPreview.startCamera({x: 0, y: 0, width: this.calcWidth, height: this.getHeight, toBack: true, alpha: 1});
    //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted
  }

  stopCamera(){
    CameraPreview.stopCamera();
  }

  takePicture(){
    CameraPreview.takePicture((imgData) => {
      this.dataimage = 'data:image/jpeg;base64,' + imgData;
      (<HTMLInputElement>document.getElementById('previewPicture')).src = this.dataimage;
    });
    this.hideButtonTakepicture = true;
    this.hideButtonPicture = false;
  }

  resetpicture(){
    this.hideButtonTakepicture = false;
    this.hideButtonPicture = true;
    this.youremotion = "";
    (<HTMLInputElement>document.getElementById('previewPicture')).src = '';
  }

  analyzePicture(){
    this.homeservice.upload(this.dataimage).then((data)=>{
      this.showLoading();
      this.homeservice.analyzeImage(data).subscribe(res => {
        let emotion = this.getMax(res[0].scores);
        this.youremotion = emotion.emotion;
        this.hideLoading();
      });
    }).catch((err) => {
      console.log(err)
    });
  }




  SwitchCamera(){
    CameraPreview.switchCamera();
  }
  showCamera(){
    CameraPreview.show();
  }
  hideCamera(){
    CameraPreview.hide();
  }


  private showLoading() {

  }

  private hideLoading() {

  }

  private getMax(arr) {
    let max;
    Object.keys(arr).forEach(key => {
      if (!max || Number(arr[key]) > Number(max['value'])){
        max = { 'emotion' : key,
          'value' : arr[key]
        }
      }
      });
  return max;
}
  public signOut (){
    console.log("One");
    this.nav.push('LoginPage');
    console.log("Two");
    this.nav.setRoot('LoginPage');
    console.log("Three");
  }
}
