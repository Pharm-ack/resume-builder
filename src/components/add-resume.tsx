"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResume } from "@/actions/actions";
import { LuLoader2 } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const createResumeMutation = useMutation({
    mutationFn: async () => await createResume(title),
    onSuccess: (data) => {
      setOpenDialog(false);
      setTitle("");
      if (data.success && data.resumeId) {
        router.push(`/dashboard/resume/${data.resumeId}/edit`);
      } else {
        console.error(
          "Resume creation was successful, but no resumeId was returned",
        );
        // Handle this case appropriately, maybe show an error message to the user
      }
    },
    onError: (error) => {
      console.error("Failed to create resume:", error);
    },
  });

  const handleCreateResume = () => {
    if (!title) return;
    createResumeMutation.mutate();
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Card
            onClick={() => setOpenDialog(true)}
            className="h-[150px] cursor-pointer border-dashed transition-all hover:scale-100 hover:shadow-md"
          >
            <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
              <PlusIcon className="h-10 w-10 text-primary" />
              <div className="text-center text-muted-foreground">
                Create New Resume
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription className="text-sm">
              Add Title for your new resume
            </DialogDescription>
            <DialogDescription>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex.Pharmcists"
                value={title}
              />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-end">
            <Button
              onClick={() => setOpenDialog(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>

            <Button
              onClick={handleCreateResume}
              disabled={!title || createResumeMutation.isPending}
              type="submit"
              variant="default"
            >
              {createResumeMutation.isPending ? (
                <LuLoader2 className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
