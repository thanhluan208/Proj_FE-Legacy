"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";

const Login = () => {
  const loginSchema = z.object({
    email: z.string().refine(
      (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      {
        message: "Invalid email address",
      }
    ),
    password: z
      .string()
      .refine((password) => password.length >= 8, {
        message: "Password must be at least 8 characters",
      })
      .refine((password) => password.length <= 32, {
        message: "Password must be at most 32 characters",
      }),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <InputField control={loginForm.control} name="email" label="Email" />
      </form>
    </Form>
  );
};

export default Login;
