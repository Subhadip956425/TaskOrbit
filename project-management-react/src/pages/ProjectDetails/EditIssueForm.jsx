import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { fetchIssues, updateIssue } from "../Redux/Issue/Action";

const EditIssueForm = ({ issue, open, setOpen }) => {
  const [formData, setFormData] = useState({
    title: issue.title || "",
    description: issue.description || "",
    status: issue.status || "Pending",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
    };

    await dispatch(updateIssue({ id: issue.id, ...payload }));

    if (issue.projectId) {
      dispatch(fetchIssues(issue.projectId));
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Issue</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Issue Title"
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Issue Description"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <Button onClick={handleSubmit}>Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditIssueForm;
