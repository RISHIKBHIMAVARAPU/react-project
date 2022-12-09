import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import modeContext from "../modeContext";
import uniqid from "uniqid";
import { style } from "@mui/system";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

function Navbar() {
  const color = useContext(modeContext);
  const auth = useSelector(state => state.validauth1);
  const path = useLocation().pathname;
  const params = useParams();
  const uid = params.uid;
  const dispatch = useDispatch()
  // const uid = 1;
  const [userName, setUserName] = useState();

  useEffect(() => {
    console.log("bargav")
    const obj = localStorage.getItem('author')
    if(obj)
    {
      console.log("if")
      console.log(obj)
      if(obj === "\"user\"")
      {
        console.log("hello in if")
        dispatch({
          type : "setTrue1"
        })
      } 
      else
      {
        dispatch({
          type : "setFalse1"
        })
      }
    }
    axios
      .get("http://localhost:4000/users/" + uid)
      .then((response) => {
        setUserName(response.data.fullname);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    auth === true ?
    <div>
      {userName && (
        <div>
          <div className={styles.topnav} id="myTopnav">
            <Link
              to={`/home/${uid}`}
              className={path.includes("/home") ? styles.active : "inactive"}
            >
              Home
            </Link>
            <Link
              to={`/wishlist/${uid}`}
              className={
                path.includes("/wishlist") ? styles.active : "inactive"
              }
            >
              Wishlist
            </Link>
            <Link
              to={`/post/${uid}`}
              className={path.includes("/post") ? styles.active : "inactive"}
            >
              Post
            </Link>
            <Link
              to={`/profile/${uid}`}
              className={path.includes("/profile") ? styles.active : "inactive"}
            >
              Profile
            </Link>
            <Link to='/' onClick={() => {
              dispatch({
                type : "setFalse1"
              })
              localStorage.removeItem('author')
            }}>LogOut</Link>
          </div>
        </div>
      )}
    </div> : <h2></h2>
  );
}
export default Navbar;
