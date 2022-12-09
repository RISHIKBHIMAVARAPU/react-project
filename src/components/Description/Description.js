import styles from "./Description.module.css";
import img1 from "./t1.jpg";
import modeContext from "../modeContext";
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Description() {
  const color = useContext(modeContext);
  const params = useParams();
  const id = params.pid;
  const uid = params.uid;
  const history = useHistory();
  const [userData, setuserdata] = useState([]);
  const [serviceData, setServiceData] = useState();
  const auth = useSelector(state => state.validauth1);
  useEffect(() => {
    axios
      .get("http://localhost:4000/services/" + id + "?_expand=user")
      .then((response) => {
        console.log(response.data);
        setServiceData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    func()
  }, []);

  async function func() {
    const res = await axios.get("http://localhost:4000/users/" + uid)
    console.log("lalith")
    console.log(res.data)
    setuserdata(res.data)
  }

  async function handleAddToWishlist(id) {
    await axios
      .post("http://localhost:4000/wishlist", { userId: uid, serviceId: id })
      .then((res) => {
        console.log(res.data);
      });
    history.push("/wishlist/" + uid);
  }

  return (
    auth === true ?
    <div className="tw-">
      {serviceData && (
        <div className={`${styles.descriptionDiv}`}>
          <div className={styles.serviceDiv}>
            <div className={styles.card}>
              <h1>{serviceData.title}</h1>
              <img src={img1} alt="John" className={styles.image} />
              {/* <p className={styles.title}>CEO & Founder, Example</p> */}
              <p></p>
              <p></p>
              <p>
                <button onClick={() => window.location = `mailto:${userData.email}`}
                // onClick={() => {
                //   history.push(`/service/${userId}/${data.id}`);
                // }}
                >
                  {/* <a href={`mailto:${userData.email}`}> */}
                  <Link
                    // to={`/service/${userId}/${data.id}`}
                    // to={`mailto:${userData.email}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    {" "}
                    <i class="fa fa-phone" aria-hidden="true"></i>{" "}
                  </Link>
                  {/* </a> */}
                </button>
                <button
                  onClick={() => {
                    handleAddToWishlist(serviceData.id);
                  }}
                >
                  <i class="fa fa-heart" aria-hidden="true"></i>
                </button>
              </p>
            </div>
          </div>

          <div className={styles.description}>
            <br></br>
            <h3>Description about the product</h3>
            <br></br>
            <h5 className={styles.rt}>{serviceData.description}</h5>
          </div>
          <div className={styles.aboutOwner}>
            <br></br>
            <h3>Product Pricing</h3>
            {/* <br></br> */}
            <h5 className={styles.rt}>
            Starting from {serviceData.price} Rs /- <br></br>
            <br></br>
            <b>* Prices may vary from the actual cost than that is posted online, please contact the seller for further information regarding the prices *.</b>
            </h5>
          </div>
        </div>
      )}
    </div> : <h2>404 Error Not Found</h2>
  );
}

export default Description;
