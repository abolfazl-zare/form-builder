import React, { FC } from "react";

const TextareaInput: FC<any> = ({ index, handleChange, handleBlur, field }) => {
    return (
        <textarea
            className="form-control"
            name={`fields.${index}.value`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={field.value || ""}
            rows={3}
        ></textarea>
    );
};

export default TextareaInput;
