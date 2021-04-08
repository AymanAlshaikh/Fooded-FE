import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../../store/actions/cuisineActions";

import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { DeleteForeverOutlined, Edit } from "@material-ui/icons";

const CuisineItem = ({ cuisine }) => {
  const dispatch = useDispatch();
  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  let chef = null;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }

  const cuisineSlug = cuisine.slug;
  return (
    <div>
      <Link to={`/cuisine/${cuisineSlug}`}>
        <GridListTile key={cuisine.image}>
          <img
            src={cuisine.image}
            alt={cuisine.name}
            style={{ height: 500, width: 500 }}
          />
          <GridListTileBar
            title={cuisine.name}
            // subtitle={<span> {cuisine.description}</span>}
            // actionIcon={
            //   <div>
            //     <Link to={`/cuisines/${cuisineSlug}/edit`}>
            //       <IconButton>
            //         <Edit />
            //       </IconButton>
            //     </Link>

            //     <IconButton
            //       onClick={() => dispatch(deleteRecipe(cuisine.id, chef))}
            //     >
            //       <DeleteForeverOutlined />
            //     </IconButton>
            //   </div>
            // }
          />
        </GridListTile>
      </Link>
    </div>
  );
};
export default CuisineItem;
