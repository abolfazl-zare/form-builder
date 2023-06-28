const exampleForm = {
    title: "Example Form",
    fields: [
        {
            title: "text input",
            label: "text input label ",
            type: "text",
            description: "text input description",
            required: "true",
            format: "text input regex",
            options: [
                {
                    title: "",
                },
            ],
        },
        {
            title: "number input",
            label: "number input label ",
            type: "number",
            description: "number input description",
            required: "true",
            format: "number input format",
            options: [
                {
                    title: "",
                },
            ],
        },
        {
            title: "select box",
            label: "select box label",
            type: "select",
            description: "",
            required: "true",
            format: "",
            options: [
                {
                    title: "opoption 1",
                },
                {
                    title: "option 2",
                },
            ],
        },
        {
            title: "textarea",
            label: "textarea label",
            type: "textarea",
            description: "",
            required: "false",
            format: "",
            options: [
                {
                    title: "",
                },
            ],
        },
        {
            title: "date input",
            label: "date input label",
            type: "date",
            description: "",
            required: "true",
            format: "",
            options: [
                {
                    title: "",
                },
            ],
        },
        {
            title: "date range input",
            label: "date range input label",
            type: "dateRange",
            description: "",
            required: "true",
            format: "",
            options: [
                {
                    title: "",
                },
            ],
        },
        {
            title: "checkbox",
            label: "checkbox label",
            type: "checkbox",
            description: "",
            required: "true",
            format: "",
            options: [
                {
                    title: "option 1",
                },
                {
                    title: "option 2",
                },
                {
                    title: "option 3",
                },
            ],
        },
        {
            title: "radio",
            label: "radio label",
            type: "radio",
            description: "",
            required: "false",
            format: "",
            options: [
                {
                    title: "option 1",
                },
                {
                    title: "option 2",
                },
            ],
        },
    ],
    id: 0,
};
export default exampleForm;
