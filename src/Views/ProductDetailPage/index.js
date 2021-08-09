import React, { useContext, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import classes from "./productDetailPage.module.css";

import { storeContext } from "../../Contexts/StoreContext";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import { notifySuccess } from "../../helpers/notifiers";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import CreateIcon from "@material-ui/icons/Create";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import CommentInput from "../../components/Comments/CommentList";
import CommentList from "../../components/Comments/CommentInput";
import Grid from "@material-ui/core/Grid";
import { authContext } from "../../Contexts/AuthContext";
import { FavoriteSharp } from "@material-ui/icons";

export default function ProductDetailPage() {
  const {
    productDetail,
    fetchProductDetail,
    comments,
    likes,
    allLikes,
    favorites,
    productDetailRating,
    fetchComments,
    deleteProduct,
    addComment,
    deleteComment,
    fetchAllLikes,
    fetchLikes,
    addLike,
    removeLike,
    addRating,
    fetchRating,
    fetchFavorites,
    addFavorite,
    removeFavorite,
  } = useContext(storeContext);

  const { user } = useContext(authContext);

  const [title, setTitle] = useState("");

  const handleCommentAdd = (e) => {
    e.preventDefault();
    addComment(productDetail.id, title, productDetail.owner);
    setTitle("");
  };

  const handleDelete = (commentId, owner) => {
    deleteComment(commentId, owner);
  };

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchProductDetail(id);
    fetchComments(id);
    fetchAllLikes();
    fetchLikes(id);
    fetchFavorites();
    fetchRating(id);
  }, [id]);

  const handleProductDelete = () => {
    deleteProduct(id).then(() => {
      notifySuccess("Товар был успешно удален!");
      history.push("/");
    });
  };

  const handleFavorite = (productDetailId) => {
    addFavorite(productDetailId);
  };

  const handleFavoriteDelete = (productDetailId) => {
    removeFavorite(productDetailId);
  };

  const handleLike = (productDetailId) => {
    addLike(productDetailId);
  };

  const handleLikeDelete = (productDetailId) => {
    removeLike(productDetailId);
  };

  const handleRating = (productDetailId, rating) => {
    addRating(productDetailId, rating);
  };

  const favoritesIds = favorites.map(
    (favorite) => Object.entries(favorite)[0][1]
  );

  // const likesIds = allLikes.map((like) => Object.entries(like)[0][1]);
  // const likeOwners = allLikes.map((like) => Object.entries(like)[2][1]);
  // // console.log(likesIds);
  // const combine = likesIds.map((e, i) => [e, likeOwners[i]]);
  // // console.log(combine);

  // const arrOfBooleans = combine.map(
  //   (i) => i.includes(productDetail.id) && i.includes(user.email)
  // );
  // console.log(arrOfBooleans);

  // console.log(
  //   allLikes
  //     .map((like) => Object.entries(like)[0][1])
  //     .map((elem, index) => [
  //       elem,
  //       allLikes.map((like) => Object.entries(like)[2][1])[index],
  //     ])
  //     .map((i) => i.includes(user.email) && i.includes(productDetail.id))
  // );

  return (
    <MainLayout>
      {productDetail ? (
        <>
          <div className={classes.book_review}>
            <img src={productDetail.image} />
            <div className={classes.book_rating_module}>
              <h2>{productDetail.preview}</h2>
              <div className={classes.ratings}>
                <p>READER VOTES</p>
              </div>
            </div>
          </div>
          <div className={classes.actions}>
            {favoritesIds.includes(productDetail.id) ? (
              <p onClick={() => handleFavoriteDelete(productDetail.id)}>
                <BookmarkIcon />
                Saved
              </p>
            ) : (
              <p onClick={() => handleFavorite(productDetail.id)}>
                <BookmarkBorderIcon className={classes.bookmark_icon} />
                Favorite
              </p>
            )}

            <p onClick={handleProductDelete}>
              <DeleteSweepIcon className={classes.delete_icon} />
              Delete
            </p>

            <p onClick={() => history.push(`/products/${id}/update`)}>
              <CreateIcon className={classes.icon} /> Change
            </p>

            {allLikes
              .map((like) => Object.entries(like)[0][1])
              .map((elem, index) => [
                elem,
                allLikes.map((like) => Object.entries(like)[2][1])[index],
              ])
              .map(
                (i) => i.includes(user.email) && i.includes(productDetail.id)
              )
              .includes(true) ? (
              <p>
                <ThumbUpAltIcon
                  className={classes.liked_icon}
                  onClick={() => handleLikeDelete(productDetail.id)}
                />
                {likes} likes
              </p>
            ) : (
              <p>
                <ThumbUpAltIcon
                  className={classes.icon}
                  onClick={() => handleLike(productDetail.id)}
                />
                {likes} likes
              </p>
            )}

            <p>
              <Box
                style={{ color: "#fff" }}
                component="fieldset"
                borderColor="transparent"
              >
                <Rating
                  className={classes.rating_icon}
                  name="simple-controlled"
                  value={0}
                  onChange={(_, num) => handleRating(productDetail.id, num)}
                />
              </Box>
              {productDetailRating == null
                ? "no rating"
                : `${productDetailRating} rating`}
            </p>
          </div>
          <div className={classes.book_description}>
            <h3>Owner: {productDetail.owner}</h3>
            <h2>{productDetail.title}</h2>
            <h3>by {productDetail.book_author}</h3>
            <p>{productDetail.review}</p>
          </div>

          <form onSubmit={handleCommentAdd} className={classes.comments}>
            <div>
              {comments.map((comment) => (
                <div className={classes.comment} key={comment.id}>
                  <p>{comment.body}</p>
                  <p>{comment.owner}</p>
                  <HighlightOffIcon
                    onClick={() => handleDelete(comment.id, comment.owner)}
                  />
                </div>
              ))}
            </div>
            <input
              name="comment"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              value={title}
              // value={title}
            />
            <button>create</button>
          </form>
        </>
      ) : (
        ""
      )}
    </MainLayout>
  );
}
