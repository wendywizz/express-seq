const db = require("../models")
const RStudent = db.RStudent;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { STUD_ID: { [Op.like]: `%${id}%`}} : null;

  rstudent.findAll({ 
    attributes: ["STU_NAME", "STU_SNAME"],
    where: condition 
  }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured"
      });
    });
}

exports.identifyStudent = (req, res) => {
  const idNumber = req.query.id_no;
  const studentCode = req.query.std_code;

  if (idNumber && studentCode) {
    const conditions = {
      CARD_ID: idNumber,
      STUD_ID: studentCode
    }

    RStudent.findAll({
      attributes: ["STUD_ID"],
      where: conditions
    }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured"
      })
    })
  } else {
    res.send("Parameters [id_no, std_code] are need!!");
  }
}