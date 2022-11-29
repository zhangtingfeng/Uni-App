import { TranslateCollection } from 'adk-shared';
import { DomainModel, EnumeratedItem, HasTrait, MetaData } from 'shared-framework';
import { UploadTemplateMetaData } from './metadata/uploadtemplate.metadata';
import { UploadTemplateChangeTrait } from './traits/UploadTemplateChangeTrait.trait';

export interface UploadTemplateText {
    item: string
}
@MetaData(UploadTemplateMetaData)
@HasTrait(UploadTemplateChangeTrait)
export class UploadTemplateModel extends DomainModel<UploadTemplateModel> {
    public UploadTemplateHolderData: UploadTemplateText[] = [{ item: 'uploadTemplateText' }];
    public UploadFormDocumentFile: FormData;
    public IsUploadFileChoosen: boolean;
    public FileName: string;
    public TranslationItems: TranslateCollection;
    public PageCode: string;
    public TrafiguraEntity: string;
    public TrafiguraEntityList: EnumeratedItem[] = [];

    public StapmeYearEntity: string;
    public SnapshotYearList: EnumeratedItem[] = [];
    public StapmeMonthEntity: string;
    public SnapshotMonthList: EnumeratedItem[] = [];


    public TrafiguraEntityCodeFront: string;
    public TrafiguraEntityFront: string;
    public StapmeYearEntityFront: string;
    public StapmeMonthEntityFront: string;
    public UploadAtionID: string;
    constructor() {
        super([ 
            x => x.TrafiguraEntityList,
            x => x.SnapshotYearList,
            x => x.SnapshotMonthList,
            x => x.UploadTemplateHolderData,
            x => x.FileName,
            x => x.PageCode,
        ]);
    }


    public checkDisable(){
    

    }

    OnInitialized(): void {

    }
}
