import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2, H3 } from "@/Components/Headings";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { formatDate } from "./utils/date";
import { Button, Table } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export default function Details({ auth, reservation, cancellable }) {
    const { Column, HeaderCell, Cell } = Table;
    const title = "Detalhes da reserva";

    useEffect(() => {
        console.log(reservation);
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
                <div className="flex justify-center">
                    <Button
                        color="red"
                        appearance="primary"
                        disabled={!cancellable}
                    >
                        Cancelar reserva
                    </Button>
                </div>
            </DefaultWrapper>
        </AuthenticatedLayout>
    );
}
