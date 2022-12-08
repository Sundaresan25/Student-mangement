import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Students = () => {
  const [studentInfo, setStudentInfo] = React.useState({});
  const navigate = useNavigate();
  function getstudentInfo() {
    axios
      .post("http://localhost:3000/api/getsingle", {
        userId: localStorage.getItem("student"),
      })
      .then((res) => {
        setStudentInfo(res.data.response);
      });
  }
  React.useEffect(() => {
    getstudentInfo();
  }, []);
  return (
    <>
      {localStorage.getItem("student") ? (
        <>
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
                    View Data
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
                        value={studentInfo?.name}
                        disabled
                        // onChange={onChangeHandler}
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
                        value={studentInfo?.email}
                        disabled
                        // onChange={onChangeHandler}
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
                        value={studentInfo?.gender}
                        disabled
                        // onChange={onChangeHandler}
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
                        value={studentInfo?.dob}
                        disabled
                        // onChange={onChangeHandler}
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
                        value={studentInfo?.rollno}
                        disabled
                        // onChange={onChangeHandler}
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
                        value={studentInfo?.class}
                        disabled
                        // onChange={onChangeHandler}
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
                        value={studentInfo?.marks}
                        disabled
                        // onChange={onChangeHandler}
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
                        value={studentInfo?.result}
                        disabled
                        // onChange={onChangeHandler}
                        required
                      />
                    </div>
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
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-center my-3">Student Dashboard</h4>
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            className="btn btn-primary text-center m-3"
          >
            View Data
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="btn btn-primary text-center m-3"
          >
            logout
          </button>
        </>
      ) : (
        <>
          <div className="text-center m-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate("/");
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
