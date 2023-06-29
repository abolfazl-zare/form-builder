import { useStore, REMOVE } from "../contexts/store/store";
import { useRouter } from "next/router";
import Dropdown from "react-bootstrap/Dropdown";

export default function Home() {
    const { forms, action }: any = useStore();
    const router = useRouter();

    const handelDelete = (formId: number) => {
        let formIndex = forms.findIndex((item: any) => item.id === formId);
        action({
            type: REMOVE,
            path: `forms[${formIndex}]`,
        });
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h2>Forms</h2>

                <button className="btn btn-primary" onClick={() => router.push("/add-form")}>
                    Create Form
                </button>
            </div>
            {forms && forms.length ? (
                <div className="border border-2 rounded-3 mt-4">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th style={{ background: "#fffafa" }} scope="col">
                                    #ID
                                </th>
                                <th style={{ background: "#fffafa" }} scope="col">
                                    Form Title
                                </th>
                                <th style={{ background: "#fffafa" }} scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.map(({ title, id }: { title: string; id: number }, key: number) => (
                                <tr key={key}>
                                    <th scope="row">{id}</th>
                                    <td>{title}</td>
                                    <td>
                                        <div className="d-flex justify-content-end px-3">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                    more
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => router.push(`/edit-form/${id}`)}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handelDelete(id)}>
                                                        Delete
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => router.push(`/form/${id}`)}>
                                                        Preview
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-primary mt-4" role="alert">
                    There is no data to display
                </div>
            )}
        </div>
    );
}
