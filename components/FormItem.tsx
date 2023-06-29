import { FC } from "react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import TextareaInput from "./TextareaInput";
import DateInput from "./DateInput";
import DateRangeInput from "./DateRangeInput";
import SelectBox from "./SelectBox";
import CheckBoxAndRadio from "./CheckBoxAndRadio";

const FormItem: FC<any> = (props) => {
    const { field } = props;

    switch (field.type) {
        case "text":
            return <TextInput {...props} />;
        case "number":
            return <NumberInput {...props} />;
        case "textarea":
            return <TextareaInput {...props} />;
        case "date":
            return <DateInput {...props} />;
        case "dateRange":
            return <DateRangeInput {...props} />;
        case "select":
            return <SelectBox {...props} />;
        case "checkbox":
            return <CheckBoxAndRadio {...props} />;
        case "radio":
            return <CheckBoxAndRadio {...props} />;
        default:
            return "Error";
    }
};

export default FormItem;
