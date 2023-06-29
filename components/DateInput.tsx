import React, { FC, useState } from "react";
import DatePicker from "react-multi-date-picker";

const DateInput: FC<any> = ({ field, setFieldValue }) => {
    const [value, setValue] = useState(new Date());

    return (
        <DatePicker
            inputClass="form-control"
            value={value}
            name={field.title}
            onChange={(date: any) => {
                setValue(date);
                setFieldValue(field.title, date.toDate().toISOString());
            }}
        />
    );
};

export default DateInput;
