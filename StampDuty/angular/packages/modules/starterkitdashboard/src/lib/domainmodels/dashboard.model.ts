import { DomainModelEx } from 'adk-shared';
import { HasTrait, MetaData } from 'shared-framework';
import { DashboardTrait } from './traits/dashboardmodel.trait';
import { DashboardMetaData } from './metadata/dashboard.metadata';
import { CarouselInterface } from '../starterkitdashboard.constants';




export interface BannerInterface {
    bannerTitle: string;
    bannerDescription: string;
    bannerImage: string;
}

@MetaData(DashboardMetaData)
@HasTrait(DashboardTrait)
export class DashboardModel extends DomainModelEx<DashboardModel> {
    public BannerContent: BannerInterface;
    public CarouselItemSource: CarouselInterface[];

    constructor() {
        super([
            x => x.BannerContent,
            x => x.CarouselItemSource,
        ]);
    }

    OnInitialized(): void {

    }
}
