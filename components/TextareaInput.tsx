import React, { FC } from "react";

const TextareaInput: FC<any> = ({ values, handleChange, handleBlur, field }) => {
    return (
        <textarea
            className="form-control"
            name={field.title}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[field.title] || ""}
            rows={3}
        ></textarea>
    );
};

export default TextareaInput;
