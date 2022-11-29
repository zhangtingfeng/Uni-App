export interface SearchBoardFilter {
    StampdutyStartYear: Date,
    StampdutyEndYear: Date,
    StampdutyStartMonth: Date,
    StampdutyEndMonth: Date,
    status: Object[],
    currency: string,
    vendorName: string
}

export interface ApInvoicesState {
    SearchBoardFilters: SearchBoardFilter;
}

export const initializeState = (): ApInvoicesState => {
    return {
        SearchBoardFilters: {
            StampdutyStartYear: null,
            StampdutyEndYear: null,
            StampdutyStartMonth: null,
            StampdutyEndMonth: null,
            status: null,
            currency: null,
            vendorName: null
        }
    };
};
