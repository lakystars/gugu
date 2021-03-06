import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AlertController, ModalController, NavParams} from "@ionic/angular";
import {Service} from "../home.page";
import * as Moment from 'moment';
import {HomeService} from "../home.service";

@Component({
    selector: 'app-service-info',
    templateUrl: './service-info.component.html',
    styleUrls: ['./service-info.component.scss'],
})
export class ServiceInfoComponent implements OnInit {

    @Input() service: Service;
    formattedLeftDay: string;
    startDate: string;
    useAlam = false;

    constructor(public modalController: ModalController,
                public alertController: AlertController,
                public navParams: NavParams,
                public homeService: HomeService) {
    }

    ngOnInit() {
        const service: Service = this.navParams.get('service');
        this.formattedLeftDay = Moment(service.endDate).format('MM월 DD일');
        this.startDate = Moment(service.startDate).format('YYYY-MM-DD');
    }


    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }

    unSubscribeService(){
      this.homeService.fireUnscribeService(this.service);
    }

    async presentAlertConfirm(service: Service) {
        const alert = await this.alertController.create({
            header: '확인',
            message: `${service.subscribeModel} 구독을 취소할까요?`,
            buttons: [
                {
                    text: '아뇨',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        // this.dismiss();
                    }
                }, {
                    text: '예',
                    handler: () => {
                        this.unSubscribeService();
                        this.dismiss();
                    }
                }
            ]
        });

        await alert.present();
    }
}
