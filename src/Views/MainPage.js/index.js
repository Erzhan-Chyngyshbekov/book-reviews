import React, { useContext, useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import HeroSlider from "../../components/HeroSlider";
import ItemsSlider from "../../components/ItemsSlider";
import { storeContext } from "../../Contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

export default function MainPage() {
  const { products, fetchProducts, fetchCategories } = useContext(storeContext);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      {/* <HeroSlider /> */}
      {/* <Hero /> */}
      <ItemsSlider products={products} />\
    </MainLayout>
  );
}
