package com.unihelp.controller;
import com.unihelp.dto.CommentDto;
import com.unihelp.dto.HelpRequestDto; // on créera ce DTO après
import com.unihelp.model.Comment;
import com.unihelp.model.HelpRequest;
import com.unihelp.service.CommentService;
import com.unihelp.service.HelpRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class HelpRequestController {

    @Autowired
    private HelpRequestService helpRequestService;

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<HelpRequest> createRequest(
            @RequestBody HelpRequestDto dto,
            Authentication authentication) {

        String email = authentication.getName(); // email de l'utilisateur connecté (du JWT)
        HelpRequest request = helpRequestService.createRequest(dto, email);
        return ResponseEntity.ok(request);
    }

    @GetMapping
    public ResponseEntity<List<HelpRequest>> getAllRequests() {
        return ResponseEntity.ok(helpRequestService.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HelpRequest> getRequestById(@PathVariable String id) {
        // À implémenter dans le service
        return ResponseEntity.ok(helpRequestService.getRequestById(id));
    }
    @PostMapping("/{id}/comments")
public ResponseEntity<Comment> addComment(
        @PathVariable String id,
        @RequestBody CommentDto dto,
        Authentication authentication) {

    String email = authentication.getName();
    Comment comment = commentService.addComment(
            id,
            dto.getContent(),
            email,
            dto.getParentId()
    );
    return ResponseEntity.ok(comment);
}

@GetMapping("/{id}/comments")
public ResponseEntity<List<Comment>> getComments(@PathVariable String id) {
    return ResponseEntity.ok(commentService.getCommentsByRequest(id));
}

}