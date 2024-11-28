const { body, validationResult } = require("express-validator")

const capitalizeCheck = (value) => {
    return value.slice(0,1) === value.slice(0,1).toUpperCase() && value.slice(1) === value.slice(1).toLowerCase()
  };

  const numberArrayCheck = (array) => {
    return array.every(number => typeof(number) === "number" )
  }
const validateActor = [
    body("firstName")
        .trim().notEmpty().withMessage("First Name is required")
        .isAlpha().withMessage("First name must be alphabetical letters")
        .custom(capitalizeCheck).withMessage("First letter of first name must be uppercase, and all remaining letters must be lowercase"),
    body("lastName")
        .trim().notEmpty().withMessage("Last Name is required")
        .isAlpha().withMessage("Last Name must be alphabetical letters")
        .custom(capitalizeCheck).withMessage("First letter of last name must be uppercase, and all remaining letters must be lowercase"),
    body("gender")
        .trim().toLowerCase().notEmpty().withMessage("Gender type is required")
        .isIn(['male', 'female', 'others']).withMessage("Gender must be one of male, female, or others"),
    body("character")
        .trim().notEmpty().withMessage("Character name is required")
        .isString().withMessage("Character name must be alphabetical letters"),
    body("dateOfBirth")
        .optional()
        .trim().isDate().withMessage("Please follow the format of YYYY-MM-DD"),
    body("nationality")
        .optional()
        .trim().isString().withMessage("Nationality must be alphabetical letters"),
    body("firstAppearSeason")
        .trim().notEmpty().withMessage("First appearing season is required")
        .isNumeric().withMessage("Only a number is allowed"),
    body("seasons")
        .notEmpty().withMessage("season number is required")
        .isArray().withMessage("Season should be an array")
        .custom(numberArrayCheck).withMessage("Seasons array must be numbers only")
]

const validatePartialActor = [
    body("firstName")
        .optional()
        .trim()
        .isAlpha().withMessage("First name must be alphabetical letters")
        .custom(capitalizeCheck).withMessage("First letter of first name must be uppercase, and all remaining letters must be lowercase"),
    body("lastName")
        .optional()
        .trim()
        .isAlpha().withMessage("Last Name must be alphabetical letters")
        .custom(capitalizeCheck).withMessage("First letter of last name must be uppercase, and all remaining letters must be lowercase"),
    body("gender")
        .optional()
        .trim().toLowerCase()
        .isIn(['male', 'female', 'others']).withMessage("Gender must be one of male, female, or others"),
    body("character")
        .optional()
        .trim()
        .isString().withMessage("Character name must be alphabetical letters"),
    body("dateOfBirth")
        .optional()
        .trim().isDate().withMessage("Please follow the format of YYYY-MM-DD"),
    body("nationality")
        .optional()
        .trim().isString().withMessage("Nationality must be alphabetical letters"),
    body("firstAppearSeason")
        .optional()
        .trim()
        .isNumeric().withMessage("Only a number is allowed"),
    body("seasons")
        .optional()
        .isArray().withMessage("Season should be an array")
        .custom(numberArrayCheck).withMessage("Seasons array must be numbers only")
]

const handleValidation = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    next()
}

module.exports = { validateActor, validatePartialActor, handleValidation }