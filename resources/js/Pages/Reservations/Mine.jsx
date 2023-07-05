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

const title = "Minhas reservas";

export default function Index({ auth, reservations }) {
    const { flash } = usePage().props;

    useEffect(() => {
        toast.success(flash.success);
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} header={<H2>{title}</H2>}>
            <Head title={title} />
            <DefaultWrapper>
                <LinkButton href={"/"}>Nova reserva</LinkButton>
                {reservations.length > 0 ? (
                    <DataTable columns={columns} data={reservations} />
                ) : (
                    <div className="m-5 text-center text-lg">
                        Você não possui nenhuma reserva
                    </div>
                )}
            </DefaultWrapper>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
