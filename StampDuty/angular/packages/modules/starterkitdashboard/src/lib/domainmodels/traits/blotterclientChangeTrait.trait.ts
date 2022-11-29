import { EntityActionFactory, EntityServices } from '@ngrx/data';
import { filter } from 'rxjs';
import { Helpers, Trait } from 'shared-framework';
import { pubTrafiguraEntityList } from '../../pubFunction/pubCompany';
import { ApplicationState } from '../../shared/applicationstate.service';
import { BlotterClientModel } from '../blotterclient.model';

export class blotterclientChangeTrait extends Trait<BlotterClientModel> {
    public entityServices: EntityServices;
    public entityActionFactory: EntityActionFactory;
    public IsLoaded: boolean = false;
    constructor(target: BlotterClientModel, public StateData: ApplicationState) {
        super(target);
        this.entityServices = target.Container.get(EntityServices);
        this.entityActionFactory = target.Container.get(EntityActionFactory); 
    }

    public OnActivated(): void {
        ///curl -vvv --proxy http://10.193.67.20:8080 -X GET pro.qcc.com/apixy=http://10.193.67.20:8080 -X GET pro.qcc.com/api 
        // curl -vvv 52.81.236.118

        this.Target.TrafiguraEntityList = pubTrafiguraEntityList();

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        let udList = [];

        udList.push({ Identifier: "是", Code: "是", Description: "是" });
        udList.push({ Identifier: "否", Code: "否", Description: "否" });

        this.Target.IncludeInterCompanyTradeList = udList;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let SnapshotYearMonthList = [];
        let SnapshotYearList = [];
        for (let i = -24; i <= 0; i++) {
            let ddatetimeCur = new Date();
            let letcurMonth = ddatetimeCur.getMonth();
            let letYearMonth = new Date(ddatetimeCur.setMonth(letcurMonth + i));

            let letYear = letYearMonth.getFullYear();
            let letMonth = letYearMonth.getMonth();
            //debugger;
            SnapshotYearMonthList.push({ Year: letYear, Month: letMonth, MonthDescription: monthEnglish[letMonth] });
            let letlength = SnapshotYearList.filter(x => x.Identifier == letYear).length;
            if (!(letlength >= 1)) {
                SnapshotYearList.push({ Identifier: letYear.toString(), Code: letYear.toString(), Description: letYear.toString() });
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.Target.StampdutyStartYearList = SnapshotYearList;


        this.Target.WhenPropertyChanged(x => x.StampdutyStartYear).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            this.Target.StampdutyStartYearFront = resp;
            if (Helpers.IsNotNullOrEmpty(resp)) {
                sessionStorage.setItem("Stampduty.StampdutyStartYear", resp);
            }
            let letSnapMonthList = [];
            let letMonthList = SnapshotYearMonthList.filter(y => y.Year.toString() == resp);
            //debugger;
            for (let i = 0; i < letMonthList.length; i++) {
                let letMonthString = (letMonthList[i].Month + 1).toString();
                if (letMonthList[i].Month < 9) {
                    letMonthString = "0" + letMonthString;
                }
                letSnapMonthList.push({ Identifier: letMonthString, Code: letMonthString, Description: letMonthList[i].MonthDescription });
            }
            this.Target.StampdutyStartMonthList = letSnapMonthList;


           // this.Target.StampdutyStartMonthFront = "";

            // debugger;
        });


        this.Target.WhenPropertyChanged(x => x.StampdutyStartMonth).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            let type: any = this.Target.StampdutyStartMonthList.find(type => type.Description === resp);
            this.Target.StampdutyStartMonthFront = type.Code;
            if (Helpers.IsNotNullOrEmpty(resp)) {
                sessionStorage.setItem("Stampduty.StampdutyStartMonth", resp);
                sessionStorage.setItem("Stampduty.StampdutyStartMonthFront", type.Code);
            }
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.Target.StampdutyEndYearList = SnapshotYearList;


        this.Target.WhenPropertyChanged(x => x.StampdutyEndYear).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {

            this.Target.StampdutyEndYearFront = resp;
            if (Helpers.IsNotNullOrEmpty(resp)) {
                sessionStorage.setItem("Stampduty.StampdutyEndYear", resp);
            }
            let letSnapMonthList = [];
            let letMonthList = SnapshotYearMonthList.filter(y => y.Year.toString() == resp);
            //debugger;
            for (let i = 0; i < letMonthList.length; i++) {
                let letMonthString = (letMonthList[i].Month + 1).toString();
                if (letMonthList[i].Month < 9) {
                    letMonthString = "0" + letMonthString;
                }
                letSnapMonthList.push({ Identifier: letMonthString, Code: letMonthString, Description: letMonthList[i].MonthDescription });
            }
            this.Target.StampdutyEndMonthList = letSnapMonthList;
           // this.Target.StampdutyEndMonthFront = "";

            // debugger;
        });


        this.Target.WhenPropertyChanged(x => x.StampdutyEndMonth).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            let type: any = this.Target.StampdutyEndMonthList.find(type => type.Description === resp);
            this.Target.StampdutyEndMonthFront = type.Code;
            if (Helpers.IsNotNullOrEmpty(resp)) {
                sessionStorage.setItem("Stampduty.StampdutyEndMonth", resp);
                sessionStorage.setItem("Stampduty.StampdutyEndMonthFront", type.Code);
            }

        });

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.Target.WhenPropertyChanged(x => x.TrafiguraEntity).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {

            let type: any = this.Target.TrafiguraEntityList.find(type => type.Description === resp);
            this.Target.TrafiguraEntityCodeFront = type.Code;
            this.Target.TrafiguraEntityFront = resp;

            if (Helpers.IsNotNullOrEmpty(resp)) {
                sessionStorage.setItem("Stampduty.TrafiguraEntity", resp);
                sessionStorage.setItem("Stampduty.TrafiguraEntityCodeFront", type.Code);
            }
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.Target.WhenPropertyChanged(x => x.IncludeInterCompanyTrade).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            let type: any = udList.find(type => type.Description === resp);
            this.Target.IncludeInterCompanyTradeFront = type.Code;

            if (Helpers.IsNotNullOrEmpty(resp)) {
                sessionStorage.setItem("Stampduty.IncludeInterCompanyTrade", resp);
                sessionStorage.setItem("Stampduty.IncludeInterCompanyTradeFront", type.Code);
                
            }


            // this.Target.TrafiguraEntityFront = resp;
            // debugger;
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // debugger;

    }
}
