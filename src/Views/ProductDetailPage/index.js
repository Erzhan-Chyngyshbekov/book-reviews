import React, { useContext, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import classes from "./productDetailPage.module.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import { storeContext } from "../../Contexts/StoreContext";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import { notifySuccess } from "../../helpers/notifiers";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import CreateIcon from "@material-ui/icons/Create";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import CommentInput from "../../components/Comments/CommentList";
import CommentList from "../../components/Comments/CommentInput";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export default function ProductDetailPage() {
  const {
    productDetail,
    fetchProductDetail,
    comments,
    likes,
    fetchComments,
    deleteProduct,
    addComment,
    deleteComment,
    fetchLikes,
    addLike,
  } = useContext(storeContext);

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
    fetchLikes(id);
  }, [id]);

  const handleProductDelete = () => {
    deleteProduct(id).then(() => {
      notifySuccess("Товар был успешно удален!");
      history.push("/");
    });
  };

  const handleLike = (productDetailId) => {
    addLike(productDetailId);
  };

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
            <p>
              <BookmarkBorderIcon className={classes.bookmark_icon} /> Favorite
            </p>
            <p onClick={handleProductDelete}>
              <DeleteSweepIcon className={classes.delete_icon} />
              Delete
            </p>
            <p onClick={() => history.push(`/products/${id}/update`)}>
              <CreateIcon /> Change
            </p>
            <p>
              <ThumbUpAltIcon onClick={() => handleLike(productDetail.id)} />
              {likes}
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
