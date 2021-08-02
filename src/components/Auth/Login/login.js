import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../ApiAuth";
import { useHistory } from "react-router-dom";
//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authContext } from "../../../Contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    height: "444px",
    borderRadius: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    color: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
}));

export default function Login() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const { users, login, fetchUsers } = useContext(authContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users.find((user) => user.email == formData.email)) {
    } else {
      alert("Неправильный логин или пароль!");
      return;
    }

    console.log(formData);
    login(formData.email, formData.password);
    history.push("/");
  };

  const classes = useStyles();

  return (
    <Container
      //   style={{ backgroundColor: "gray" }}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            style={{ backgroundColor: "white" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            style={{ backgroundColor: "white" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />

          {/* <Typography style={{ color: "red" }} component="p" variant="p">
            Неправильный логин или пароль!
          </Typography> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Восстановить пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Регистрация"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
