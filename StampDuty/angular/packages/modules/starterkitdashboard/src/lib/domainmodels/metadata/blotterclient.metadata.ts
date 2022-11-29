
import * as momentdata from 'moment';
import { ClassMetaData, ClassMetadataBuilder, EnsureResult, Helpers } from 'shared-framework';


import { BlotterClientModel } from '../blotterclient.model';


export const moment = momentdata;


export class BlotterClientMetaData extends ClassMetadataBuilder<BlotterClientModel> {
    public ApplyImpl(target: ClassMetaData<BlotterClientModel>) {



        let trafiguraentitylist = target
            .AddEnumeration('TrafiguraEntityListanydnoUse888888888888', x => x.Description)
            .WithItemSource(x => x.TrafiguraEntityList)
            .WithDescription(x => x.Description);



        target.AddProperty(x => x.TrafiguraEntity)
            .Enumeration(trafiguraentitylist);

        //////////////////////////////////////////////
        let letStampdutyStartMonthList = target
            .AddEnumeration('StampdutyStartMonthList', x => x.Description)
            .WithItemSource(x => x.StampdutyStartMonthList)
            .WithDescription(x => x.Description);

        target.AddProperty(x => x.StampdutyStartMonth)
            .Enumeration(letStampdutyStartMonthList);
        //////////////////////////////////////////////
        let letStampdutyEndMonthList = target
            .AddEnumeration('StampdutyEndMonthList', x => x.Description)
            .WithItemSource(x => x.StampdutyEndMonthList)
            .WithDescription(x => x.Description);

        target.AddProperty(x => x.StampdutyEndMonth)
            .Enumeration(letStampdutyEndMonthList);
        //////////////////////////////////////////////
        let letStampdutyStartYearList = target
            .AddEnumeration('StampdutyStartYearList', x => x.Description)
            .WithItemSource(x => x.StampdutyStartYearList)
            .WithDescription(x => x.Description);

        target.AddProperty(x => x.StampdutyStartYear)
            .Enumeration(letStampdutyStartYearList);
        //////////////////////////////////////////////
        let letStampdutyEndYearList = target
            .AddEnumeration('StampdutyEndYearList', x => x.Description)
            .WithItemSource(x => x.StampdutyEndYearList)
            .WithDescription(x => x.Description);

        target.AddProperty(x => x.StampdutyEndYear)
            .Enumeration(letStampdutyEndYearList);
        //////////////////////////////////////////////
        let letIncludeInterCompanyTradeList = target
            .AddEnumeration('IncludeInterCompanyTradeList', x => x.Description)
            .WithItemSource(x => x.IncludeInterCompanyTradeList)
            .WithDescription(x => x.Description);

        target.AddProperty(x => x.IncludeInterCompanyTrade)
            .Enumeration(letIncludeInterCompanyTradeList);
        //////////////////////////////////////////////
    }
}

