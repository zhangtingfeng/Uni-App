package org.eggsoft.cn.common;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JsonUtil {
    private static ObjectMapper mapper;
    private static JsonInclude.Include DEFAULT_PROPERTY_INCLUSION = JsonInclude.Include.NON_DEFAULT;
    private static boolean IS_ENABLE_INDENT_OUTPUT = false;
    private static String CSV_DEFAULT_COLUMN_SEPARATOR = ",";

    public static boolean isJson(String json) {
        try {
            mapper.readTree(json);
            return true;
        } catch (Exception e) {
            log.error("jackson check json error, json: {}", json, e);
            return false;
        }
    }


    /*
        @JsonIgnore
        此注解用于属性上 作用是进行JSON操作时忽略该属性
        @JsonFormat
        此注解用于属性上 作用是把Date类型直接转化为想要的格式，如@JsonFormat(pattern = "yyyy-MM-dd HH-mm-ss")
        @JsonProperty
        此注解用于属性上 作用是把该属性的名称序列化为另外一个名称，如把trueName属性序列化为name，@JsonProperty("name")
      */
    public String serialize(Object obj) {
        try {
            return mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public <T> T deserialize(String jsonText, Class<T> beanClass) {
        try {
            return mapper.readValue(jsonText, beanClass);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public JsonNode deserialize(String jsonText) {
        try {
            return mapper.readTree(jsonText);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}