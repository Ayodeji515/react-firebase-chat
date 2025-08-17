import { useState } from "react";
import "./login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../../lib/firebase";
import Notification from "../notification/Notification";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();
  const [image, setImage] = useState("");
  // const [ProfileUrl, setProfileuRL] = useState("");
  // const [avatar, setAvatar] = useState({
  //   file: null,
  //   url: "",
  // });
  // const handleAvatar = (e) => {
  //   setImage(e.target.files[0]);
  //   if (e.target.files[0]) {
  //     setAvatar({
  //       file: e.target.files[0],
  //       url: URL.createObjectURL(e.target.files[0]),
  //     });
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            Notification("User Registered", "success");
            // navigate("/");
          } catch (err) {
            console.log(err);
            Notification(err.message, "success");
            setLoading(false);
          }
        });
      });
    } catch (err) {
      Notification(err.message, "success");
      setLoading(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      Notification("User Signed IN 😂😂😂", "success");
    } catch (err) {
      console.error(err);
      Notification("Error in sign In 😢😞 ", "error");
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={image || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          {/* <input required style={{ display: "none" }} type="file" id="file" /> */}
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;



