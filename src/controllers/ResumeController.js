const { ResumeMap } = require("../models/map");
const { RESUME_PATH } = require("../config/path");

async function listByUser(req, res) {
  const { id } = req.query;
  const { data, message, error } = await ResumeMap.getResumeByUserId(id);

  const serverUrl = req.protocol + "://" + req.get("host") + "/";
  const resData = data.map(item => {
    const value = item.dataValues

    return {
      ...value,
      resume_file: serverUrl + RESUME_PATH + value.resume_file,
    };
  });

  res.send({ data: resData, message, error });
}

async function add(req, res) {
  const { user_id, name, additional } = req.body;
  const resumeFileName = req.file.filename;
  const insertData = {
    name,
    additional,
    resume_file: resumeFileName,
    created_by: user_id,
  };
  const response = await ResumeMap.createResume(insertData);
  res.send(response);
}

async function remove(req, res) {
  const { id } = req.body;

  const response = await ResumeMap.deleteResumeByPk(id);
  res.send(response);
}

module.exports = {
  listByUser,
  add,
  remove,
};
