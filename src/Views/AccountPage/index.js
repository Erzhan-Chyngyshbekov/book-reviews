import React, { useContext, useEffect } from "react";
import ProductsList from "../../components/productsList";
import { authContext } from "../../Contexts/AuthContext";
import { storeContext } from "../../Contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

export default function AccountPage() {
  const { user } = useContext(authContext);

  const { products, favorites, fetchProducts, fetchFavorites } =
    useContext(storeContext);

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
  }, []);

  const filtredFavorites = favorites.map(
    (favorite) => Object.entries(favorite)[0][1]
  );

  const userFavorites = products.filter((product) => {
    return filtredFavorites.indexOf(product.id) !== -1;
  });

  return (
    <MainLayout>
      <h1 style={{ color: "#fff" }}>{user.email}</h1>
      {userFavorites.length ? (
        <>
          <h2 style={{ color: "#fff" }}>Favorites</h2>
          <ProductsList products={userFavorites} />
        </>
      ) : (
        <h2 style={{ color: "#fff" }}>No favorites</h2>
      )}
    </MainLayout>
  );
}
