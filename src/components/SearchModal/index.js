import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import classes from "./searchModal.module.css";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import { storeContext } from "../../Contexts/StoreContext";
import Card from "../Card";
import ProductsList from "../productsList";
import { useHistory } from "react-router";

export default function SearchModal() {
  const { products } = useContext(storeContext);

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = useState(null);

  const history = useHistory();

  const filteredProducts = products.filter((product) => {
    // return product.name.toLowerCase().includes(value.toLowerCase());
    return product.title.includes(value);
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen} className={classes.top__search}>
        <SearchIcon style={{ margin: "auto" }} />
        <Typography style={{ margin: "auto 0px" }} variant="p">
          Поиск
        </Typography>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            <h1>Поиск</h1>
            <input
              onChange={(e) => setValue(e.target.value)}
              placeholder="Авторы, персонажи, жанры"
            />
            <div className={classes.results}>
              {filteredProducts.map((product) => (
                <div
                  className={classes.result}
                  onClick={() => history.push(`/products/${product.id}`)}
                >
                  <h3>{product.title}</h3>
                  <p>{product.category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
