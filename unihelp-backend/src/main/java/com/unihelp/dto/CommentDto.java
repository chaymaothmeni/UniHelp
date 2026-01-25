package com.unihelp.dto;

import lombok.Data;

@Data
public class CommentDto {
    private String content;
    private String parentId;   
}