import { Formik, Field, FieldArray, getIn } from "formik";
import React, { FC, useState, useEffect } from "react";
import formValidation from "./yup";
import { useStore, SET, ADD } from "../../contexts/store/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Form, Field as FieldInterFace } from "./../../interfaces/form";
import { TbTrash, TbArrowBigUp, TbArrowBigDown, TbPlus } from "react-icons/tb";

const Index: FC<any> = ({ formId }) => {
    const store: any = useStore();
    const forms: Form[] = store.forms;
    const { action } = store;
    const router = useRouter();
    const isNew = typeof formId == "undefined";
    const formIndex = forms?.findIndex((item: Form) => item.id === formId);
    const initialData: Form = {
        title: "",
        fields: [
            {
                title: "",
                label: "",
                value: "",
                type: "text",
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

    const handelForm = (values: Form) => {
        let form: Form = { ...values };
        if (isNew) {
            form.id = forms ? forms.length : 0;
            action({
                type: forms ? ADD : SET,
                path: "forms",
                payload: forms ? form : [form],
            });
        } else {
            action({
                type: SET,
                path: `forms[${formIndex}]`,
                payload: JSON.parse(JSON.stringify(form)),
            });
        }

        toast.success("mission accomplished");
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
                                <div className="col-xl-4 mt-4 pt-1 pb-1">
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
                                                values.fields.map((field: FieldInterFace, index) => (
                                                    <div className="container" key={index}>
                                                        <div className="row border border-2  mt-4 pb-3 rounded bg-light">
                                                            <div className="d-flex mt-3 align-items-center">
                                                                <h5 className="m-0">{field.type} input</h5>

                                                                <div style={{ marginLeft: "auto" }}>
                                                                    {values.fields.length > 1 && (
                                                                        <>
                                                                            <span
                                                                                className=" mx-4 text-secondary"
                                                                                style={{
                                                                                    fontSize: "24px",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() =>
                                                                                    arrayHelpers.remove(index)
                                                                                }
                                                                            >
                                                                                <TbTrash />
                                                                            </span>
                                                                            <span
                                                                                className="mx-2 text-secondary"
                                                                                style={{
                                                                                    fontSize: "25px",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() =>
                                                                                    arrayHelpers.move(index, index + 1)
                                                                                }
                                                                            >
                                                                                <TbArrowBigDown />
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                    {index > 0 && (
                                                                        <span
                                                                            className="text-secondary"
                                                                            style={{
                                                                                fontSize: "25px",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                                arrayHelpers.move(index, index - 1)
                                                                            }
                                                                        >
                                                                            <TbArrowBigUp />
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
                                                                            <div className="row border shadow-inset p-2 border-2  mx-0 mt-4 pb-4 rounded">
                                                                                <h5 className="mt-3">options</h5>
                                                                                {field.options &&
                                                                                    field.options.map(
                                                                                        (option, index2) => (
                                                                                            <div
                                                                                                className="col-xl-6 mt-3"
                                                                                                key={index2}
                                                                                            >
                                                                                                <div className="form-group">
                                                                                                    <label
                                                                                                        className="d-flex"
                                                                                                        style={{
                                                                                                            gap: "15px",
                                                                                                        }}
                                                                                                    >
                                                                                                        <span>
                                                                                                            option{" "}
                                                                                                            {index2 + 1}
                                                                                                        </span>
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
                                                                                                        {field.options
                                                                                                            .length >
                                                                                                            1 && (
                                                                                                            <div
                                                                                                                className="btn btn-outline-secondary"
                                                                                                                onClick={() =>
                                                                                                                    arrayHelpers2.remove(
                                                                                                                        index2
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                <TbTrash
                                                                                                                    style={{
                                                                                                                        fontSize:
                                                                                                                            "20px",
                                                                                                                    }}
                                                                                                                />
                                                                                                            </div>
                                                                                                        )}
                                                                                                        {index2 + 1 ===
                                                                                                            field
                                                                                                                .options
                                                                                                                .length && (
                                                                                                            <button
                                                                                                                className="btn btn-outline-secondary"
                                                                                                                onClick={() => {
                                                                                                                    arrayHelpers2.push(
                                                                                                                        {
                                                                                                                            title: "",
                                                                                                                        }
                                                                                                                    );
                                                                                                                }}
                                                                                                                type="button"
                                                                                                            >
                                                                                                                <TbPlus
                                                                                                                    style={{
                                                                                                                        fontSize:
                                                                                                                            "20px",
                                                                                                                    }}
                                                                                                                />
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

                                <div className="col-xl-12 mt-4 d-flex justify-content-end">
                                    <button className="btn btn-primary w-100" type="submit">
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
