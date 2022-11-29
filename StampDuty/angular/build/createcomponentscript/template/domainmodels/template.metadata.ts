import { ClassMetaData, ClassMetadataBuilder, EnumeratedItem, Helpers, EnsureResult } from 'shared-framework';
import { TemplateModel } from './template.model';

export class TemplateMetaData extends ClassMetadataBuilder<TemplateModel> {
    public ApplyImpl(target: ClassMetaData<TemplateModel>) {

        target.
            AddProperty(x => x.UserName)
            .MandatoryWhen(x => {
                return Helpers.IsNullOrEmpty(x.UserName);
            }, 'Please enter valid user name');
    }
}
