import { Link, Typography } from "@material-ui/core";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.youtube.com/watch?v=6rgqcPTm4UY&ab_channel=MemeMarket"
      >
        {" "}
        FoodED
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
