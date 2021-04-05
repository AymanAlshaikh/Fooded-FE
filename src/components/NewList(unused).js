import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import RecipeItem from "./Recipe/RecipeItem";
import { useSelector } from "react-redux";
// import { ImageList } from "@material-ui/core";
// import ImageListItem from "@material-ui/core/ImageListItem";
// import ImageListItemBar from "@material-ui/core/ImageListItemBar";

export default function ImgList() {
  const [search, setSearch] = useState("");
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeList = recipes
    .filter((recipe) =>
      recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);
  return (
    <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
      {/* <ImageList variant="masonry" cols={3} gap={8}> */}
      {recipeList}
      {/* </ImageList> */}
    </Box>
  );
}
