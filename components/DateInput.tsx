import React, { FC, useState } from "react";
import DatePicker from "react-multi-date-picker";

const DateInput: FC<any> = ({ index, setFieldValue }) => {
    const [value, setValue] = useState(new Date());

    return (
        <DatePicker
            inputClass="form-control"
            value={value}
            name={`fields.${index}.type`}
            onChange={(date: any) => {
                setValue(date);
                setFieldValue(`fields.${index}.value`, date.toDate().toISOString());
            }}
        />
    );
};

export default DateInput;
