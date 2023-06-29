import * as yup from "yup";

export function createYupSchema(schema, config) {
    const { title, type, required } = config;
    let validationType = "";
    let validations = [];

    if (["text", "number", "textarea", "date", "dateRange", "select", "radio"].includes(type)) {
        validationType = "string";
    } else if (type == "checkbox") {
        validationType = "array";
    }

    if (required === "true") {
        validations.push({
            type: "required",
            params: ["this field is required"],
        });
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
        validator = validator[type](...params);
    });
    schema[title] = validator;
    return schema;
}
