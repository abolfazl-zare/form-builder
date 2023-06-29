import React from "react";
import { FC, useEffect } from "react";
import { useStore } from "../../contexts/store/store";
import { useRouter } from "next/router";
import { Formik, FieldArray, getIn } from "formik";
import FormItem from "../../components/FormItem";
import { toast } from "react-toastify";
import { Form, Field } from "./../../interfaces/form";
import { createYupSchema } from "./../../utils/yupSchemaCreator";
import * as yup from "yup";

const Index: FC = () => {
    const strore: any = useStore();
    const forms: Form[] = strore.forms;
    const router = useRouter();
    const { id: formId } = router.query;
    const formIndex = forms?.findIndex((item: Form) => item.id === Number(formId));
    let form: Form = forms[formIndex];

    // cerate initialValues and validateSchema
    let initialValues: any = {};
    form?.fields.forEach((item) => {
        initialValues[item.title] = item.value;
    });
    const yepSchema = form?.fields.reduce(createYupSchema, {});
    const validateSchema = yup.object().shape(yepSchema);

    const handelForm = (values: Field[]) => {
        console.log("values", values);
        toast.success("mission accomplished");
        router.push("/");
    };

    if (typeof form === "undefined") return "form not found";

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h3>Preview - {form.title}</h3>

                <button className="btn btn-outline-secondary" onClick={() => router.push("/")}>
                    Back to home
                </button>
            </div>
            <div className="container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validateSchema}
                    onSubmit={(values) => handelForm(values)}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        const getFieldError = (path: string) => {
                            const error = getIn(errors, path);
                            const touch = getIn(touched, path);

                            if (touch && error) {
                                return (
                                    <div className="text-danger form-text">
                                        {typeof error === "object" ? Object.values(error)[0] : error}
                                    </div>
                                );
                            }
                            return null;
                        };

                        return (
                            <form onSubmit={handleSubmit} className="">
                                <div className="row border p-2 border-2 pb-4  mt-4 rounded bg-light">
                                    {form.fields?.map((field: Field, index: number) => (
                                        <div className="col-lg-4 mt-4" key={index}>
                                            <div className="form-group">
                                                <label>
                                                    {field.label}
                                                    {field.required == "true" && (
                                                        <span className="text-danger"> *</span>
                                                    )}
                                                </label>

                                                <FormItem
                                                    {...{
                                                        index,
                                                        handleChange,
                                                        handleBlur,
                                                        getFieldError,
                                                        field,
                                                        setFieldValue,
                                                        values,
                                                    }}
                                                />

                                                {getFieldError(field.title) ||
                                                    (field.description && (
                                                        <small id="emailHelp" className="form-text text-muted">
                                                            {field.description}
                                                        </small>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 d-flex justify-content-end row">
                                    <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Index;
