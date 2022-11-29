import { ColDef } from 'ag-grid-community'
import * as momentdata from 'moment';
export const moment = momentdata;
import { Helpers } from 'shared-framework'


export const BLOTTER_COLUMN_DEFINITION_FACTORY = (blotterType: string, userRole: string): ColDef[] => {
    switch (blotterType) {

        case 'upload': {

            return [
                /*      { headerName: 'Voyage ID', field: 'voyageId', colId: 'voyageId', width: 130, filter: 'agTextColumnFilter', suppressMenu: true },
                      { headerName: 'Vessel IMO Number', field: 'imoNumber', colId: 'imoNumber', width: 175, filter: 'agTextColumnFilter' },
                      { headerName: 'Vessel Name', field: 'vesselName', colId: 'vesselName', width: 175, filter: 'agTextColumnFilter' },
                      { headerName: 'Ship Owner', field: 'vesselOwner', colId: 'vesselOwner', width: 250, filter: 'agTextColumnFilter' },
                      { headerName: 'Vessel Status', field: 'vesselStatus', colId: 'vesselStatus', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                      { headerName: 'Charter Type', field: 'charterType', colId: 'charterType', width: 175,  filter: 'agTextColumnFilter', suppressMenu: true },
                      { headerName: 'Voyage Status', field: 'voyageStatus', colId: 'voyageStatus', width: 175, filter: 'agTextColumnFilter' }
      */

                { headerName: 'docID', field: 'docID', colId: 'docID', width: 130, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'docType', field: 'docType', colId: 'docType', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'snapshotYear', field: 'snapshotYear', colId: 'snapshotYear', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'snapshotMonth', field: 'snapshotMonth', colId: 'snapshotMonth', width: 250, filter: 'agTextColumnFilter' },
                { headerName: 'groupCompanyCode', field: 'groupCompanyCode', colId: 'groupCompanyCode', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'groupCompanyCNName', field: 'groupCompanyCNName', colId: 'groupCompanyCNName', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'fileName', field: 'fileName', colId: 'fileName', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'active', field: 'active', colId: 'active', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'uploadStatus', field: 'uploadStatus', colId: 'uploadStatus', width: 175, filter: 'agTextColumnFilter' },
                {
                    headerName: 'messageCount', field: 'messageCount', colId: 'messageCount', width: 175, filter: 'agNumberColumnFilter', suppressMenu: true,
                    cellClassRules: {
                        'messageError': 'x > 0',
                    },

                },


                { headerName: 'createdTimestamp', field: 'createdTimestamp', colId: 'createdTimestamp', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'createdBy', field: 'createdBy', colId: 'createdBy', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },


                { headerName: '', field: 'View', colId: '', width: 40, cellRenderer: 'button', filter: false, resizable: false, autoHeight: false, icons: { IconPrefix: 'fas', IconName: 'download', ToolTipName: 'Download' }, pinned: 'right' },


            ]

        }
        case 'configurationtaxrate':
            {
                return [
                    { headerName: 'ID', field: 'ID', colId: 'ID', width: 130, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '税目', field: 'TaxableItem', colId: 'TaxableItem', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: '税率', field: 'Rate', colId: 'Rate', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: '税率(中文)', field: 'DisplayCNText', colId: 'DisplayCNText', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: '起始日期(包含)', field: 'ValidFrom', colId: 'ValidFrom', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '终止日期(包含)', field: 'ValidTo', colId: 'ValidTo', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '更新人', field: 'createdBy', colId: 'createdBy', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '更新日期', field: 'createdTimestamp', colId: 'createdTimestamp', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '', field: 'Edit', colId: '', width: 40, cellRenderer: 'button', filter: false, resizable: false, autoHeight: false, icons: { IconPrefix: 'fas', IconName: 'edit', ToolTipName: 'Edit' }, pinned: 'right' },
                    { headerName: '', field: 'Delete', colId: '', width: 40, cellRenderer: 'button', filter: false, resizable: false, autoHeight: false, icons: { IconPrefix: 'fas', IconName: 'trash', ToolTipName: 'Delete' }, pinned: 'right' },

                ]
            }
        case 'configurationcompanytaxtemplate':
            {
                return [
                    { headerName: 'ID', field: 'groupCompanyID', colId: 'groupCompanyID', width: 130, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '中文名称', field: 'groupCompanyENName', colId: 'groupCompanyCNName', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: '英文名称', field: 'groupCompanyENName', colId: 'groupCompanyENName', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: '代码', field: 'groupCompanyCode', colId: 'groupCompanyCode', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: '印花税模板', field: 'gcStampDutyTemplateID', colId: 'gcStampDutyTemplateID', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '更新人', field: 'createdBy', colId: 'createdBy', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '更新日期', field: 'createdTimestamp', colId: 'createdTimestamp', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: '', field: 'Edit', colId: '', width: 40, cellRenderer: 'button', filter: false, resizable: false, autoHeight: false, icons: { IconPrefix: 'fas', IconName: 'edit', ToolTipName: 'Edit' }, pinned: 'right' },
                    { headerName: '', field: 'Delete', colId: '', width: 40, cellRenderer: 'button', filter: false, resizable: false, autoHeight: false, icons: { IconPrefix: 'fas', IconName: 'trash', ToolTipName: 'Delete' }, pinned: 'right' },

                ]
            }


        case 'UplaodErrorMessage':
            {
                return [
                    { headerName: 'messageID', field: 'messageID', colId: 'messageID', width: 130, filter: 'agTextColumnFilter', suppressMenu: true },
                    { headerName: 'docID', field: 'docID', colId: 'docID', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: 'sheetName', field: 'sheetName', colId: 'sheetName', width: 175, filter: 'agTextColumnFilter' },
                    { headerName: 'lineNumber', field: 'lineNumber', colId: 'lineNumber', width: 250, filter: 'agTextColumnFilter' },
                    { headerName: 'message', field: 'message', colId: 'message', width: 475, filter: 'agTextColumnFilter', suppressMenu: true },





                ]
            }


        case 'report': {


            return [

                { headerName: '纳税人识别号', field: 'groupCompanyTaxID', colId: 'groupCompanyTaxID', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '纳税人名称', field: 'groupCompanyChineseName', colId: 'groupCompanyChineseName', width: 175, filter: 'agTextColumnFilter' },
                { headerName: '应税凭证税务编号', field: 'contractTaxNo', colId: 'contractTaxNo', width: 175, filter: 'agTextColumnFilter' },
                { headerName: '应税凭证编号', field: 'contractNo', colId: 'contractNo', width: 175, filter: 'agTextColumnFilter' },
                { headerName: '应税凭证名称', field: 'contractName', colId: 'contractName', width: 175, filter: 'agTextColumnFilter' },
                { headerName: '申报期限类型', field: 'byPeriodORByContract', colId: 'byPeriodORByContract', width: 175, filter: 'agTextColumnFilter' },
                { headerName: '应税凭证数量', field: 'contractCounts', colId: 'contractCounts', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '税目', field: 'taxableItem', colId: 'taxableItem', width: 175, filter: 'agTextColumnFilter' },
                { headerName: '子目', field: 'taxableChildItem', colId: 'taxableChildItem', width: 175, filter: 'agTextColumnFilter' },
                { headerName: '税款所属期起', field: 'startDate', colId: 'startDate', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '税款所属期止', field: 'endDate', colId: 'endDate', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '应税凭证书立日期', field: 'TradeDate', colId: 'TradeDate', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '计税金额', field: 'taxableAmountOFTheContract', colId: 'taxableAmountOFTheContract', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '实际结算日期', field: 'actualSettlementDate', colId: 'actualSettlementDate', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '实际结算金额', field: 'actualSettlementAmount', colId: 'actualSettlementAmount', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '税率', field: 'taxRate', colId: 'taxRate', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '减免性质代码和项目名称', field: 'taxDeductionAndExemptionCodeAndName', colId: 'taxDeductionAndExemptionCodeAndName', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '对方书立人信息 - 对方书立人名称', field: 'counterpartyChineseName', colId: 'counterpartyChineseName', width: 225, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '对方书立人信息 - 对方书立人纳税人识别号', field: 'counterpartyTaxID', colId: 'counterpartyTaxID', width: 225, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '对方书立人信息 - 对方书立人涉及金额', field: 'counterpartyTaxableAmount', colId: 'counterpartyTaxableAmount', width: 225, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: '错误信息', field: 'mappingFailMessage', colId: 'mappingFailMessage', width: 225, filter: 'agTextColumnFilter', suppressMenu: true },


            ]

            /*
            Your communications are being monitored and might be restricted. 
[‎10/‎19/‎2022 4:25 PM]  Liang Yue:  
1
 
[‎10/‎19/‎2022 4:26 PM]  Liang Yue:  
No Title 
//titleList.add("纳税人识别号（统一社会信用编码）");
//titleList.add("纳税人（缴费人）名称");
//titleList.add("应税凭证税务编号");
//titleList.add("应税凭证编号");
//titleList.add("应税凭证名称");
titleList.add("申报期限类型");
titleList.add("应税凭证数量");
titleList.add("税目");
titleList.add("子目");
titleList.add("税款所属期起");
titleList.add("税款所属期止");
titleList.add("应税凭证书立日期");
titleList.add("计税金额");
titleList.add("实际结算日期");
titleList.add("实际结算金额");
titleList.add("税率");
titleList.add("减免性质代码和项目名称");
titleList.add("对方书立人信息 - 对方书立人名称");
titleList.add("对方书立人信息 - 对方书立人纳税人识别号（统一社会信用编码）");
titleList.add("对方书立人信息 - 对方书立人涉及金额");
for (int i = 0; i < titleList.size(); i++) {
    SXSSFCell cell = (SXSSFCell) excelRow.createCell(i);
    cell.setCellValue(titleList.get(i));
}

for (int i = 0; i < reportDataList.size(); i++) {
    excelRow = (SXSSFRow) sheet.createRow(i + 1);

    ReportGenerationVO reportGenerationVO = resultRowToReportGenerationVO(reportDataList.get(i), groupCompanyCode, groupCompanyCNName, groupCompanyTaxID, startDate, endDate);
    List<Object> dataList = new ArrayList<>();
   // dataList.add(reportGenerationVO.getGroupCompanyTaxID());
   // dataList.add(reportGenerationVO.getGroupCompanyChineseName());
   // dataList.add(reportGenerationVO.getContractTaxNo());
    //dataList.add(reportGenerationVO.getContractNo());
    //dataList.add(reportGenerationVO.getContractName());
    dataList.add(reportGenerationVO.getByPeriodORByContract());
    dataList.add(reportGenerationVO.getContractCounts());
    dataList.add(reportGenerationVO.getTaxableItem());
    dataList.add(reportGenerationVO.getTaxableChildItem());
    dataList.add(reportGenerationVO.getStartDate());
    dataList.add(reportGenerationVO.getEndDate());
    dataList.add(reportGenerationVO.getTradeDate());
    dataList.add(reportGenerationVO.getTaxableAmountOFTheContract());
    dataList.add(reportGenerationVO.getActualSettlementDate());
    dataList.add(reportGenerationVO.getActualSettlementAmount());
    dataList.add(reportGenerationVO.getTaxRate());
    dataList.add(reportGenerationVO.getTaxDeductionAndExemptionCodeAndName());
    dataList.add(reportGenerationVO.getCounterpartyChineseName());
    dataList.add(reportGenerationVO.getCounterpartyTaxID());
    dataList.add(reportGenerationVO.getCounterpartyTaxableAmount()); 
 

            
            
            return [
               { headerName: 'Voyage ID', field: 'voyageId', colId: 'voyageId', width: 130, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'Vessel IMO Number', field: 'imoNumber', colId: 'imoNumber', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Vessel Name', field: 'vesselName', colId: 'vesselName', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Ship Owner', field: 'vesselOwner', colId: 'vesselOwner', width: 250, filter: 'agTextColumnFilter' },
                { headerName: 'Vessel Status', field: 'vesselStatus', colId: 'vesselStatus', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'Charter Type', field: 'charterType', colId: 'charterType', width: 175,  filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'Voyage Status', field: 'voyageStatus', colId: 'voyageStatus', width: 175, filter: 'agTextColumnFilter' }




                { headerName: 'DOC_ID', field: 'DOC_ID', colId: 'DOC_ID', width: 130, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'Group Co', field: 'Group Co', colId: 'Group Co', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Trade', field: 'Trade', colId: 'Trade', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Quota', field: 'Quota', colId: 'Quota', width: 250, filter: 'agTextColumnFilter' },
                { headerName: 'Direction', field: 'Direction', colId: 'Direction', width: 175, filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'Assignment', field: 'Assignment', colId: 'Assignment', width: 175,  filter: 'agTextColumnFilter', suppressMenu: true },
                { headerName: 'Status', field: 'Status', colId: 'Status', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Category', field: 'Category', colId: 'Category', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Ccy', field: 'Ccy', colId: 'Ccy', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Code', field: 'Code', colId: 'Code', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Description', field: 'Description', colId: 'Description', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Status Type', field: 'Status Type', colId: 'Status Type', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Derivative', field: 'Derivative', colId: 'Derivative', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Counterparty', field: 'Counterparty', colId: 'Counterparty', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Quantity', field: 'Quantity', colId: 'Quantity', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Per Unit', field: 'Per Unit', colId: 'Per Unit', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Estimate (CNY)', field: 'Estimate (CNY) ', colId: 'Estimate (CNY)', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Commodity', field: 'Commodity', colId: 'Commodity', width: 175, filter: 'agTextColumnFilter' },
                { headerName: 'Delivery Date', field: 'Delivery Date', colId: 'Delivery Date', width: 175, filter: 'agTextColumnFilter' },
            ]
        }*/
        }
    }

}




