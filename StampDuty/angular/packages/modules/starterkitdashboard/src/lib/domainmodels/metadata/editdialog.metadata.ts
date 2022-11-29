import { ClassMetaData, ClassMetadataBuilder, Helpers } from 'shared-framework';
import { EditDialogModel } from '../editdialog.model';

export class EditDialogMetaData extends ClassMetadataBuilder<EditDialogModel> {
    public ApplyImpl(target: ClassMetaData<EditDialogModel>) {
        target
            .AddProperty(x => x.FileName)
            .EnabledWhen(x => false);


            let tableTaxItemList = target
            .AddEnumeration('TableTaxItemList', x => x.Description)
            .WithItemSource(x => x.TableTaxItemList)
            .WithDescription(x => x.Description);
            target.AddProperty(x => x.rateConfigurationVo_TableTaxItem)
            .Enumeration(tableTaxItemList);

    }
}
