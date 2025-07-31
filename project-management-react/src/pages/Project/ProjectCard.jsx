import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../Redux/Project/Action";

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProject({ projectId: item.id }));
  };

  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate("/project/" + item.id)}
                className="cursor-pointer"
              >
                {item.name}
              </h1>
              <DotFilledIcon />
              <p className="text-sm yext-gray-400">{item.category}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 item-center">
          {item.tags.map((tag) => (
            <Badge
              key={item}
              variant="outline"
              className="bg-blue-500 text-white dark:bg-blue-500"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
