import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Resume } from "@/types/types";
import Link from "next/link";

type ResumeCardProps = {
  resume: Resume;
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{resume.title}</CardTitle>
          <CardDescription>
            Created on{" "}
            {new Date(resume.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" size="sm">
            View
          </Button>
          <Button variant="default" size="sm" className="ml-2">
            <Link href={`/dashboard/resume/${resume.id}/edit`}>Edit</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backend Engineer</CardTitle>
          <CardDescription>Created on 2023-05-15</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" size="sm">
            View
          </Button>
          <Button variant="outline" size="sm" className="ml-2">
            Edit
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
