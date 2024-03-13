/* eslint-disable react/no-unescaped-entities */
import styles from "../styles/page404.module.css"; // Import CSS module
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className={styles.page_404}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className={styles.four_zero_four_bg}>
                <h1 className="text-center ">404</h1>
              </div>
              <div className={styles.contant_box_404}>
                <h3 className="h2">Look like you're lost</h3>
                <p>the page you are looking for not available!</p>
                <Link to="/" className={styles.link_404}>
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
