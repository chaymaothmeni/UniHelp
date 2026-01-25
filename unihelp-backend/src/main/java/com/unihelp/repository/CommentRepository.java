package com.unihelp.repository;

import com.unihelp.model.Comment;
import com.unihelp.model.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    List<Comment> findByRequestOrderByCreatedAtAsc(HelpRequest request);

    List<Comment> findByParentIsNullAndRequestOrderByCreatedAtAsc(HelpRequest request);
}