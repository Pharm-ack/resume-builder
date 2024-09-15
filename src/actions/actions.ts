"use server";

import prisma from "@/lib/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma, Resume } from "@prisma/client";

export async function checkAuthStatus() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) return { success: false, message: "User not found" };

  const userExists = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userExists) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: `${user.given_name} ${user.family_name}`,
        image: user.picture,
      },
    });
  }

  return { success: true };
}

export async function createResume(title: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  try {
    const resume = await prisma.resume.create({
      data: {
        title: title,
        userId: user?.id as string,
        userEmail: user?.email || "",
        userName: `${user?.given_name} ${user?.family_name}`,
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
