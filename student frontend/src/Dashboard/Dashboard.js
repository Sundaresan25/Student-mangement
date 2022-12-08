import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [students, setStudents] = React.useState([]);
  const [studentData, setStudentData] = React.useState({});
  const [adminpassword, setAdminpassword] = React.useState({
    newpassword: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const [changepassword, setChangepassword] = React.useState(false);

  const [error, setError] = React.useState(null);

  function getStudents() {
    axios.get("http://localhost:3000/api/getusers").then((res) => {
      setStudents(res.data.response);
    });
  }

  React.useEffect(() => {
    getStudents();
  }, []);

  React.useEffect(() => {}, []);

  const onChangeHandler = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setStudentData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val,
      };
    });
  };

  const passwordHandler = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setAdminpassword((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val,
      };
    });
  };

  function saveHandler() {
    if (
      studentData.class === "" ||
      studentData.dob === "" ||
      studentData.gender === "" ||
      studentData.marks === "" ||
      studentData.name === "" ||
      studentData.password === "" ||
      studentData.result === "" ||
      studentData.rollno === "" ||
      studentData.studentemail === ""
    ) {
      setError("Fill All the fields");
    } else {
      if (studentData._id) {
        const data = {
          ...studentData,
          userId: studentData._id,
          password: studentData.dob,
        };
        axios.put("http://localhost:3000/api/updateuser", data).then((res) => {
          if (res?.data?.error) {
            setError(res?.data?.error);
          } else {
            setError("");
            alert("successfully  student Updated");
            getStudents();
          }
        });
      } else {
        const data = {
          ...studentData,
          password: studentData.dob,
        };
        axios.post("http://localhost:3000/api/adduser", data).then((res) => {
          if (res?.data?.error) {
            setError(res?.data?.error);
          } else {
            setError("");
            alert("successfully  student added");
            getStudents();
            setStudentData({
              class: "",
              dob: "",
              gender: "",
              marks: "",
              name: "",
              password: "",
              result: "",
              rollno: "",
              studentemail: "",
            });
          }
        });
      }
    }
  }
  function resetHandler() {
    if (
      adminpassword.newpassword === "" ||
      adminpassword.confirmpassword === ""
    ) {
      setError("Please type all");
    } else if (adminpassword.newpassword !== adminpassword.confirmpassword) {
      setError("password doesnot match");
    } else {
      axios
        .put("http://localhost:3000/api/adminupdate", {
          password: adminpassword.confirmpassword,
          userId: localStorage.getItem("admin"),
        })
        .then((res) => {
          if (res?.data?.error) {
            console.log(res.data.error);
          } else {
            alert("successfully  password updated");
            setChangepassword(false);
          }
        });
    }
  }

  function deleteHandler(data) {
    axios
      .post("http://localhost:3000/api/deletestudent", {
        userId: data,
      })
      .then((res) => {
        if (res?.data?.error) {
          setError(res?.data?.error);
        } else {
          setError("");
          alert("successfully  Deleted");
          getStudents();
        }
      });
  }
  return (
    <>
      {localStorage.getItem("admin") ? (
        <>
          {" "}
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add student
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form class="form-group row">
                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-4 col-form-label"
                      >
                        Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        name="name"
                        placeholder="name"
                        value={studentData?.name}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>

                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-4 col-form-label"
                      >
                        Student email
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        name="studentemail"
                        placeholder="email"
                        value={studentData?.studentemail}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-4 col-form-label"
                      >
                        gender
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        name="gender"
                        placeholder="gender"
                        value={studentData?.gender}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-4 col-form-label"
                      >
                        Dob
                      </label>

                      <input
                        type="date"
                        class="form-control"
                        id="inputPassword"
                        name="dob"
                        placeholder=""
                        value={studentData?.dob}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-4 col-form-label"
                      >
                        Roll no
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        name="rollno"
                        placeholder="rollno"
                        value={studentData?.rollno}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-4 col-form-label"
                      >
                        class
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        name="class"
                        placeholder="class"
                        value={studentData?.class}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-12 col-form-label"
                      >
                        Marks
                      </label>

                      <input
                        type="number"
                        class="form-control"
                        id="inputPassword"
                        name="marks"
                        placeholder="Marks"
                        value={studentData?.marks}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div class="col-sm-12">
                      <label
                        for="inputPassword"
                        class="col-sm-12 col-form-label"
                      >
                        Result
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        name="result"
                        placeholder="result"
                        value={studentData?.result}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    {error && <p>{error}</p>}
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={() => saveHandler()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-center my-3">Admin Dashboard</h4>
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            className="btn btn-primary text-center m-3"
          >
            Add student
          </button>
          <button
            className="btn btn-primary text-center m-3"
            onClick={() => setChangepassword(!changepassword)}
          >
            Reset Password
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/adminlogin");
            }}
            className="btn btn-primary text-center m-3"
          >
            logout
          </button>
          {changepassword && (
            <div>
              <div class="col-sm-12">
                <label for="inputPassword" class="col-sm-4 col-form-label">
                  New password
                </label>

                <input
                  type="text"
                  class="form-control"
                  id="inputPassword"
                  name="newpassword"
                  placeholder="newpassword"
                  value={adminpassword?.inputPassword}
                  onChange={passwordHandler}
                  required
                />
              </div>

              <div class="col-sm-12">
                <label for="inputPassword" class="col-sm-4 col-form-label">
                  Confirm password
                </label>

                <input
                  type="text"
                  class="form-control"
                  id="inputPassword"
                  name="confirmpassword"
                  placeholder="confirmpassword"
                  value={adminpassword?.confirmpassword}
                  onChange={passwordHandler}
                  required
                />
              </div>
              {error && <p>{error}</p>}

              <button className="btn mx-2 py-3" onClick={resetHandler}>
                {" "}
                save
              </button>
            </div>
          )}
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Roll no</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((data, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{data?.name}</td>
                    <td>{data?.rollno}</td>
                    <td>
                      <small
                        className="mx-2 btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => {
                          setStudentData(
                            students.find((x) => x._id === data._id)
                          );
                        }}
                      >
                        Edit
                      </small>
                      <small
                        className="mx-2 btn btn-primary"
                        onClick={() => deleteHandler(data?._id)}
                      >
                        Delete
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="text-center m-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate("/adminlogin");
              }}
            >
              Please Login{" "}
            </button>
          </div>
        </>
      )}
    </>
  );
};
