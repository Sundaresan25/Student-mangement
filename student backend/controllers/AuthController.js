const Students = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      let user = new Students({
        name: req.body.name,
        studentemail: req.body.studentemail,
        gender: req.body.gender,
        rollno: req.body.rollno,
        class: req.body.class,
        result: req.body.result,
        dob: req.body.dob,
        marks: req.body.marks,
        password: hashedPass,
      });

      user
        .save()
        .then((result) => {
          res.json({
            message: "user Added Successfully",
          });
        })
        .catch((error) => {
          res.json({
            error: error.message,
            // message: "An error occured!",
          });
        });
    }
  });
};

const adminregister = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      let admin = new Admin({
        name: req.body.name,
        schoolname: req.body.schoolname,
        email: req.body.email,
        password: hashedPass,
      });

      admin
        .save()
        .then((result) => {
          res.json({
            message: "Admin added Successfully",
          });
        })
        .catch((error) => {
          res.json({
            message: error.message,
            // message: "An error occured!",
          });
        });
    }
  });
};

const adminlogin = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  Admin.findOne({ $or: [{ email: username }, { schoolname: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "secretValue", {
              expiresIn: "2h",
            });
            let refreshtoken = jwt.sign(
              { name: user.name },
              "secretrefreshValue",
              {
                expiresIn: "2h",
              }
            );
            res.json({
              mesage: "login Successful",
              token,
              refreshtoken,
              userId: user.id,
              role: "Admin",
            });
          } else {
            res.json({
              error: "Password does not matched!",
              user: user.password,
            });
          }
        });
      } else {
        res.json({
          error: "no User Found",
        });
      }
    }
  );
};

const updateAdmin = (req, res, next) => {
  let userId = req.body.userId;

  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    let updatedData = {
      password: hashedPass,
    };
    Admin.findByIdAndUpdate(userId, { $set: updatedData })
      .then(() => {
        res.json({
          message: "Admin Password updated successfuly!",
        });
      })
      .catch((error) => {
        res.json({
          message: "An error Occured!",
        });
      });
  });
};
const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  Students.findOne({ $or: [{ email: username }, { rollno: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "secretValue", {
              expiresIn: "2h",
            });
            let refreshtoken = jwt.sign(
              { name: user.name },
              "secretrefreshValue",
              {
                expiresIn: "2h",
              }
            );
            res.json({
              mesage: "login Successful",
              token,
              refreshtoken,
              userId: user.id,
              role: "student",
            });
          } else {
            res.json({
              error: "Password does not matched!",
            });
          }
        });
      } else {
        res.json({
          error: "no User Found",
        });
      }
    }
  );
};

// upadate an user
const updateuser = (req, res, next) => {
  let userId = req.body.userId;

  let updatedData = {
    name: req.body.name,
    studentemail: req.body.studentemail,
    gender: req.body.gender,
    rollno: req.body.rollno,
    class: req.body.class,
    result: req.body.result,
    marks: req.body.marks,
    dob: req.body.dob,
  };

  Students.findByIdAndUpdate(userId, { $set: updatedData })
    .then(() => {
      res.json({
        message: "user updated successfuly!",
      });
    })
    .catch((error) => {
      res.json({
        error: "An error Occured!",
      });
    });
};

// delete a student
const deleteuser = (req, res, next) => {
  let userId = req.body.userId;

  Students.findByIdAndRemove(userId)
    .then(() => {
      res.json({
        message: "Employee deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        error: "An error Occured!",
      });
    });
};

const index = (req, res, next) => {
  Students.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

// Show single employee
const show = (req, res, next) => {
  let userId = req.body.userId;
  Students.findById(userId)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, "secretrefreshValue", function (err, decode) {
    if (err) {
      res.status(400).json({
        err,
        c,
      });
    } else {
      let token = jwt.sign({ name: jwt.decode.name }, "secretValue", {
        expiresIn: "2h",
      });
      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        mesage: "Token refreshed successfully!",
        token,
        refreshToken,
      });
    }
  });
};

module.exports = {
  register,
  login,
  updateuser,
  deleteuser,
  index,
  show,
  adminregister,
  adminlogin,
  updateAdmin,
  refreshToken,
};
