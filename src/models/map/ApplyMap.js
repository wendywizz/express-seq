const {
  Apply,
  Job,
  Resume,
  User,
  Company,
  JobType,
  Province,
  District,
  Region,
} = require("../orm");
const { Op } = require("sequelize");
const { currentDateTime } = require("../../utils/DateTime");
const { DISPLAY_START, DISPLAY_LENGTH } = require("../../constants/Record");

async function applyResume(insertData) {
  let success = false,
    message = "Apply resume failed",
    error = null;
  const jobId = insertData.job_id,
    userId = insertData.created_by;

  const isApplied = await checkAppliedByUser(jobId, userId);

  if (!isApplied) {
    const newData = {
      created_at: currentDateTime(),
      ...insertData,
    };
    await Apply.create(newData)
      .then(() => {
        success = true;
        message = "Apply resume completed";
      })
      .catch((e) => {
        error = e.message;
      });
  } else {
    message = "You applied this job already";
  }

  return { success, message, error };
}

async function checkAppliedByUser(jobId, userId) {
  let isApplied = true;

  if (jobId && userId) {
    const conditions = {
      job_id: {
        [Op.eq]: jobId,
      },
      created_by: {
        [Op.eq]: userId,
      },
    };
    await Apply.count({ where: conditions }).then((rowCount) => {
      if (rowCount <= 0) {
        isApplied = false;
      }
    });
  }

  return isApplied;
}

async function listApplyingByUser(
  userId,
  params,
  length = DISPLAY_LENGTH,
  start = DISPLAY_START
) {
  let data = [],
    itemCount = 0,
    message = "No data found",
    error = null;
  let conditions = {
    created_by: {
      [Op.eq]: userId,
    },
  };
  if (params.status) {
    conditions.apply_status = {
      [Op.eq]: params.status,
    };
  }

  await Apply.findAndCountAll({
    where: conditions,
    order: [["created_at", "DESC"]],
    limit: Number(length),
    offset: Number(start),
    include: [
      {
        model: Job,
        as: "job_asso",
        include: [
          {
            model: Company,
            as: "company_owner_asso",
          },
          {
            model: JobType,
            as: "job_type_asso",
          },
          {
            model: Province,
            as: "province_asso",
            attributes: ["id", ["name_th", "name"]],
          },
          {
            model: District,
            as: "district_asso",
            attributes: ["id", ["name_th", "name"]],
          },
        ],
      },
      { model: Resume, as: "resume_asso" },
      { model: User, as: "user_asso" },
    ],
  })
    .then((result) => {
      data = result.rows;
      itemCount = result.count;
      message = `There are data ${data.length} found`;
    })
    .catch((e) => {
      error = e.message;
    });

  return { data, itemCount, message, error };
}

module.exports = {
  applyResume,
  checkAppliedByUser,
  listApplyingByUser,
};
