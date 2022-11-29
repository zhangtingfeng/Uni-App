import { TranslateCollection } from 'adk-shared';
import { DomainModel, EnumeratedItem, HasTrait, MetaData } from 'shared-framework';
import { RateConfigurationVo } from '../services/uploadproxy/query/ServiceTypes';
import { EditDialogMetaData } from './metadata/editdialog.metadata';
import { EditDialogChangeTrait } from './traits/EditDialogChangeTrait.trait';


export interface EditDialogText {
    item: string
}
@MetaData(EditDialogMetaData)
@HasTrait(EditDialogChangeTrait)
export class EditDialogModel extends DomainModel<EditDialogModel> {
    public EditDialogHolderData: EditDialogText[] = [{ item: 'editDialogText' }];
    public EditDialogFormDocumentFile: FormData;
    public IsUploadFileChoosen: boolean;
    public FileName: string;
    public TranslationItems: TranslateCollection;
    public PageCode: string;
    public TrafiguraEntity: string;
    public TableTaxItemList: EnumeratedItem[] = [];
    public rateConfigurationVo_TableTaxItem: string;
    public rateConfigurationVo_ValidFrom: Date;
    public rateConfigurationVo_ValidTo: Date;
    public rateConfigurationVo_Rate: number;
    public rateConfigurationVo_DisplayCNText: string;
    
    public SnapshotYearList: EnumeratedItem[] = [];
    public StapmeMonthEntity: string;
    public SnapshotMonthList: EnumeratedItem[] = [];

    public rateConfigurationVo:RateConfigurationVo;
    public TrafiguraEntityFront: string;
    public StapmeYearEntityFront: string;
    public StapmeMonthEntityFront: string;
    public UploadAtionID: string;
    constructor() {
        super([ 
            x => x.TableTaxItemList,
            x => x.SnapshotYearList,
            x => x.SnapshotMonthList,
            x => x.EditDialogHolderData,
            x => x.FileName,
            x => x.PageCode,
            x => x.rateConfigurationVo_TableTaxItem,
            x => x.rateConfigurationVo_Rate,
            x => x.rateConfigurationVo_ValidFrom,
            x => x.rateConfigurationVo_ValidTo,
            x => x.rateConfigurationVo_DisplayCNText
          
        ]);
    }


    public checkDisable(){
    

    }

    OnInitialized(): void {

    }
}
