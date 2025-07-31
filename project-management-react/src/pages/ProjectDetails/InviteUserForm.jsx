import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React, { useState } from "react";
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
import { inviteToProject } from "../Redux/Project/Action";
import { useParams } from "react-router-dom";

const InviteUserForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error"
  const [loading, setLoading] = useState(false); // loading button

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    setStatus(null);

    try {
      const res = await dispatch(
        inviteToProject({ email: data.email, projectId: id })
      );

      if (res?.message === "User invitation sent successfully") {
        setStatus("success");
        setMessage("User invited successfully!");
        form.reset(); // clear input
      } else {
        // if some other response comes back
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("User not found or already invited.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="user email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {message && (
            <p
              className={`text-sm font-medium ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <Button type="submit" className="w-full mt-5" disabled={loading}>
            {loading ? "Inviting..." : "Invite User"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InviteUserForm;
