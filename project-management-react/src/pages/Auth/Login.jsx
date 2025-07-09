import React from "react";
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
import { login } from "../Redux/Auth/Action";

const Login = () => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    console.log("Login project data", data);
  };

  return (
    <div className="space-y-5">
      <h1 className="login-title text-center text-3xl font-semibold tracking-wide text-white">
        Login
      </h1>

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
                    placeholder="abc@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-5 register-btn">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
