import React, { FC } from "react";

const NumberInput: FC<any> = ({ values, handleChange, handleBlur, field }) => {
    return (
        <input
            type="number"
            className="form-control"
            name={field.title}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[field.title] || ""}
        />
    );
};

export default NumberInput;
