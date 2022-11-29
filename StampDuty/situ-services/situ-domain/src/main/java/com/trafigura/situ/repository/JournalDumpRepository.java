package com.trafigura.situ.repository;

import com.trafigura.situ.domain.JournalDumpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface JournalDumpRepository extends JpaRepository<JournalDumpEntity, Long> {
    @Transactional
    @Modifying
    void deleteByGroupCompanyCodeAndPeriod(String groupCompanyCode, String period);

    //    @Query(nativeQuery = true,
//            value = " Select CONTRACT_NO, T5, T3, "
//                    + " Max(SETTLEMENT_DATE) as MAX_SETTLEMENT_DATE, "
//                    + " If(T5='I01',sum(-VAT_EXCLUSIVE_AMOUNT),sum(VAT_EXCLUSIVE_AMOUNT)) as SUM_VAT_EXCLUSIVE_AMOUNT "
//                    + " from JOURNAL_DUMP "
//                    + " where GROUPCOMPANY_CODE = :groupCompanyCode"
//                    + " and SETTLEMENT_DATE >= :settlementDate_from"
//                    + " and SETTLEMENT_DATE <= :settlementDate_to"
//                    + " group by CONTRACT_NO, T5, T3 ")
//    @Query(nativeQuery = true,
//            value = " Select CONTRACT_NO, T5, T3, "
//                    + " Max(SETTLEMENT_DATE) as MAX_SETTLEMENT_DATE, "
//                    + " sum(-VAT_EXCLUSIVE_AMOUNT) as SUM_VAT_EXCLUSIVE_AMOUNT, "
//                    + " Max(T8) as MAX_T8T9 "
//                    + " from JOURNAL_DUMP "
//                    + " where GROUPCOMPANY_CODE = :groupCompanyCode1 "
//                    + " and T5 = 'I01' "
//                    + " and SETTLEMENT_DATE >= :settlementDate_from1 "
//                    + " and SETTLEMENT_DATE <= :settlementDate_to1 "
//                    + " group by CONTRACT_NO, T5, T3 "
//                    + " Union All "
//                    + " Select CONTRACT_NO, T5, T3, "
//                    + " Max(SETTLEMENT_DATE) as MAX_SETTLEMENT_DATE, "
//                    + " sum(VAT_EXCLUSIVE_AMOUNT) as SUM_VAT_EXCLUSIVE_AMOUNT, "
//                    + " Max(T9) as MAX_T8T9 "
//                    + " from JOURNAL_DUMP "
//                    + " where GROUPCOMPANY_CODE = :groupCompanyCode2 "
//                    + " and T5 = 'C01' "
//                    + " and SETTLEMENT_DATE >= :settlementDate_from2 "
//                    + " and SETTLEMENT_DATE <= :settlementDate_to2 "
//                    + " group by CONTRACT_NO, T5, T3 ")
    @Query(nativeQuery = true,
            value = " Select CONTRACT_NO, T5, T3, "
                    + " Max(SETTLEMENT_DATE) as MAX_SETTLEMENT_DATE, "
                    + " If(T5='I01',sum(-VAT_EXCLUSIVE_AMOUNT),sum(VAT_EXCLUSIVE_AMOUNT)) as SUM_VAT_EXCLUSIVE_AMOUNT, "
                    + " If(T5='I01',MAX(T8),MAX(T9)) as MAX_T8T9 "
                    + " from JOURNAL_DUMP "
                    + " where GROUPCOMPANY_CODE = :groupCompanyCode"
                    + " and SETTLEMENT_DATE >= :settlementDate_from"
                    + " and SETTLEMENT_DATE <= :settlementDate_to"
                    + " group by CONTRACT_NO, T5, T3 ")
    List<Object> searchReportData(@Param("groupCompanyCode") String groupCompanyCode,
                                  @Param("settlementDate_from") LocalDate settlementDate_from,
                                  @Param("settlementDate_to") LocalDate settlementDate_to);

//    @Query(value = " Select contractNo, t5, t3, "
//            + " Max(settlementDate) as MAX_SETTLEMENT_DATE, "
//            + " If(T5='I01',sum(-vatExclusiveAmount),sum(vatExclusiveAmount)) as SUM_VAT_EXCLUSIVE_AMOUNT "
//            + " from JournalDumpEntity "
//            + " where groupCompanyCode = :groupCompanyCode"
//            + " and settlementDate >= :settlementDate_from"
//            + " and settlementDate <= :settlementDate_to"
//            + " group by contractNo, t5, t3 ")
//    List<Object> searchReportData(@Param("groupCompanyCode") String groupCompanyCode,
//                                  @Param("settlementDate_from") LocalDate settlementDate_from,
//                                  @Param("settlementDate_to") LocalDate settlementDate_to);
}
