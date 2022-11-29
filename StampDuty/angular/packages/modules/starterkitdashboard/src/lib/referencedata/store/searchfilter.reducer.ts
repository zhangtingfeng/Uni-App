import * as SearchFilterActions from './searchfilter.action';
import { SearchBoardFilter, initializeState, ApInvoicesState } from './searchfilter.state';
import { Action, createReducer, on } from '@ngrx/store';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(SearchFilterActions.PutSearchBoardFilterAction,
    (state: ApInvoicesState, searchboardfilter: SearchBoardFilter) => {
      return { ...state, SearchBoardFilters: searchboardfilter };
    })
);

export function ApInvoicesReducer(
  state: ApInvoicesState | undefined,
  action: Action
): ApInvoicesState {
  return reducer(state, action);
}
