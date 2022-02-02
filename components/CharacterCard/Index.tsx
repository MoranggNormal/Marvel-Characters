import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

type character = {
  image: string;
  name: string;
  description: string;
};

export default function CharacterCard({ image, name}: character) {
  return (
    <Card
      sx={{
        m: 1,
        borderRadius: "0.2em",
      }}
      elevation={2}
    >
      <CardHeader
        sx={{
          backgroundColor: "primary.med",
          color: "primary.main",
          cursor: "default",
        }}
        title={name}
      />
      <CardMedia component="img" height="194" image={image} alt={name} />
      <CardContent>
        <Link href="/" passHref>
          <Typography component="a" variant="body2" color="text.link">
            More info about {name} →
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}
