import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteIssue,
  fetchIssues,
  updateIssueStatus,
} from "../Redux/Issue/Action";
import EditIssueForm from "./EditIssueForm";

const IssueCard = ({ item, projectId }) => {
  const [localStatus, setLocalStatus] = useState(item.status);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIssueDelete = () => {
    dispatch(deleteIssue(item.id));
  };

  const handleStatusChange = async (status) => {
    if (item.status !== status) {
      await dispatch(updateIssueStatus({ id: item.id, status, projectId }));
      setLocalStatus(status);
    }
  };

  useEffect(() => {
    if (projectId) {
      dispatch(fetchIssues(projectId));
    }
  }, [projectId]);

  return (
    <>
      <Card className="rounded-md py-1 pb-2">
        <CardHeader className="py-0 pb-1">
          <div className="flex justify-between items-center">
            <CardTitle
              className="cursor-pointer"
              onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)}
            >
              {item.title}
            </CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {["Pending", "In Progress", "Done"].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={item.status === status}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleIssueDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="py-0">
          <div className="flex items-center justify-between">
            <p>FBP - {1}</p>
            <DropdownMenu className="w-[30rem] border border-red-400">
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="bg-gray-900 hover:text-black text-white rounded-full"
                >
                  <Avatar>
                    <AvatarFallback>
                      <PersonIcon />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <UserList issueDetails={item} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <EditIssueForm issue={item} open={editOpen} setOpen={setEditOpen} />
    </>
  );
};

export default IssueCard;
