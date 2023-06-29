import React, { FC } from "react";

const NumberInput: FC<any> = ({ index, handleChange, handleBlur, field }) => {
    return (
        <input
            type="number"
            className="form-control"
            name={`fields.${index}.value`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={field.value || ""}
        />
    );
};

export default NumberInput;
