package com.trafigura.situ.utils;

public final class MessageDefine {
    public static final String uploadStatus_Fail = "Fail";
    public static final String uploadStatus_Success = "Success";
    public static final String active_Yes = "Yes";
    public static final String active_No = "No";

    public static final String error_dataError = "Data error was found, please check detail error messages.";
    public static final String error_fileIOError = "Fail to read file, please retry later.";
    public static final String error_sheetNotExist = "Sheet: [{0}] not exist.";
    public static final String error_errorLimit = "检测到{0}个以上错误，请检查文件.";
    public static final String error_isNull = "[{0}] can not be empty.";
    public static final String error_RateNotExist = "Rate Configuration [{0}] not exist.";
    public static final String error_DateDuplicate = "date range [起效日期 （{0}}）, 终止日期（{1}}）] should not have intersection between any of two entries.";
    public static final String error_DateReversed = "起效日期 [{0}] should not later then 终止日期 [{1}].";
    public static final String error_validToIsNull = "Before adding a new rate, please fill in the 终止日期 of the existing data.";
    public static final String error_DateRateNotExist = "rate info of [{0}] is not exist.";
    public static final String info_uploadSuccess = "Upload success.";
}
