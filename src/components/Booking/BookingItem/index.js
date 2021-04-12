import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteRecipe,
  fetchRecipes,
} from "../../../store/actions/recipeActions";
import { useStyles } from "./styles";

import {
  Divider,
  GridListTile,
  GridListTileBar,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  DeleteForeverOutlined,
  Edit,
  Email,
  PersonPin,
  Phone,
} from "@material-ui/icons";

export default function BookingItem({ user }) {
  const classes = useStyles();

  return (
    <div>
      <Divider />
      <PersonPin /> {`${user.firstName} ${user.lastName}`}
      <Typography>
        {" "}
        <Phone />
        {`${user.phoneNumber}`}
      </Typography>
      <Typography>
        <Email /> {`${user.email}`}
      </Typography>
    </div>
  );
}
