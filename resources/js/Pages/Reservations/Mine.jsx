import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2 } from "@/Components/Headings";
import LinkButton from "@/Components/LinkButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Table } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { formatDate } from "./utils/date";

const { Column, HeaderCell, Cell } = Table;

const title = "Minhas reservas";

export default function Index({ auth, reservations }) {
    const { flash } = usePage().props;

    useEffect(() => {
        toast.success(flash.success);
        toast.error(flash.error);
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} header={<H2>{title}</H2>}>
            <Head title={title} />
            <DefaultWrapper>
                <LinkButton href={route("reservations.create")}>
                    Nova reserva
                </LinkButton>
                {reservations.length > 0 ? (
                    <Table data={reservations}>
                        <Column flexGrow={1}>
                            <HeaderCell>Área</HeaderCell>
                            <Cell dataKey="common_area" />
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Início</HeaderCell>
                            <Cell>{(row) => formatDate(row.started_at)}</Cell>
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Fim</HeaderCell>
                            <Cell>{(row) => formatDate(row.finished_at)}</Cell>
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Status</HeaderCell>
                            <Cell>
                                {(row) => {
                                    return (
                                        <Badge
                                            color={row.status_color}
                                            content={
                                                <span className="font-bold text-sm">
                                                    {row.current_status}
                                                </span>
                                            }
                                        />
                                    );
                                }}
                            </Cell>
                        </Column>

                        <Column width={80} align="right">
                            <HeaderCell>...</HeaderCell>

                            <Cell style={{ padding: "6px" }}>
                                {(rowData) => (
                                    <Link
                                        href={route(
                                            "reservations.details",
                                            rowData.id
                                        )}
                                    >
                                        Detalhes
                                    </Link>
                                )}
                            </Cell>
                        </Column>
                    </Table>
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
