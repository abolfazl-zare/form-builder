import React, { FC } from "react";
import { Field } from "formik";

const CheckBoxAndRadio: FC<any> = ({ index, field }) => {
    return (
        <div role="group" aria-labelledby="checkbox-group">
            {field.options.map((item: any, key: number) => (
                <div className="form-check" key={key}>
                    <Field
                        className="form-check-input"
                        type={field.type}
                        name={field.title}
                        id={`fields.${index}.value.${key}`}
                        value={key.toString()}
                    />
                    <label className="form-check-label" htmlFor={`fields.${index}.value.${key}`}>
                        {item.title}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckBoxAndRadio;
