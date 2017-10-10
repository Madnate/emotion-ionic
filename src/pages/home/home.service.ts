import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import firebase from 'firebase';

@Injectable()
export class HomeService {
    imageUrl: string;
    private analyzeUrl = 'https://api.projectoxford.ai/emotion/v1.0/recognize';
    constructor (
        private http: Http,
        private file: File
    ) {}

    analyzeImage(body){
        let headers      = new Headers({ 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': '89608f8f16d84d13ae8878996f597e05' });
        let options = new RequestOptions({headers: headers });
        let imgbody = {'url': body};
        console.log(imgbody);
        return this.http.post(this.analyzeUrl, imgbody, options)
            .map((res:Response) => res.json());
    }


    upload(image) {
        let promise = new Promise((res, rej) => {
            let storageRef = firebase.storage().ref();
            const filename = Math.floor(Date.now() / 1000);
            const imageRef = storageRef.child(`${filename}-emotion.jpg`);
            imageRef.putString(image, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
                let downloadURL = snapshot.downloadURL;
                res(downloadURL);
            });
        });
        return promise;
    }
}
