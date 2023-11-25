const joi = require("joi")

const productValid = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.array().required(),
    color: joi.array(),
    size: joi.array(),
    description: joi.string()
})

module.exports = productValid