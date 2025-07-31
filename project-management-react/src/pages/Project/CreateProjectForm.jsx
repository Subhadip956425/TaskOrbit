import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { tags } from "@/constants/tags";
import { useDispatch } from "react-redux";
import { createProject } from "../Redux/Project/Action";

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [projectCreated, setProjectCreated] = useState(false); // used to conditionally render DialogClose

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const { reset } = form;

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");
    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter((tag) => tag !== newValue)
      : [...currentTags, newValue];

    form.setValue("tags", updatedTags, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await dispatch(createProject(data)); // assume this is async and throws on error

      setSuccessMessage("Project created successfully.");
      setProjectCreated(true);
      reset();
    } catch (err) {
      setErrorMessage("Failed to create project. Please try again.");
      setProjectCreated(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Project name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Project description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            rules={{
              validate: (value) =>
                value.length > 0 || "At least one tag must be selected",
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={handleTagsChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <div className="flex gap-1 flex-wrap">
                  {field.value.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleTagsChange(item)}
                      className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
                    >
                      <span className="text-sm">{item}</span>
                      <Cross1Icon className="h-3 w-3" />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error or Success message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">
              {successMessage}
            </p>
          )}

          {/* Conditionally render DialogClose only after success */}
          {projectCreated ? (
            <DialogClose asChild>
              <Button type="submit" className="w-full mt-5">
                Create Project
              </Button>
            </DialogClose>
          ) : (
            <Button type="submit" className="w-full mt-5">
              Create Project
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
