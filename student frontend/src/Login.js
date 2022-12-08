import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [userCred, setUserCred] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showpassword, setShowpassword] = useState(false);

  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setloading(true);
    if (userCred.username === "") {
      setError("Enter username");
      setloading(false);
    } else if (userCred.password === "") {
      setError("Enter Password");
      setloading(false);
    } else {
      axios
        .post("http://localhost:3000/api/adminlogin", {
          username: userCred.username,
          password: userCred.password,
        })
        .then((res) => {
          if (res?.data?.error) {
            setError(res?.data?.error);
          } else {
            setError("");
            localStorage.setItem("admin", res.data.userId);
            localStorage.setItem("role", res.data.role);
            navigate("/admin");
          }
        });
    }
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setUserCred((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val,
      };
    });
  };
  return (
    <>
      {loading && <>{/* <Loader /> */}</>}
      <div
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
        className="  "
        // style={{ height: "100vh" }}
      >
        <div
          className=" d-flex  align-items-center justify-content-center p-2 "
          style={{ height: "90vh" }}
        >
          <div class="col-md-6 modal-content shadow">
            <div class="modal-header">
              <h4 class="modal-title">Welcome Admin!</h4>
            </div>
            <div class="modal-body">
              <form action="/examples/actions/confirmation.php" method="post">
                <div class="form-group">
                  <input
                    type="text"
                    className={clsx("form-control")}
                    name="username"
                    placeholder=" Enter username"
                    required="required"
                    value={userCred.username}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <input
                    type={showpassword ? "text" : "password"}
                    className={clsx("form-control")}
                    name="password"
                    placeholder="Enter Password"
                    required="required"
                    value={userCred.password}
                    id="exampleInputPassword1"
                    onChange={onChangeHandler}
                  />
                </div>
                <input
                  type="checkbox"
                  defaultChecked={showpassword}
                  onChange={() => setShowpassword(!showpassword)}
                />
                <small>show password</small>

                {error && (
                  <small
                    style={{ color: "red" }}
                    className=" text-right d-block "
                  >
                    {error}
                  </small>
                )}
                <div class="form-group text-center">
                  <button
                    onClick={handleLogin}
                    type="submit"
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 3px 6px #00000036",
                    }}
                    class="btn mt-3 px-5  bg-primary "
                  >
                    login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
