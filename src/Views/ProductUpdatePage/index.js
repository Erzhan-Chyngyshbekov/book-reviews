import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@material-ui/core";
import classes from "./productUpdate.module.css";
import TextError from "../../components/TextError";
import { notifySuccess } from "../../helpers/notifiers";
import { useHistory, useParams } from "react-router";
import { storeContext } from "../../Contexts/StoreContext";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ProductUpdatePage() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    book_author: "",
    preview: "",
    review: "",
    category: "",
    image: "",
  });

  const { categories, fetchProductDetail, productDetail, updateProduct } =
    useContext(storeContext);

  const { id } = useParams();

  const options = categories.map((category) => category);
  console.log(options);

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    fetchProductDetail(id);
  }, []);

  useEffect(() => {
    if (productDetail) {
      setInitialValues({
        ...productDetail,
      });
    }
  }, [productDetail]);

  const history = useHistory();

  const validationSchema = Yup.object({
    title: Yup.string().required("Обязательное поле!"),
    book_author: Yup.string().required("Обязательное поле!"),
    preview: Yup.string().required("Обязательное поле!"),
    review: Yup.string().required("Обязательное поле!"),
    category: Yup.string().required("Обязательное поле!"),
    image: Yup.string().required("Обязательное поле!"),
  });

  const onSubmit = (values) => {
    updateProduct(id, {
      ...values,
    }).then(() => {
      notifySuccess("Продукт был изменен!");
      history.push(`/products/${id}`);
    });
  };

  return (
    <MainLayout>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({}) => (
            <Form className={classes.form}>
              <Typography variant="h4">Изменение продукта</Typography>
              <label>Title</label>
              <Field
                className={classes.input}
                name="title"
                variant="outlined"
                as={TextField}
              />

              <ErrorMessage component={TextError} name="title" />

              <label>Book Author</label>
              <Field
                className={classes.input}
                name="book_author"
                variant="outlined"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="book_author" />

              <label>Preview</label>
              <Field
                className={classes.input}
                name="preview"
                variant="outlined"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="preview" />

              <label>Review</label>
              <Field
                variant="outlined"
                className={classes.input}
                rows={8}
                multiline
                name="review"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="review" />

              <label>Category</label>
              <div className={classes.category}>
                {/* <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
                <div>{`inputValue: '${inputValue}'`}</div>
                <br /> */}
                <Autocomplete
                  className={classes.autocomplete}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options.map((category) => category.name)}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <Field
                      {...params}
                      name="category"
                      as={TextField}
                      // label="Controllable"
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <ErrorMessage component={TextError} name="category" />

              <label>Изображение</label>
              <Field
                className={classes.input}
                name="image"
                variant="outlined"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="image" />

              <Button type="submit" color="secondary" variant="contained">
                Изменить
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}