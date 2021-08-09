import { AddComment, IndeterminateCheckBox } from "@material-ui/icons";
import axios from "axios";
import React, { useReducer } from "react";
import axiosInstance from "../ApiAuth";

const INIT_STATE = {
  products: [],
  categories: [],
  productDetail: null,
  // categoryDetail: null,
  comments: [],
  allLikes: [],
  likes: 0,
  favorites: [],
  productDetailRating: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "SET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "CLEAR_PRODUCT":
      return {
        ...state,
        productDetail: null,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    case "SET_ALL_LIKES":
      return {
        ...state,
        allLikes: action.payload,
      };
    case "SET_LIKES":
      return {
        ...state,
        likes: action.payload,
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "SET_RATING":
      return {
        ...state,
        productDetailRating: action.payload,
      };
    // case "SET_CATEGORY_DETAIL":
    //   return {
    //     ...state,
    //     categoryDetail: action.payload,
    //   };
    default:
      return state;
  }
};

export const storeContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

// const localURL = "http://localhost:8000";

// axios.interceptors.request.use((config) => {
//   config.headers.Authorization = `JWT ${localStorage.getItem("access_token")}`;
//   return config;
// });

export default function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchProducts = async () => {
    const response = await axios.get(`${URL}/api/v1/reviews/`);
    const products = response.data.results;

    dispatch({
      type: "SET_PRODUCTS",
      payload: products,
    });
  };

  const fetchProductDetail = async (id) => {
    const response = await axios.get(`${URL}/api/v1/review/${id}`);
    const productDetail = response.data;

    dispatch({
      type: "SET_PRODUCT_DETAIL",
      payload: productDetail,
    });
  };

  const fetchCategories = async () => {
    const response = await axios.get(`${URL}/api/v1/categories/list/`);
    const categories = response.data;

    dispatch({
      type: "SET_CATEGORIES",
      payload: categories,
    });
  };

  const fetchComments = async (id) => {
    const response = await axios.get(`${URL}/api/v1/review/${id}`);
    const comments = response.data.comments;
    // console.log(comments);

    dispatch({
      type: "SET_COMMENTS",
      payload: comments,
    });
  };

  const createProduct = async (product) => {
    console.log(product);
    const response = await axiosInstance.post(
      `${URL}/api/v1/reviews/`,
      product
    );
    // const response = await axios.post(`${localURL}/products`, product);
    const createProduct = response.data;

    dispatch({
      type: "ADD_PRODUCT",
      payload: createProduct,
    });

    return createProduct.id;
  };

  const deleteProduct = async (id) => {
    // await axios.delete(`${localURL}/products/${id}`);
    await axiosInstance.delete(`${URL}/api/v1/review/${id}/`);
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
  };

  const updateProduct = async (id, formData) => {
    // await axios.patch(`${localURL}/products/${id},` data);
    await axiosInstance.patch(`${URL}/api/v1/review/${id}/`, formData);

    dispatch({
      type: "CLEAR_PRODUCT",
    });
  };

  const addComment = async (reviewId, body, owner) => {
    // const user = localStorage.getItem("account");
    // if (owner !== user) {
    //   return;
    // }
    const response = await axiosInstance.post(`${URL}/api/v1/comments/`, {
      body: body,
      review: reviewId,
    });
    const comment = response.data;
    console.log(comment);

    dispatch({
      type: "ADD_COMMENT",
      payload: comment,
    });
  };

  const deleteComment = async (id, owner) => {
    console.log(id);
    const user = localStorage.getItem("user");
    if (owner !== user) {
      return;
    }
    await axiosInstance.delete(`${URL}/api/v1/comments/${id}`);
    dispatch({
      type: "DELETE_COMMENT",
      payload: id,
    });
  };

  const fetchAllLikes = async () => {
    const response = await axiosInstance.get(`${URL}/api/v1/like/`);
    const allLikes = response.data;
    console.log(allLikes);

    dispatch({
      type: "SET_ALL_LIKES",
      payload: allLikes,
    });
  };

  const fetchLikes = async (id) => {
    const response = await axiosInstance.get(`${URL}/api/v1/review/${id}`);
    const likes = response.data.like;
    // console.log(likes);

    dispatch({
      type: "SET_LIKES",
      payload: likes,
    });
  };

  const addLike = async (bookId) => {
    await axiosInstance.post(`${URL}/api/v1/like/create/`, {
      book: bookId,
      like: true,
    });

    const response = await axiosInstance.get(`${URL}/api/v1/review/${bookId}`);
    const likes = response.data.like;

    dispatch({
      type: "SET_LIKES",
      payload: likes,
    });

    const allLikesResponse = await axiosInstance.get(`${URL}/api/v1/like/`);
    const allLikes = allLikesResponse.data;
    console.log(allLikes);

    dispatch({
      type: "SET_ALL_LIKES",
      payload: allLikes,
    });
  };

  const removeLike = async (id) => {
    await axiosInstance.delete(`${URL}/api/v1/like/${id}/delete/`);

    const allLikesResponse = await axiosInstance.get(`${URL}/api/v1/like/`);
    const allLikes = allLikesResponse.data;
    console.log(allLikes);

    dispatch({
      type: "SET_ALL_LIKES",
      payload: allLikes,
    });
  };

  const fetchRating = async (id) => {
    const response = await axios.get(`${URL}/api/v1/review/${id}`);
    const productDetailRating = response.data.mark.mark__avg;
    // console.log(productDetailRating);

    dispatch({
      type: "SET_RATING",
      payload: productDetailRating,
    });
  };

  const addRating = async (id, rating) => {
    const ratingResponse = await axiosInstance.post(
      `${URL}/api/v1/rating/create/`,
      {
        book: id,
        mark: rating,
      }
    );
    console.log(ratingResponse.data);

    const response = await axios.get(`${URL}/api/v1/review/${id}`);
    const productDetailRating = response.data.mark.mark__avg;
    // console.log(productDetailRating);

    dispatch({
      type: "SET_RATING",
      payload: productDetailRating,
    });
  };

  const fetchFavorites = async () => {
    const response = await axiosInstance.get(`${URL}/api/v1/favorite/list/`);
    const favorites = response.data;
    // console.log(favorites);

    dispatch({
      type: "SET_FAVORITES",
      payload: favorites,
    });
  };

  const addFavorite = async (id) => {
    const favoriteResponse = await axiosInstance.post(
      `${URL}/api/v1/favorite/create/`,
      {
        review: id,
        favorites: true,
      }
    );
    console.log(favoriteResponse.data);

    const response = await axiosInstance.get(`${URL}/api/v1/favorite/list/`);
    const favorites = response.data;
    console.log(favorites);

    dispatch({
      type: "SET_FAVORITES",
      payload: favorites,
    });
  };

  const removeFavorite = async (id) => {
    await axiosInstance.delete(`${URL}/api/v1/favorite/${id}/delete/`);

    const response = await axiosInstance.get(`${URL}/api/v1/favorite/list/`);
    const favorites = response.data;
    console.log(favorites);

    dispatch({
      type: "SET_FAVORITES",
      payload: favorites,
    });
  };

  return (
    <storeContext.Provider
      value={{
        products: state.products,
        categories: state.categories,
        productDetail: state.productDetail,
        comments: state.comments,
        likes: state.likes,
        allLikes: state.allLikes,
        favorites: state.favorites,
        productDetailRating: state.productDetailRating,
        fetchProducts,
        fetchProductDetail,
        fetchCategories,
        fetchComments,
        createProduct,
        deleteProduct,
        updateProduct,
        addComment,
        deleteComment,
        fetchAllLikes,
        fetchLikes,
        addLike,
        removeLike,
        fetchRating,
        addRating,
        fetchFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
}
