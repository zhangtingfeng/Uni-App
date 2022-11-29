import { createAction, props } from '@ngrx/store';
import { SearchBoardFilter } from './searchfilter.state';

export const PutSearchBoardFilterAction = createAction(
    '[SearchFilter] - Put SearchBoardFilter',
    props<SearchBoardFilter>()
);
