package com.taskorbit.projectmanagementsystem.service;

import com.taskorbit.projectmanagementsystem.modal.Issue;
import com.taskorbit.projectmanagementsystem.modal.Project;
import com.taskorbit.projectmanagementsystem.modal.User;
import com.taskorbit.projectmanagementsystem.repository.IssueRepository;
import com.taskorbit.projectmanagementsystem.request.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssueService{

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Override
    public Issue getIssueById(Long issueId) throws Exception {
        Optional<Issue> issue = issueRepository.findById(issueId);
        if (issue.isPresent()) {
            return issue.get();
        }
        throw new Exception("No issue found with issueId: " + issueId);
    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId) throws Exception {
        return issueRepository.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest issueRequest, User user) throws Exception {
        Project project = projectService.getProjectById(issueRequest.getProjectId());

        Issue issue = new Issue();
        issue.setTitle(issueRequest.getTitle());
        issue.setDescription(issueRequest.getDescription());
        issue.setStatus(issueRequest.getStatus());
//        issue.setProjectID(issue.getProjectID());
        issue.setProjectID(issueRequest.getProjectId());
        issue.setCreatedBy(user);
//        issue.setProject(project);
        issue.setPriority(issueRequest.getPriority());
        issue.setDueDate(issueRequest.getDueDate());

        issue.setProject(project);

        return issueRepository.save(issue);
    }

    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {
        getIssueById(issueId);
        issueRepository.deleteById(issueId);
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws Exception {
        User user = userService.findUserById(userId);
        Issue issue = getIssueById(issueId);
        issue.setAssignee(user);

        return issueRepository.save(issue);
    }

    @Override
    public Issue updateStatus(Long issueId, String status) throws Exception {
        Issue issue = getIssueById(issueId);
        issue.setStatus(status);

        return issueRepository.save(issue);
    }

    public Issue updateIssue(Long issueId, IssueRequest issueRequest, Long userId) throws Exception {
        Issue existingIssue = getIssueById(issueId);

//        if (!existingIssue.getCreatedBy().getId().equals(userId)) {
//            throw new Exception("Unauthorized to update this issue.");
//        }

        if (!existingIssue.getCreatedBy().getId().equals(userId) &&
                (existingIssue.getAssignee() == null || !existingIssue.getAssignee().getId().equals(userId))) {
            throw new Exception("Unauthorized to update this issue.");
        }


        existingIssue.setTitle(issueRequest.getTitle());
        existingIssue.setDescription(issueRequest.getDescription());
//        existingIssue.setPriority(issueRequest.getPriority());
//        existingIssue.setDueDate(issueRequest.getDueDate());
        existingIssue.setStatus(issueRequest.getStatus());
//        existingIssue.setTags(issueRequest.getTags());
        // Update other fields as necessary


        return issueRepository.save(existingIssue);
    }

}
