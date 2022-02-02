import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

type character = {
  image: string;
  name: string;
  id: string | number;
};

export default function CharacterCard({ id, image, name }: character) {
  return (
    <Link href={`characters/${id}`} passHref>
      <a>
        <Card
          sx={{
            m: 1,
            borderRadius: "0.2em",
            border: "2px solid #E53935",
            cursor: "pointer",
          }}
          elevation={2}
        >
          <CardHeader
            sx={{
              backgroundColor: "primary.main",
              color: "text.light",
            }}
            titleTypographyProps={{ variant: "caption" }}
            title={name}
          />
          <CardMedia component="img" height="250" image={image} alt={name} />
        </Card>
      </a>
    </Link>
  );
}
