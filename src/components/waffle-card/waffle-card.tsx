import { Card, CardHeader } from "../ui/card";

export default function WaffleCard(props: {
  id: string;
  author: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  tags: string[];
}) {
  return (
    <Card>
      <CardHeader>{props.author}</CardHeader>
    </Card>
  );
}
