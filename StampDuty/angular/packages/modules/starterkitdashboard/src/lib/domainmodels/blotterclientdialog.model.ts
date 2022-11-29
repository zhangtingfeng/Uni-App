import { TranslateCollection } from 'adk-shared';
import { DomainModel, EnumeratedItem, HasTrait, MetaData } from 'shared-framework';
import { BlotterClientDialogMetaData } from './metadata/BlotterClientDialog.metadata';
import { BlotterClientDialogChangeTrait } from './traits/blotterclientdialogchangetrait';

export interface UploadTemplateText {
    item: string
}
@MetaData(BlotterClientDialogMetaData)
@HasTrait(BlotterClientDialogChangeTrait)
export class BlotterClientDialogModel extends DomainModel<BlotterClientDialogModel> {
    public BlotterRowData: any[]; // Please specify the type instead of any

    public UploadTemplateHolderData: UploadTemplateText[] = [{ item: 'uploadTemplateText' }];
    public UploadFormDocumentFile: FormData;
    public IsUploadFileChoosen: boolean;
    
    public TranslationItems: TranslateCollection;
    public PageCode: string;
    public PageCodeDescription: string;

    constructor() {
        super([ 
          
            x => x.UploadTemplateHolderData,
            x => x.PageCode,
        ]);
    }


    public checkDisable(){
    

    }

    OnInitialized(): void {

    }
}
