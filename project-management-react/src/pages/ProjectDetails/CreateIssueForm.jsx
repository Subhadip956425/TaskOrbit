import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { createIssue } from "../Redux/Issue/Action";
import { useParams } from "react-router-dom";

const CreateIssueForm = ({ status }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "",
    },
  });

  const { reset } = form;

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [issueCreated, setIssueCreated] = useState(false);

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIssueCreated(false);

    try {
      const payload = {
        title: data.issueName,
        description: data.description,
        projectId: id,
        status,
      };

      await dispatch(createIssue(payload));
      setSuccessMessage("Issue created successfully.");
      setIssueCreated(true);
      reset(); // clear form
    } catch (error) {
      setErrorMessage("Failed to create issue. Please try again.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="issueName"
            rules={{ required: "Issue name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Issue name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Show error or success messages */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">
              {successMessage}
            </p>
          )}

          {/* Only close the dialog if issueCreated is true */}
          {issueCreated ? (
            <DialogClose asChild>
              <Button type="submit" className="w-full mt-5">
                Create Issue
              </Button>
            </DialogClose>
          ) : (
            <Button type="submit" className="w-full mt-5">
              Create Issue
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;
