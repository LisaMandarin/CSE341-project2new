const { body, validationResult } =require("express-validator")

const validateMoment = [
    body("season")
        .trim()
        .notEmpty().withMessage("Season is required")
        .isNumeric().withMessage("Only number for season field"),
    body("episode")
        .trim()
        .notEmpty().withMessage("Episode is required")
        .isNumeric().withMessage("Only number for episode field"),
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required"),
    body("airDate")
        .trim()
        .notEmpty().withMessage("Air Date is required")
        .isISO8601({ strict: true, strictSeparator: true }).withMessage("Invalid date format.  Use: YYYY-MM-DD"),
    body("plotSummary")
        .trim()
        .notEmpty().withMessage("Plot summary is required")
        .isLength({ max: 1000 }).withMessage("The length is 1000 words at most"),
    body("youtubeURL")
        .trim()
        .notEmpty().withMessage("Youtube URL is required")
        .isURL().withMessage("Invalid URL"),
    body("actors")
        .isArray({min: 1}).withMessage("Actors should be an array with at least one item")
    ]

const validatePartialMoment = [
    body("season")
        .optional()
        .trim()
        .isNumeric().withMessage("Only number for season field"),
    body("episode")
        .optional()
        .trim()
        .isNumeric().withMessage("Only number for episode field"),
    body("title")
        .optional()
        .trim(),
    body("airDate")
        .optional()
        .trim()
        .isISO8601({ strict: true, strictSeparator: true }).withMessage("Invalid date format.  Use: YYYY-MM-DD"),
    body("plotSummary") 
        .optional()
        .trim()
        .isLength({ max: 1000 }).withMessage("The length is 1000 words at most"),
    body("youtubeURL")
        .optional()
        .trim()
        .isURL().withMessage("Invalid URL"),
    body("actors")
        .optional()
        .isArray({min: 1}).withMessage("Actors should be an array with at least one item")
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

module.exports = { validateMoment, validatePartialMoment, handleValidation }