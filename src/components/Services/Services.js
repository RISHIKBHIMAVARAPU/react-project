import styles from "./Services.module.css";
import pic1 from "./pic1.jpg";
import { Link, useHistory, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import modeContext from "../modeContext";
import axios from "axios";
import { setRef } from "@mui/material";

function Services({ data }) {
  const color = useContext(modeContext);
  const history = useHistory();
  const userId = useParams().uid;
  async function handleAddToWishlist(id) {
    await axios
      .post("http://localhost:4000/wishlist", { userId: userId, serviceId: id })
      .then((res) => {
        console.log(res.data);
      });
    history.push("/wishlist/" + userId);
  }

  return (
    // <div
    //   className={`${styles.serviceDiv} ${color ? styles.true : styles.false} `}
    // >
    //   {data.map((data) => (
    //     <div className={styles.service}>
    //       <div className={styles.imageSection}>
    //         <img className={styles.image} src={pic1} />
    //       </div>
    //       <div className={styles.description}>
    //         <div className={styles.header}>
    //           <div className={styles.title}>{data.title}</div>
    //         </div>
    //         <div className={styles.separator}></div>

    //         <div className={styles.body}>
    //           <div className={styles.subbody}>
    //             <img src={pic1} alt="" srcset="" className={styles.userImage} />
    //             <div className={styles.userName}>{data.user.userName}</div>
    //           </div>
    //         </div>

    //         <div className={styles.separator}></div>
    //         <div className={styles.price}>Starting from {data.price}\-</div>
    //         {/* <div className={styles.separator}></div> */}
    //         <div className={styles.footer}>
    //           <div>
    //             <Link to={`/service/${userId}/${data.id}`}> 🔎</Link>
    //           </div>
    //           <div>
    //             <Link
    //               onClick={() => {
    //                 handleAddToWishlist(data.id);
    //               }}
    //             >
    //               💜
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>

    <div className={styles.serviceDiv}>
      {data.map((data) => (
        <div className={styles.card}>
          <img src={pic1} alt="John" className={styles.image} />
          <h3>{data.title}</h3>
          {/* <p className={styles.title}>CEO & Founder, Example</p> */}
          <p>₹{data.price}</p>
          <p>{data.user.fullname}</p>
          <p>
            <button
              onClick={() => {
                history.push(`/service/${userId}/${data.id}`);
              }}
            >
              <Link
                to={`/service/${userId}/${data.id}`}
                style={{
                  textDecoration: "none",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                {" "}
                <i class="fa fa-search" aria-hidden="true"></i>{" "}
              </Link>
            </button>
            <button
              onClick={() => {
                handleAddToWishlist(data.id);
              }}
            >
              <i class="fa fa-heart" aria-hidden="true"></i>
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Services;