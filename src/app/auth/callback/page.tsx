"use client";
import { checkAuthStatus } from "@/actions/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const { data, isLoading } = useQuery({
    queryKey: ["check-auth-status"],
    queryFn: async () => await checkAuthStatus(),
  });

  if (!isLoading && data?.success) router.push("/");
  return (
    <div className="mt-20 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader className="h-10 w-10 animate-spin text-primary" />
        <h3 className="text-xl font-bold">Redirecting...</h3>
        <p>Please wait...</p>
      </div>
    </div>
  );
}
