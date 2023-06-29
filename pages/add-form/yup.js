import * as Yup from "yup";

export default Yup.object().shape({
    title: Yup.string().min(2).max(100).required(),
    fields: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().min(2).max(100).required("this field is required"),
                label: Yup.string().min(2).max(100).required("this field is required"),
                description: Yup.string().min(2).max(300),
                format: Yup.string(),
                type: Yup.string().required("this field is required"),
                options: Yup.array().when("type", (val, schema) => {
                    return ["select", "checkbox", "radio"].includes(val[0])
                        ? schema.of(
                              Yup.object().shape({
                                  title: Yup.string().min(2).max(100).required("this field is required"),
                              })
                          )
                        : schema;
                }),
            })
        )
        .required()
        .min(1),
});
