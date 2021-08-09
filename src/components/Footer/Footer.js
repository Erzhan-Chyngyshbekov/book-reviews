import React from "react";
import classes from "../Footer/footer.module.css";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_wrapper}>
        <div className={classes.footer_section}>
          <h3 style={{ color: "crimson" }}>Разделы</h3>

          <li>Романы</li>
          <li>Драмы</li>
          <li>Обзоры</li>
        </div>

        {/* </div> */}
        <div>
          <h3 style={{ color: "crimson" }}> О нас</h3>
          <Link to="/AboutUsPage">
            <li style={{ color: "white" }}>О компании</li>
          </Link>
          <Link to="/AddressPage">
            <li style={{ color: "white" }}>Адреса и контакты магазинов</li>
          </Link>

          <li>Партнеры</li>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Link className={classes.link} to="/AddressPage">
          <h3>Наш адрес: пр. Чуй 271</h3>
        </Link>
      </div>
    </footer>
  );
}
