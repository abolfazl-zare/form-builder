import React, { FC } from "react";
import AddForm from "../add-form/index";
import { useRouter } from "next/router";

const Index: FC = () => {
    const router = useRouter();
    const { id } = router.query;
    return <AddForm formId={Number(id)} />;
};

export default Index;
