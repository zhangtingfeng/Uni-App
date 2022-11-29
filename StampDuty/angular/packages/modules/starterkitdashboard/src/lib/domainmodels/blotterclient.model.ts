//import { DateRange } from 'adk-presentation'; 
import { DateRange } from '@angular/material/datepicker';
import { DomainModel, EnumeratedItem, HasTrait, MetaData } from 'shared-framework';
import { DocumentInfoVo } from '../services/situqueryproxy/query/ServiceTypes';
import { BlotterClientMetaData } from './metadata/blotterclient.metadata';
import { blotterclientChangeTrait } from './traits/blotterclientChangeTrait.trait';

 


export interface FilterItems {
    title: string;
    type: string;
    hide?: boolean;
}
@MetaData(BlotterClientMetaData)
@HasTrait(blotterclientChangeTrait)
export class BlotterClientModel extends DomainModel<BlotterClientModel> {

    public BlotterRowData: any[]; // Please specify the type instead of any
   // InvoiceDateRange: DateRange = { start: null, end: null };
    //public InvoiceDateRange: DateRange = { start: null, end: null };
    //public InvoiceDueDateRange: DateRange = { start: null, end: null };
    public FilterPanelItems: FilterItems;
    public Currency: string;
    public VendorName: string;
    
    public Status: string[];
    public PageCodeDescription: string;
    public PageCode: string;
    public Limit: number = 100;
    public OffSet: number = 0;
    public PinnedData: DocumentInfoVo[] = [];
    public TrafiguraEntity: string;
    public TrafiguraEntityList: EnumeratedItem[] = [];
    public IncludeInterCompanyTrade: string;
    public IncludeInterCompanyTradeList: EnumeratedItem[] = [];
    public StampdutyStartYear: string;
    public StampdutyEndYear: string;
    public StampdutyStartMonth: string;
    public StampdutyEndMonth: string;
    public StampdutyStartYearList: EnumeratedItem[] = [];
    public StampdutyEndYearList: EnumeratedItem[] = [];
    public StampdutyStartMonthList: EnumeratedItem[] = [];
    public StampdutyEndMonthList: EnumeratedItem[] = [];
    


    public TrafiguraEntityCodeFront: string;
    public IncludeInterCompanyTradeFront: string;
    public TrafiguraEntityFront: string;
    public StampdutyStartYearFront: string;
    public StampdutyEndYearFront: string;
    public StampdutyStartMonthFront: string;
    public StampdutyEndMonthFront: string;
    
    constructor() {
        super([
            x => x.PageCodeDescription,
            x => x.PageCode,
            x => x.PageCodeDescription,
            x => x.Limit,
            x => x.OffSet,
            x => x.PinnedData,
            x => x.TrafiguraEntityList,x => x.IncludeInterCompanyTradeList,
            x => x.StampdutyStartYearList,
            x => x.StampdutyEndYearList,
            x => x.StampdutyStartMonthList,
            x => x.StampdutyEndMonthList,
            x => x.PinnedData
        ]);
    }
 
    public OnInitialized(): void {

    }

}
