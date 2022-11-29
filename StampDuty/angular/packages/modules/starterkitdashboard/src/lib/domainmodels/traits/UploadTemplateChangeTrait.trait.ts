import { EntityActionFactory, EntityServices } from '@ngrx/data';
import { DisposeWith } from 'adk-shared';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { EnumeratedItem, Helpers, Trait } from 'shared-framework';
import { pubTrafiguraEntityList } from '../../pubFunction/pubCompany';
import { ApplicationState } from '../../shared/applicationstate.service';
import { UploadTemplateModel } from '../uploadtemplate.model';


export class UploadTemplateChangeTrait extends Trait<UploadTemplateModel> {
    public entityServices: EntityServices;
    public entityActionFactory: EntityActionFactory;
    public IsLoaded: boolean = false;
    constructor(target: UploadTemplateModel, public StateData: ApplicationState) {
        super(target);
        this.entityServices = target.Container.get(EntityServices);
        this.entityActionFactory = target.Container.get(EntityActionFactory);
    }

    public OnActivated(): void {
        ///curl -vvv --proxy http://10.193.67.20:8080 -X GET pro.qcc.com/apixy=http://10.193.67.20:8080 -X GET pro.qcc.com/api 
        // curl -vvv 52.81.236.118
        
        this.Target.TrafiguraEntityList = pubTrafiguraEntityList();

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


        this.Target.SnapshotYearList = SnapshotYearList;       

        this.Target.WhenPropertyChanged(x => x.StapmeYearEntity).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            this.Target.StapmeYearEntityFront = resp;

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
            this.Target.SnapshotMonthList = letSnapMonthList;

            this.Target.StapmeMonthEntity = "";

            // debugger;
        });


        this.Target.WhenPropertyChanged(x => x.StapmeMonthEntity).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            let type: any = this.Target.SnapshotMonthList.find(type => type.Description === resp);
            this.Target.StapmeMonthEntityFront = type.Code;
            //debugger;
        });



        this.Target.WhenPropertyChanged(x => x.TrafiguraEntity).pipe(
            filter(x => {
                return Helpers.IsNotNullOrEmpty(x);
            }
            )
        ).subscribe(resp => {
            let type: any = this.Target.TrafiguraEntityList.find(type => type.Description === resp);
            this.Target.TrafiguraEntityCodeFront = type.Code;
            this.Target.TrafiguraEntityFront = resp;
           // debugger;
        });

        

    }
}
