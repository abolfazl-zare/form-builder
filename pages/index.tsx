import { useStore } from "../contexts/store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";

export default function Home() {
    const { forms, action }: any = useStore();
    const router = useRouter();

    useEffect(() => {
        // action({
        //     type: ADD,
        //     path: "items",
        //     payload: [{ name: "set abolfazl" }],
        // });
    }, []);

    console.log("forms", forms);

    const links = [
        { href: "/account-settings", label: "Account settings" },
        { href: "/support", label: "Support" },
        { href: "/license", label: "License" },
        { href: "/sign-out", label: "Sign out" },
    ];

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h3>Forms</h3>

                <button className="btn btn-outline-primary" onClick={() => router.push("/add-form")}>
                    Create Form
                </button>
            </div>
            {forms ? (
                <table className="table table-bordered mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map(({ title, id }: { title: string; id: number }, key: number) => (
                            <tr key={key}>
                                <th scope="row">{id}</th>
                                <td>{title}</td>
                                <td>
                                    <button className="btn btn-light" onClick={() => router.push(`/edit-form/${id}`)}>
                                        Edit
                                    </button>{" "}
                                </td>
                                <td>
                                    <Menu>
                                        <Menu.Button>Options</Menu.Button>
                                        <Menu.Items>
                                            {links.map((link) => (
                                                <Menu.Item
                                                    as="a"
                                                    key={link.href}
                                                    href={link.href}
                                                    className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                                                >
                                                    {link.label}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Menu>
                                </td>
                                <td>@mdo</td>
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
