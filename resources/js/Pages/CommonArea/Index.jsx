import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2 } from "@/Components/Headings";
import LinkButton from "@/Components/LinkButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { BsGear } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
    {
        name: "Nome",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "Condomínio",
        selector: (row) => row.condominium.name,
        sortable: true,
    },
    {
        name: "Editar",
        right: true,
        selector: (row) => {
            return (
                <LinkButton href={route("common-area.edit", row.id)}>
                    <BsGear />
                </LinkButton>
            );
        },
    },
];

export default function Index({ auth, commonAreas }) {
    const { flash } = usePage().props;

    useEffect(() => {
        toast.success(flash.success);
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} header={<H2>Áreas comum</H2>}>
            <Head title="Condomínios" />
            <DefaultWrapper>
                <LinkButton href={route("common-area.create")}>
                    Novo área comum
                </LinkButton>
                <DataTable columns={columns} data={commonAreas} />
            </DefaultWrapper>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
