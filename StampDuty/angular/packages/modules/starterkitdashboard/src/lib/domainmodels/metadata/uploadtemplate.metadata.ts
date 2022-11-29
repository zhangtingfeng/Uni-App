import { ClassMetaData, ClassMetadataBuilder, Helpers } from 'shared-framework';
import { UploadTemplateModel } from '../uploadtemplate.model';

export class UploadTemplateMetaData extends ClassMetadataBuilder<UploadTemplateModel> {
    public ApplyImpl(target: ClassMetaData<UploadTemplateModel>) {
        target
            .AddProperty(x => x.FileName)
            .EnabledWhen(x => false);

        //debugger;
        let trafiguraentitylist = target
            .AddEnumeration('trafiguraentitylist', x => x.Description)
            .WithItemSource(x => x.TrafiguraEntityList)
            .WithDescription(x => x.Description);


        let letSnapshotMonthList = target
            .AddEnumeration('SnapshotMonthList', x => x.Description)
            .WithItemSource(x => x.SnapshotMonthList)
            .WithDescription(x => x.Description);


        let letSnapshotYearList = target
            .AddEnumeration('SnapshotYearList', x => x.Description)
            .WithItemSource(x => x.SnapshotYearList)
            .WithDescription(x => x.Description);
        //debugger;



        target.AddProperty(x => x.TrafiguraEntity)
            .Enumeration(trafiguraentitylist);

        target.AddProperty(x => x.StapmeYearEntity)
            .Enumeration(letSnapshotYearList);

        target.AddProperty(x => x.StapmeMonthEntity)
            .Enumeration(letSnapshotMonthList);

    }
}
