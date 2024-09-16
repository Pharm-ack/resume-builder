import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Brain, FileText, CheckSquare, Eye, MousePointer, FileOutput } from 'lucide-react';
import Image from "next/image";

const features = [
  {
    Icon: Brain,
    name: "AI-powered content suggestions",
    description: "Get intelligent recommendations for your resume content, tailored to your industry and experience.",
    href: "/features/ai-suggestions",
    cta: "Learn more",
    background: <Image src="" alt="AI background" className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: FileText,
    name: "Professional templates",
    description: "Choose from a wide range of professionally designed resume templates to make your application stand out.",
    href: "/templates",
    cta: "Explore templates",
    background: <Image src="" alt="Templates background" className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: CheckSquare,
    name: "ATS-friendly formats",
    description: "Ensure your resume passes through Applicant Tracking Systems with our optimized formats.",
    href: "/features/ats-friendly",
    cta: "Learn more",
    background: <Image src="" alt="ATS background" className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Eye,
    name: "Real-time preview",
    description: "See changes to your resume in real-time as you edit, ensuring your document looks perfect.",
    href: "/features/live-preview",
    cta: "Try it out",
    background: <Image src="" alt="Preview background" className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: MousePointer,
    name: "Easy-to-use interface",
    description: "Our intuitive interface makes creating and editing your resume a breeze, even for beginners.",
    href: "/features/user-interface",
    cta: "See how it works",
    background: <Image src="" alt="Interface background" className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
  // {
  //   Icon: FileOutput,
  //   name: "Export to multiple formats",
  //   description: "Download your resume in various formats including PDF, DOCX, and plain text to suit different application requirements.",
  //   href: "/features/export-options",
  //   cta: "Learn more",
  //   background: <Image src="" alt="Export background" className="absolute -right-20 -top-20 opacity-60" />,
  //   className: "lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  // },
];

export async function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
