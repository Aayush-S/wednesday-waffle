import WaffleCard from "@/components/waffle-card/waffle-card";

export default async function WaffleGroup({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Waffles 🧇</h1>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Group: {groupId}</h2>
        <p className="text-gray-600">
          You are currently in the waffle group: {groupId}
        </p>
        <WaffleCard
          id="1"
          author="John Doe"
          videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          createdAt="2021-01-01"
          updatedAt="2021-01-01"
          likes={10}
          comments={10}
          shares={10}
          views={10}
          tags={["waffle", "waffle group"]}
        />
      </div>
    </div>
  );
}
