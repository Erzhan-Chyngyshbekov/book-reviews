// import React from "react";
// import { useParams } from "react-router";
// import MainLayout from "../../Layouts/MainLayout";

// export default function CategoryPage() {
//   const { id } = useParams();

//   return <MainLayout></MainLayout>;
// }
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import HeroSlider from '../../components/HeroSlider';
import Loader from '../../components/Loader';
import ProductsList from '../../components/ProductsList';
import { storeContext } from '../../contexts/StoreContext';
import MainLayout from '../../Layouts/MainLayout';

export default function CategoryPage() {
  const { id } = useParams();
  const { products, fetchBrandProducts, fetchBrandDetail, brandDetail } =
    useContext(storeContext);

  useEffect(() => {
    fetchCategory(id);
    fetchCategoryDetail(id);
  }, [id]);

  return (
    <MainLayout>
      {products.length && brandDetail ? (
        <>
          {/* <HeroSlider
            slider={brandDetail.sliderImages.map((src) => ({
              title: `${brandDetail.title} hero slider`,
              src,
            }))}
          /> */}
          <ProductsList products={products} />
        </>
      ) : (
        <Loader />
      )}
    </MainLayout>
  );
}
