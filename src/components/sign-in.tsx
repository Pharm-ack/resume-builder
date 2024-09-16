"use client";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { LoginSchema } from "@/schema";
import { login } from "@/actions/actions";
import PendingButton from "./pending-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Social from "./socials";
import { cn } from "@/lib/utils";

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function SignInForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  const router = useRouter();

  const [formState, action] = useFormState<FormState, FormData>(
    async (prevState, formData) => {
      const result = await login(prevState, formData);
      if (result.status === "success") {
        toast.success(result.message);
        router.push("/");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
      return result;
    },
    {
      status: undefined,
      message: "",
    },
  );
  const [form, fields] = useForm({
    lastResult: formState,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get("error");
    if (error === "OAuthAccountNotLinked") {
      setUrlError("Email already in use with different provider!");
    }
    router.replace("/auth/sign-in");
  }, [router]);

  useEffect(() => {
    if (urlError) {
      toast.error(urlError);
      setUrlError(null);
    }
  }, [urlError]);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Separator className="flex-1" />
      <p className="shrink-0 text-xs text-muted-foreground">OR</p>
      <Separator className="flex-1" />
    </div>
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Link
        href="/#"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-card px-8 pb-10 pt-6 shadow-md">
        <h1 className="mb-4 text-xl font-medium">Log In</h1>
        <AnimatePresence initial={false} mode="popLayout">
          {isFormVisible ? (
            <motion.form
              id={form.id}
              onSubmit={form.onSubmit}
              action={action}
              noValidate
              animate="visible"
              className="flex flex-col gap-y-3"
              exit="hidden"
              initial="hidden"
              variants={variants}
            >
              <div className="relative">
                <Input
                  required
                  placeholder="Email Address"
                  type="email"
                  key={fields.email.key}
                  name={fields.email.name}
                  defaultValue={fields.email.initialValue}
                  className={fields.email.errors ? "pr-24" : ""}
                />
                {fields.email.errors && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-xs text-red-500">
                      {fields.email.errors}
                    </span>
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  required
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  key={fields.password.key}
                  name={fields.password.name}
                  defaultValue={fields.password.initialValue}
                  className={fields.password.errors ? "pr-24" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                {fields.password.errors && (
                  <div className="pointer-events-none absolute inset-y-0 right-8 flex items-center pr-3">
                    <span className="text-xs text-red-500">
                      {fields.password.errors}
                    </span>
                  </div>
                )}
              </div>

              <PendingButton>Login In</PendingButton>
              {orDivider}
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setIsFormVisible(false)}
              >
                <Icon className="mr-2 h-4 w-4" icon="solar:arrow-left-linear" />
                Other Login options
              </Button>
            </motion.form>
          ) : (
            <>
              <Button className="w-full" onClick={() => setIsFormVisible(true)}>
                <Icon className="mr-2 h-4 w-4" icon="solar:letter-bold" />
                Continue with Email
              </Button>
              {orDivider}
              <motion.div
                animate="visible"
                className="flex flex-col gap-y-2"
                exit="hidden"
                initial="hidden"
                variants={variants}
              >
                <Social />
                <p className="mt-3 text-center text-sm">
                  Need to create an account?&nbsp;
                  <Link
                    href="/auth/sign-up"
                    className="text-primary hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
