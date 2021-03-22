const Sequelize = require('sequelize');

const RStudentModel = function(sequelize, DataTypes) {
  return sequelize.define('R_STUDENT', {
    STUD_ID: {
      type: DataTypes.STRING(13),
      primaryKey: true,
      allowNull: false
    },
    ENT_METHOD: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    GROUP_ID: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    ENT_YEAR: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    FEE_YEAR: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    FAC_ID: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    DEPT_ID: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    MAJOR_ID: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    SEX_CODE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TITLE_CODE: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    STU_NAME: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    STU_SNAME: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    STUDY_STATUS: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    YEAR_STATUS: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PAY_TYPE: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    GOV_OFFICER: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    STUDY_STEP: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    DEG_ID1: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    DEG_ID2: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    GRAD_TERM: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    GRAD_YEAR: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    GRAD_DATE: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    HONOUR: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    COURSE_KEY: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    YEARLY_REGIST: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TITLE_CODE_ENG: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    STU_ENG_NAME: {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    STU_ENG_SNAME: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    BIRTH_DATE: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    BIRTH_PLACE: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    ADMITTED: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    DEG_BEFORE: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    L_FOREIGN: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CONFIRM_GRADE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CONFIRM_TERM: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CONFIRM_YEAR: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    CARD_ID: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    STUDY_TYPE_NAME: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    CAMPUS_ID: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    DEGREE_ID: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    STUDY_LEVEL_ID: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    STUDY_PLAN_ID: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    STUDY_PLAN_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    PHONE: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    MOBILE: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    NATIONALITY: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ADMIT_YEAR: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    ADMIT_TERM: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'R_STUDENT',
    modelName: "rstudent",
    timestamps: false,
    indexes: [
      {
        name: "STUD_ID",
        using: "BTREE",
        fields: [
          { name: "STUD_ID" },
        ]
      },
    ]
  });
};

// To avoid table creation
RStudentModel.sync = () => Promise.resolve();

module.exports = RStudentModel;