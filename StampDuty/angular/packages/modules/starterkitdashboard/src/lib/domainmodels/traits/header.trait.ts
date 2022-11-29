import { Trait, Helpers, ITranslationService } from 'shared-framework';
import { HeaderModel } from '../header.model';
import { skip, filter, switchMap } from 'rxjs/operators';
import { AppConfigService } from 'adk-core';
import { DisposeWith } from 'adk-shared';

export class HeaderTrait extends Trait<HeaderModel> {
    private service: ITranslationService;
    private configService: AppConfigService;
    constructor(target: HeaderModel) {
        super(target);
        this.service = this.Target.Container.get(ITranslationService, null);
        this.configService = this.Target.Container.get(AppConfigService);

    }

    public OnActivated(): void {
        this.Target.WhenPropertyChanged(x => x.SelectedLanguage)
            .pipe(
                skip(1),
                filter(x => Helpers.IsNotNullOrEmpty(x)),
                switchMap(x => {
                    return this.service.setlanguage(x);
                }),
                DisposeWith(this)
            )
            .subscribe(x => {
                if (Helpers.IsNotNull(this.service)) {
                    this.service.settranslation(x);
                    this.configService.translationService.next(this.Target.SelectedLanguage);
                }
            })

    }

}
