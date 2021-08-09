import { useContext, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { storeContext } from "../../Contexts/StoreContext";
import Card from "../Card";

export default function ItemsSlider({ products }) {
  const { categories } = useContext(storeContext);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 6,
      slidesToSlide: 4, // optional, default to 1.
    },
    desktop2: {
      breakpoint: { max: 1200, min: 1000 },
      items: 5,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1000, min: 800 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet2: {
      breakpoint: { max: 800, min: 600 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return categories.map((category) => (
    <>
      {/* {categories.filter(() =>
        products.map((product) => product.category.name)
      )} */}

      <h2 style={{ color: "#fff", height: 20 }}>{category.name}</h2>
      <Carousel responsive={responsive}>
        {products
          .filter((product) => category.name === product.category.name)
          .map((product) => (
            <Card key={product.id} data={product} />
          ))}
      </Carousel>
    </>
  ));
}
