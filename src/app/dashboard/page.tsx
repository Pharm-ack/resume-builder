import AddResume from "@/components/add-resume";
import ResumeCard from "@/components/resume-card";
import prisma from "@/lib/db";
import { Resume } from "@/types/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function page() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const resumes = await prisma.resume.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-col p-4 sm:p-6">
      <h1 className="mb-3 text-2xl font-bold">My Resume</h1>
      <p className="mb-3 text-sm">
        Start creating AI resume to your next job role
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddResume />
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume as Resume} />
        ))}
      </div>
    </main>
  );
}
