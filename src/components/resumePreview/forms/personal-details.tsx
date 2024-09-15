"use client";

import { updateResume } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo } from "@/contexts/resume-info";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type PersonalDetailsProps = {
  enabaledNext: React.Dispatch<React.SetStateAction<boolean>>;
};

type ResumeData = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
};

export default function PersonalDetails({
  enabaledNext,
}: PersonalDetailsProps) {
  const params = useParams();
  const resumeId = params.resumeId as string;
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [resumeData, setResumeData] = useState<ResumeData | undefined>();

  const updateResumeMutation = useMutation({
    mutationFn: async () => {
      if (!resumeData) throw new Error("No resume data to update");
      const resumeDataWithId = { ...resumeData, id: resumeId };
      const result = await updateResume(resumeDataWithId);
      if (!result.success) {
        throw new Error(result.error || "Failed to update resume");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Resume updated successfully");
      enabaledNext(true);
    },
    onError: (error) => {
      console.error("Failed to create resume:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    enabaledNext(false);
    setResumeInfo((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      jobTitle: formData.get("jobTitle") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    };

    setResumeData(data);
    updateResumeMutation.mutate();
  };
  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={updateResumeMutation.isPending}>
            {updateResumeMutation.isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
