package com.taskorbit.projectmanagementsystem.repository;

import com.taskorbit.projectmanagementsystem.modal.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    public List<Issue> findByProjectId(Long id);
}
