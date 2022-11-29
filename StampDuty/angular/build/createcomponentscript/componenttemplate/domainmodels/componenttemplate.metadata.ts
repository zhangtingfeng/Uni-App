import { ClassMetaData, ClassMetadataBuilder, Helpers } from 'shared-framework';
import { ComponentTemplateModel } from './componenttemplate.model';


export class ComponentTemplateMetaData extends ClassMetadataBuilder<ComponentTemplateModel> {
    public ApplyImpl(target: ClassMetaData<ComponentTemplateModel>) {

        target.
            AddProperty(x => x.UserName)
            .MandatoryWhen(x => {
                return Helpers.IsNullOrEmpty(x.UserName);
            }, 'Please enter valid user name');
    }
}
