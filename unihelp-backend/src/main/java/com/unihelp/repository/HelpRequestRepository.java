package com.unihelp.repository;

import com.unihelp.model.HelpRequest;
import com.unihelp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HelpRequestRepository extends JpaRepository<HelpRequest, UUID> {
    List<HelpRequest> findByUser(User user);

}