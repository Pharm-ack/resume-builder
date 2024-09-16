import { BentoDemo } from "@/components/bento-features";
import { BorderBeam } from "@/components/magicui/border-beam";
import ShineBorder from "@/components/magicui/shine-border";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Companies } from "./social-proof";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroPage() {
  return (
    <>
      <section className="lg:py-18 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="md:sm-20 container flex max-w-[64rem] flex-col items-center gap-4 text-center sm:mb-10 lg:mb-20">
          {/* <ShineBorder
            className="text-center capitalize bg-muted px-4 py-1.5 text-lg font-medium absolute"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            Introducing QuotesAI ✨
          </ShineBorder> */}

          <h1 className="font-heading mt-20 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Build Your Dream Career with Our AI-Powered Resume Builder
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Create professional resumes in minutes, not hours. Stand out from
            the crowd and land your dream job.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/sign-in"
              className="group relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="absolute right-0 translate-x-full opacity-0 transition-transform duration-300 group-hover:-translate-x-full group-hover:opacity-100">
                <ArrowRight className="h-5 w-5" />
              </span>
              <span className="transition-transform duration-300 group-hover:-translate-x-2">
                Get Started
              </span>
            </Link>
            <Link
              href="/#features"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-sm-2",
              )}
            >
              Let&apos;s Explore 👇🏻
            </Link>
          </div>
        </div>
        <div className="relative mx-auto flex flex-col items-center justify-center overflow-hidden rounded-xl md:overflow-auto lg:max-w-[800px] lg:overflow-auto">
          <Image
            width={500}
            height={300}
            src="/resumepic.jpg"
            alt="Hero Image"
            className="block overflow-hidden rounded-[inherit] border object-contain shadow-lg dark:hidden md:overflow-auto lg:max-w-[800px] lg:overflow-auto"
          />

          <BorderBeam size={200} />
        </div>
      </section>

      <Companies />

      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-10"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h3 className="pb-2 text-center text-sm font-semibold text-gray-500">
            FEATURES
          </h3>
        </div>
        <BentoDemo />
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Join thousands of job seekers who have successfully landed their
            dream jobs using our platform.
          </p>
          {/* <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Let&apos;s Try Now - {" "}
            <Link
              href="/login"
             
              className="underline underline-offset-4"
            >
              Get Started 
            </Link>
            .{" "}
          </p> */}

          <Link
            href="/auth/sign-in"
            className="group relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <span className="absolute right-0 translate-x-full opacity-0 transition-transform duration-300 group-hover:-translate-x-full group-hover:opacity-100">
              <ArrowRight className="h-5 w-5" />
            </span>
            <span className="transition-transform duration-300 group-hover:-translate-x-2">
              Start Building Now
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
