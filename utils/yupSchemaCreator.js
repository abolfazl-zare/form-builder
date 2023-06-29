// import { type } from "os";
import * as yup from "yup";

export function createYupSchema(schema, config, currentIndex) {
    console.log("currentIndex", currentIndex);
    const { title, type, required } = config;
    let validationType = "";
    let validations = [
        {
            type: "required",
            params: ["this field is required"],
        },
    ];

    if (["text", "number", "textarea", "date", "dateRange", "select", "radio"].includes(type)) {
        validationType = "string";
    } else if (type == "checkbox") {
        validationType = "array";
        // validations
    }

    if (!yup[validationType]) {
        return schema;
    }
    let validator = yup[validationType]();
    validations.forEach((validation) => {
        const { params, type } = validation;
        if (!validator[type]) {
            return;
        }
        console.log(type, params);
        validator = validator[type](...params);
    });
    schema[`fields.${currentIndex}.value`] = validator;
    return schema;
}
