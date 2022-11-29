package com.trafigura.situ.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ReportGenerationVO {

    //纳税人识别号（统一社会信用编码）
    private String groupCompanyTaxID;
    //纳税人（缴费人）名称
    private String groupCompanyChineseName;
    //应税凭证税务编号
    private String contractTaxNo;
    //应税凭证编号
    private String contractNo;
    //应税凭证名称
    private String contractName;
    //申报期限类型
    private String byPeriodORByContract;
    //应税凭证数量
    private String contractCounts;
    //税目
    private String taxableItem;
    //子目
    private String taxableChildItem;
    //税款所属期起
    private LocalDate startDate;
    //税款所属期止
    private LocalDate endDate;
    //应税凭证书立日期
    private LocalDate tradeDate;
    //计税金额
    private BigDecimal taxableAmountOFTheContract;
    //实际结算日期
    private LocalDate actualSettlementDate;
    //实际结算金额
    private BigDecimal actualSettlementAmount;
    //税率
    private String taxRate;
    //减免性质代码和项目名称
    private String taxDeductionAndExemptionCodeAndName;
    //对方书立人信息 - 对方书立人名称
    private String counterpartyChineseName;
    //对方书立人信息 - 对方书立人纳税人识别号（统一社会信用编码）
    private String counterpartyTaxID;
    //对方书立人信息 - 对方书立人涉及金额
    private BigDecimal counterpartyTaxableAmount;
    //对方书立人信息获取失败原因
    private String mappingFailMessage;

}
