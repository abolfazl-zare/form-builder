import { Formik, Field, FieldArray, getIn } from "formik";
import React, { FC, useState, useEffect } from "react";
import formValidation from "./yup";
import { useStore, SET, ADD, UPDATE } from "../../contexts/store/store";
import { useRouter } from "next/router";

const Index: FC<any> = ({ formId }) => {
    const { forms, action }: any = useStore();
    const router = useRouter();
    const isNew = typeof formId == "undefined";
    const formIndex = forms?.findIndex((item: any) => item.id === formId);
    const initialData = {
        title: "",
        fields: [
            {
                title: "",
                label: "",
                type: "number",
                description: "",
                required: "true",
                format: "",
                options: [{ title: "" }],
            },
        ],
    };

    const [initialValues, setInitialData] = useState(isNew ? initialData : null);

    useEffect(() => {
        if (forms && formIndex != -1) {
            setInitialData({ ...forms[formIndex] });
        }
    }, [formId]);

    const handelForm = (values: any) => {
        let form = { ...values };
        if (isNew) {
            form.id = forms ? forms.length : 0;
            action({
                type: forms ? ADD : SET,
                path: "forms",
                payload: forms ? form : [form],
            });
        } else {
            action({
                type: UPDATE,
                path: `forms[${formIndex}]`,
                payload: forms ? form : [form],
            });
        }

        router.push("/");
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h3>{isNew ? "Add" : "Edit"} Form</h3>

                <button className="btn btn-outline-secondary" onClick={() => router.push("/")}>
                    Back to home
                </button>
            </div>
            {initialValues != null ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={formValidation}
                    onSubmit={(values) => handelForm(values)}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
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
                        };
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="col-xl-4 mt-5 pb-3">
                                    <div className="form-group">
                                        <label>Form Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter title"
                                            name={`title`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.title}
                                        />
                                        {getFieldError(`title`)}
                                    </div>
                                </div>

                                <FieldArray
                                    name="fields"
                                    render={(arrayHelpers: any) => (
                                        <>
                                            {values.fields &&
                                                values.fields.map((field, index) => (
                                                    <div className="container" key={index}>
                                                        <div className="row border border-2  mt-4 pb-3 rounded">
                                                            <div className="d-flex mt-3 align-items-center">
                                                                <h5 className="m-0">Field {index + 1}</h5>

                                                                <div style={{ marginLeft: "auto" }}>
                                                                    {values.fields.length > 1 && (
                                                                        <>
                                                                            <span
                                                                                className=" mx-4"
                                                                                style={{
                                                                                    fontSize: "18px",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() =>
                                                                                    arrayHelpers.remove(index)
                                                                                }
                                                                            >
                                                                                ❌
                                                                            </span>
                                                                            <span
                                                                                style={{
                                                                                    fontSize: "22px",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() =>
                                                                                    arrayHelpers.move(index, index + 1)
                                                                                }
                                                                            >
                                                                                ⬇️
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                    {index > 0 && (
                                                                        <span
                                                                            style={{
                                                                                fontSize: "22px",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                arrayHelpers.move(index, index - 1)
                                                                            }
                                                                        >
                                                                            ⬆️
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="col-xl-4 mt-3">
                                                                <div className="form-group">
                                                                    <label>Field title</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter title"
                                                                        name={`fields.${index}.title`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={field.title}
                                                                    />
                                                                    {getFieldError(`fields.${index}.title`)}
                                                                </div>
                                                            </div>

                                                            <div className="col-xl-4 mt-3">
                                                                <div className="form-group">
                                                                    <label>Field label</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter label"
                                                                        name={`fields.${index}.label`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={field.label}
                                                                    />
                                                                    {getFieldError(`fields.${index}.label`)}
                                                                </div>
                                                            </div>

                                                            <div className="col-xl-4 mt-3">
                                                                <div className="form-group">
                                                                    <label>Field type</label>
                                                                    <Field
                                                                        name={`fields.${index}.type`}
                                                                        as="select"
                                                                        className="form-select"
                                                                    >
                                                                        <option value="text">text</option>
                                                                        <option value="number">number</option>
                                                                        <option value="textarea">textarea</option>
                                                                        <option value="date">date</option>
                                                                        <option value="dateRange">date range</option>
                                                                        <option value="select">select item</option>
                                                                        <option value="checkbox">checkbox</option>
                                                                        <option value="radio">radio</option>
                                                                    </Field>
                                                                    {getFieldError(`fields.${index}.type`)}
                                                                </div>
                                                            </div>

                                                            <div className="col-xl-4 mt-3">
                                                                <div className="form-group">
                                                                    <label>Field description</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter description"
                                                                        name={`fields.${index}.description`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={field.description}
                                                                    />
                                                                    {getFieldError(`fields.${index}.description`)}
                                                                </div>
                                                            </div>

                                                            <div className="col-xl-4 mt-3">
                                                                <div className="form-group">
                                                                    <label>Required Field</label>
                                                                    <Field
                                                                        name={`fields.${index}.required`}
                                                                        as="select"
                                                                        className="form-select"
                                                                    >
                                                                        <option value="true">true</option>
                                                                        <option value="false">false</option>
                                                                    </Field>
                                                                    {getFieldError(`fields.${index}.required`)}
                                                                </div>
                                                            </div>

                                                            <div className="col-xl-4 mt-3">
                                                                <div className="form-group">
                                                                    <label>Field format</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter format"
                                                                        name={`fields.${index}.format`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={field.format}
                                                                    />
                                                                    {getFieldError(`fields.${index}.format`)}
                                                                </div>
                                                            </div>

                                                            {["select", "checkbox", "radio"].includes(field.type) && (
                                                                <FieldArray
                                                                    name={`fields.${index}.options`}
                                                                    render={(arrayHelpers2: any) => (
                                                                        <div className="container">
                                                                            <div className="row border border-2  mx-0 mt-3 pb-3 rounded">
                                                                                <h5 className="mt-3">options</h5>
                                                                                {field.options &&
                                                                                    field.options.map(
                                                                                        (option, index2) => (
                                                                                            <div
                                                                                                className="col-xl-4 mt-3"
                                                                                                key={index2}
                                                                                            >
                                                                                                <div className="form-group">
                                                                                                    <label className="d-flex">
                                                                                                        option{" "}
                                                                                                        {index2 + 1}
                                                                                                        {index2 > 0 && (
                                                                                                            <div
                                                                                                                className="mx-2"
                                                                                                                style={{
                                                                                                                    fontSize:
                                                                                                                        "14px",
                                                                                                                    cursor: "pointer",
                                                                                                                    filter: "brightness(0)",
                                                                                                                }}
                                                                                                                onClick={() =>
                                                                                                                    arrayHelpers2.remove(
                                                                                                                        index2
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                ❌
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </label>

                                                                                                    <div
                                                                                                        className="d-flex"
                                                                                                        style={{
                                                                                                            gap: "10px",
                                                                                                        }}
                                                                                                    >
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            className="form-control"
                                                                                                            placeholder="Enter title"
                                                                                                            name={`fields.${index}.options.${index2}.title`}
                                                                                                            onChange={
                                                                                                                handleChange
                                                                                                            }
                                                                                                            onBlur={
                                                                                                                handleBlur
                                                                                                            }
                                                                                                            value={
                                                                                                                option.title
                                                                                                            }
                                                                                                        />
                                                                                                        {index2 + 1 ===
                                                                                                            field
                                                                                                                .options
                                                                                                                .length && (
                                                                                                            <button
                                                                                                                className="btn btn-outline-success"
                                                                                                                onClick={() => {
                                                                                                                    arrayHelpers2.push(
                                                                                                                        {
                                                                                                                            title: "",
                                                                                                                        }
                                                                                                                    );
                                                                                                                }}
                                                                                                                type="button"
                                                                                                            >
                                                                                                                +
                                                                                                            </button>
                                                                                                        )}
                                                                                                    </div>
                                                                                                    {getFieldError(
                                                                                                        `fields.${index}.options.${index2}.title`
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}

                                            <div className="w-100 mt-4">
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => arrayHelpers.push(initialData.fields[0])}
                                                    type="button"
                                                >
                                                    add field
                                                </button>
                                            </div>
                                        </>
                                    )}
                                />

                                <div className="col-xl-12 mt-5 d-flex justify-content-end">
                                    <button className="btn btn-primary" type="submit">
                                        {isNew ? "Add" : "Edit"} Form
                                    </button>
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            ) : (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Index;
