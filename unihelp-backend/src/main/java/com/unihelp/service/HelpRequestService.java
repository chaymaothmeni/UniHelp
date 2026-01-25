package com.unihelp.service;

import com.unihelp.dto.HelpRequestDto;
import com.unihelp.model.HelpRequest;
import com.unihelp.model.User;
import com.unihelp.repository.HelpRequestRepository;
import com.unihelp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HelpRequestService {

    @Autowired
    private HelpRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public HelpRequest createRequest(HelpRequestDto dto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        HelpRequest request = new HelpRequest();
        request.setUser(user);
        request.setSubject(dto.getSubject());
        request.setTopic(dto.getTopic());
        request.setDescription(dto.getDescription());
        request.setStatus("OPEN");

        return requestRepository.save(request);
    }

    public List<HelpRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public HelpRequest getRequestById(String id) {
        return requestRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }
}