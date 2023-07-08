import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2 } from "@/Components/Headings";
import LinkButton from "@/Components/LinkButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { BsGear } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const columns = [
    {
        name: "Área",
        selector: (row) => row.common_area.name,
    },
    {
        name: "Início",
        selector: (row) =>
            format(new Date(row.started_at), "dd 'de' MMMM 'de' Y 'às' HH:mm", {
                locale: ptBR,
            }),
    },
    {
        name: "Fim",
        selector: (row) =>
            format(
                new Date(row.finished_at),
                "dd 'de' MMMM 'de' Y 'às' HH:mm",
                {
                    locale: ptBR,
                }
            ),
    },
    {
        name: "Status",
        selector: (row) => (
            <Badge
                color="red"
                content={<span className="text-sm font-bold">CANCELADA</span>}
            />
        ),
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
        console.log(reservations);
        toast.success(flash.success);
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} header={<H2>{title}</H2>}>
            <Head title={title} />
            <DefaultWrapper>
                <LinkButton href={route("reservations.create")}>
                    Nova reserva
                </LinkButton>
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
