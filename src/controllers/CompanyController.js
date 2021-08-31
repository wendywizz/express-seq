const { CompanyMap } = require("../models/map");
const { uploadLogoByPK } = require("../models/map/CompanyMap");
const { LOGO_SOURCE_PATH } = require("../config/path");

async function saveByOwner(req, res) {
  const { owner } = req.body;
  const saveData = {
    company_name: req.body.name,
    about: req.body.about,
    address: req.body.address,
    province: req.body.province,
    district: req.body.district,
    postcode: req.body.postcode,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
    facebook: req.body.facebook,
  };
  const { success, data, message, error } = await CompanyMap.saveByOwner(owner, saveData);
  res.send({ success, data, message, error });
}

async function getCompany(req, res) {
  const { id } = req.query;
  const { data, message, error } = await CompanyMap.getCompanyByPK(id);

  const serverUrl = req.protocol + "://" + req.get("host") + "/";
  const rData = {
    ...data.dataValues,
    logo_url: serverUrl + LOGO_SOURCE_PATH + data.logo_file,
  };
  res.send({ data: rData, message, error });
}

async function getInfoByOwner(req, res) {
  const { owner } = req.query;
  const { data, message, error } = await CompanyMap.getCompanyByOwner(owner);

  const serverUrl = req.protocol + "://" + req.get("host") + "/";
  const rData = {
    ...data.dataValues,
    logo_url: serverUrl + LOGO_SOURCE_PATH + data.logo_file,
  };
  res.send({ data: rData, message, error });
}

async function uploadLogo(req, res) {
  const { company_id } = req.body;
  const file = req.file;
  const reqUrl = url.format({
    protocol: req.protocol,
    host: req.get("host"),
  });

  const { success, imageUrl, message, error } = uploadLogoByPK(
    company_id,
    file,
    reqUrl
  );
  res.send({ success, imageUrl, message, error });
}

module.exports = {
  saveByOwner,
  getCompany,
  getInfoByOwner,
  uploadLogo,
};
