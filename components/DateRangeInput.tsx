import React, { FC, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const DateRangeInput: FC<any> = ({ field, setFieldValue }) => {
    const [value, setValue] = useState([new DateObject().subtract(0, "days"), new DateObject().add(4, "days")]);

    return (
        <DatePicker
            inputClass="form-control"
            value={value}
            onChange={(dates: any[]) => {
                setValue(dates);
                dates.map((cell) => {
                    return cell.toDate().toISOString();
                });
                setFieldValue(field.title, dates.join("|"));
            }}
            range
        />
    );
};

export default DateRangeInput;
