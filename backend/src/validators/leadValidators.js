import { body } from "express-validator";

export const createLeadValidator = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name should not be empty")
    .escape(),
  body("phone")
    .exists({ checkFalsy: true })
    .withMessage("Phone is required")
    .bail()
    .isString()
    .withMessage("Phone must be a string")
    .trim()
    .notEmpty()
    .withMessage("Phone should not be empty")
    .matches(/^\d+$/)
    .withMessage("Phone must be numeric")
    .escape(),
  body("businessType")
    .optional({ nullable: true })
    .isString()
    .withMessage("Business type must be a string")
    .trim()
    .escape(),
  body("message")
    .optional({ nullable: true })
    .isString()
    .withMessage("Message must be a string")
    .trim()
    .escape(),
];
