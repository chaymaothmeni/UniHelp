package com.unihelp.service;

import com.unihelp.model.Comment;
import com.unihelp.model.HelpRequest;
import com.unihelp.model.User;
import com.unihelp.repository.CommentRepository;
import com.unihelp.repository.HelpRequestRepository;
import com.unihelp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private HelpRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment addComment(String requestId, String content, String email, String parentId) {
        HelpRequest request = requestRepository.findById(UUID.fromString(requestId))
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Comment comment = new Comment();
        comment.setRequest(request);
        comment.setUser(user);
        comment.setContent(content);

        if (parentId != null && !parentId.isEmpty()) {
            Comment parent = commentRepository.findById(UUID.fromString(parentId))
                    .orElseThrow(() -> new RuntimeException("Commentaire parent non trouvé"));
            
            if (!parent.getRequest().getId().equals(request.getId())) {
                throw new RuntimeException("Le parent ne correspond pas à cette demande");
            }
            comment.setParent(parent);
        }

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByRequest(String requestId) {
        HelpRequest request = requestRepository.findById(UUID.fromString(requestId))
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        return commentRepository.findByRequestOrderByCreatedAtAsc(request);
    }

    
    public List<Comment> getRootCommentsWithReplies(String requestId) {
        HelpRequest request = requestRepository.findById(UUID.fromString(requestId))
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        return commentRepository.findByParentIsNullAndRequestOrderByCreatedAtAsc(request);
    }
}