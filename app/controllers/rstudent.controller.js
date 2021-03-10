const db = require("../models")
const RStudent = db.rstudent;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { STUD_ID: { [Op.like]: `%${STUD_ID}%`}} : null;

  RStudent.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured"
      });
    });
}