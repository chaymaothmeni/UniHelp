package com.unihelp.dto;

import lombok.Data;

@Data
public class HelpRequestDto {
    private String subject;
    private String topic;
    private String description;
}