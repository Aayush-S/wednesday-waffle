import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Wednesday Waffle 🧇</h1>
      <Button asChild>
        <Link href="/upload">Upload</Link>
      </Button>
    </div>
  );
}
