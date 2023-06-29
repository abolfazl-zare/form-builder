import React, { FC } from "react";
import { Field } from "formik";

const SelectBox: FC<any> = ({ index, field }) => {
    return (
        <Field name={`fields.${index}.value`} as="select" className="form-select">
            {field.options.map((option: any, index: number) => (
                <option value={index} key={index}>
                    {option.title}
                </option>
            ))}
        </Field>
    );
};

export default SelectBox;
