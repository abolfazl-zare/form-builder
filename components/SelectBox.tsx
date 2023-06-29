import React, { FC } from "react";
import { Field } from "formik";

const SelectBox: FC<any> = ({ field }) => {
    return (
        <Field name={field.title} as="select" className="form-select">
            {field.options.map((option: any, key: number) => (
                <option value={key} key={key}>
                    {option.title}
                </option>
            ))}
        </Field>
    );
};

export default SelectBox;
