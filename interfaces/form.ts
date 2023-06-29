export interface Form {
    title: string;
    id?: number;
    fields: Field[];
}

export interface Field {
    title: string;
    value: string | string[];
    label: string;
    type: string;
    description: string;
    required: string;
    format: string;
    options: [
        {
            title: string;
        }
    ];
}
