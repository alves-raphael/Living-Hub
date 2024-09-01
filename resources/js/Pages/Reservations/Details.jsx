import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2, H3 } from "@/Components/Headings";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { formatDate } from "./utils/date";
import { Button, Placeholder, Table } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@/Components/Modal";
import "rsuite/dist/rsuite.min.css";
import LinkButton from "@/Components/LinkButton";
const { Column, HeaderCell, Cell } = Table;

export default function Details({ auth, reservation, cancellable }) {
    const title = "Detalhes da reserva";
    const { flash } = usePage().props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        toast.success(flash.success);
        toast.error(flash.error);
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} header={<H2>{title}</H2>}>
            <Head title={title} />
            <DefaultWrapper>
                <H3>{`Reserva para ${reservation.common_area.name} em ${reservation.common_area.condominium.name}`}</H3>
                <div>
                    <div className="inline-block my-2 mr-5">
                        <b>Início:</b> {formatDate(reservation.started_at)}
                    </div>
                    <div className="inline-block my-2">
                        <b>Fim:</b> {formatDate(reservation.finished_at)}
                    </div>
                </div>
                <H3>Histórico de status</H3>
                <Table data={reservation.statuses}>
                    <Column flexGrow={1}>
                        <HeaderCell>Status</HeaderCell>
                        <Cell dataKey="description" />
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>Data</HeaderCell>
                        <Cell>{(row) => formatDate(row.pivot.created_at)}</Cell>
                    </Column>
                </Table>
                <div className="flex justify-evenly">
                    <LinkButton href={route("reservations.mine")}>
                        Voltar
                    </LinkButton>
                    <Button
                        color="red"
                        appearance="primary"
                        disabled={!cancellable}
                        onClick={() => setOpen(true)}
                    >
                        Cancelar reserva
                    </Button>
                </div>
            </DefaultWrapper>
            <ToastContainer />
            <Modal show={open} maxWidth="lg">
                <div className="p-5">
                    <h3 className="text-center">Deseja cancelar a reserva?</h3>
                    <div className="flex justify-center gap-5 mt-5">
                        <Link
                            href={route("reservations.cancel", reservation.id)}
                        >
                            <Button
                                color="green"
                                size="lg"
                                appearance="primary"
                            >
                                Sim
                            </Button>
                        </Link>
                        <Button
                            color="red"
                            size="lg"
                            appearance="primary"
                            onClick={() => setOpen(false)}
                        >
                            Não
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
