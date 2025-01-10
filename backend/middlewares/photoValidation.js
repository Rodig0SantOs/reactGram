const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3, max: 50 })
      .withMessage("O título precisa ter entre 3 e 50 caracteres"),

    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("É necessário enviar uma imagem.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3, max: 50 })
      .withMessage("O título precisa ter entre 3 e 50 caracteres"),
  ];
};

const commentValidation = () => {
  return [body("comment").isString().withMessage("O comentário é obrigatório")];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
