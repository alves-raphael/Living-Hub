import DefaultWrapper from "@/Components/DefaultWrapper";
import LinkButton from "@/Components/LinkButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { BsGear } from "react-icons/bs";

const columns = [
    {
        name: "Nome",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "Editar",
        right: true,
        selector: (row) => {
            return (
                <LinkButton>
                    <BsGear />
                </LinkButton>
            );
        },
    },
];

export default function Index({ auth, condominia }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Condomínios
                </h2>
            }
        >
            <Head title="Condomínios" />
            <DefaultWrapper>
                <DataTable columns={columns} data={condominia} />
            </DefaultWrapper>
        </AuthenticatedLayout>
    );
}
