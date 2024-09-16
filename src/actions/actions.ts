"use server";

import { Prisma, Resume } from "@prisma/client";
import { parseWithZod } from "@conform-to/zod";
import { LoginSchema, RegisterSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/db";

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
};

export async function register(
  prevState: unknown,
  formData: FormData,
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: RegisterSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { name, email, password } = submission.value;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        status: "error",
        message: "Email already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function login(
  prevState: unknown,
  formData: FormData,
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: LoginSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { email, password } = submission.value;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "Invalid email or password",
          };
        default:
          return {
            status: "error",
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

export async function createResume(title: string) {
  const session = await auth();

  try {
    const resume = await prisma.resume.create({
      data: {
        title: title,
        userId: session?.user?.id as string,
        userEmail: session?.user?.email || "",
        userName: session?.user?.name || "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
        themeColor: "",
        summary: "",
        experience: [],
        education: [],
        skills: [],
      },
    });

    return { success: true, resumeId: resume.id };
  } catch (error) {
    return { success: false };
  }
}

export async function updateResume(data: Partial<Resume> & { id: string }) {
  const { id, experience, education, ...resumeData } = data;

  try {
    const updatedResume = await prisma.resume.update({
      where: { id },
      data: {
        ...resumeData,
        experience: experience
          ? (experience as Prisma.InputJsonValue[])
          : undefined,
        education: education
          ? (education as Prisma.InputJsonValue[])
          : undefined,
      },
    });

    console.log("Resume updated successfully:", updatedResume);
    return { success: true, data: updatedResume };
  } catch (error) {
    console.error("Error updating resume:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function fetchAllResumeData(
  resumeId: string,
): Promise<Resume | null> {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });
    console.log("from actions", resume);
    return resume as Resume | null;
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    return null;
  }
}
