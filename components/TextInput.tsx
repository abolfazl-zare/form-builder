import React, { FC } from "react";

const TextInput: FC<any> = ({ handleChange, values, handleBlur, field }) => {
    return (
        <input
            type="text"
            className="form-control"
            name={field.title}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[field.title] || ""}
        />
    );
};

export default TextInput;
