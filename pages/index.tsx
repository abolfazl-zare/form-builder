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
                <h3>Forms</h3>

                <button className="btn btn-outline-primary" onClick={() => router.push("/add-form")}>
                    Create Form
                </button>
            </div>
            {forms && forms.length ? (
                <table className="table table-bordered mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Form Title</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map(({ title, id }: { title: string; id: number }, key: number) => (
                            <tr key={key}>
                                <th scope="row">{id}</th>
                                <td>{title}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Actions
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => router.push(`/edit-form/${id}`)}>
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handelDelete(id)}>Delete</Dropdown.Item>
                                            <Dropdown.Item onClick={() => router.push(`/form/${id}`)}>
                                                Preview
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-primary mt-4" role="alert">
                    There is no data to display
                </div>
            )}
        </div>
    );
}
