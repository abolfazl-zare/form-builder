import React, { FC } from "react";

const TextInput: FC<any> = ({ index, handleChange, handleBlur, field }) => {
    return (
        <input
            type="text"
            className="form-control"
            name={`fields.${index}.value`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={field.value || ""}
        />
    );
};

export default TextInput;
