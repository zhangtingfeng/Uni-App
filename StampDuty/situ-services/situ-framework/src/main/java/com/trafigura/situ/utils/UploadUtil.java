package com.trafigura.situ.utils;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;

public class UploadUtil {

    public static int errorLimit = 30;

    public static LocalDate getFirstDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最大天数
        int firstDay = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, firstDay);
        //格式化日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String lastDayOfMonth = sdf.format(cal.getTime());
        return LocalDate.parse(lastDayOfMonth, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public static LocalDate getFirstDayOfMonth(String period) {
        int year = Integer.parseInt(period.substring(0, 4));
        int month = Integer.parseInt(period.substring(7));
        return getFirstDayOfMonth(year, month);
    }

    public static LocalDate getFirstDayOfMonth(String year, String month) {
        return getFirstDayOfMonth(Integer.parseInt(year), Integer.parseInt(month));
    }

    public static LocalDate getLastDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        //格式化日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String lastDayOfMonth = sdf.format(cal.getTime());
        return LocalDate.parse(lastDayOfMonth, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public static LocalDate getLastDayOfMonth(String period) {
        int year = Integer.parseInt(period.substring(0, 4));
        int month = Integer.parseInt(period.substring(7));
        return getLastDayOfMonth(year, month);
    }

    public static LocalDate getLastDayOfMonth(String year, String month) {
        return getLastDayOfMonth(Integer.parseInt(year), Integer.parseInt(month));
    }

    public static String convertQuotaIDToContractNo(String quotaID, String groupCompanyCode, String commodity) {
        if (quotaID.contains("TFS")) return quotaID;

        String contractNo = quotaID.substring(0, quotaID.indexOf("."));
        if (contractNo.indexOf("S") > 0 || contractNo.indexOf("P") > 0) {
            //contractNo = commodity + "-" + contractNo.substring(0, 2) + (legalEntity.equals("TIC") ? "TTS" : legalEntity) + "-" + contractNo.substring(2);
            contractNo = commodity + "-" + contractNo.substring(0, 2) + groupCompanyCode + "-" + contractNo.substring(2);
        }
        return contractNo;
    }

    public static String convertSaturnFormatContractNo(String groupCompanyCode, String saturnContractNo) {
        String contractNo = saturnContractNo;
        if (contractNo.indexOf(groupCompanyCode) > 0) {
            //503-22TTS-305P
            contractNo = contractNo.substring(4, 6) + contractNo.substring(10, 14);

        }
        return contractNo;
    }

    public static String upperCaseString(String str) {
        if (str == null) return null;
        return str.toUpperCase();
    }

}
