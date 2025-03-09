"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Waffles() {
  const [groupId, setGroupId] = useState("");
  const router = useRouter();

  function joinGroup(group: string) {
    if (group.trim()) {
      router.push(`/waffles/${group}`);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-8">Waffles 🧇</h1>
      </div>
      <div className="flex flex-col items-center">
        <Input
          type="text"
          placeholder="Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="w-1/3 mb-4"
        />

        <Button onClick={() => joinGroup(groupId)}>Join</Button>
      </div>
    </div>
  );
}
