import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2 } from "@/Components/Headings";
import LinkButton from "@/Components/LinkButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect } from "react";
import { BsGear } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Button, Table } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const { Column, HeaderCell, Cell } = Table;

const title = "Minhas reservas";

export default function Index({ auth, reservations }) {
    const { flash } = usePage().props;

    useEffect(() => {
        console.log("reservations", reservations);
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
                    <Table data={reservations}>
                        <Column flexGrow={1}>
                            <HeaderCell>Área</HeaderCell>
                            <Cell dataKey="common_area" />
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Início</HeaderCell>
                            <Cell>
                                {(row) =>
                                    format(
                                        new Date(row.started_at),
                                        "dd 'de' MMMM 'de' Y 'às' HH:mm",
                                        { locale: ptBR }
                                    )
                                }
                            </Cell>
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Fim</HeaderCell>
                            <Cell>
                                {(row) =>
                                    format(
                                        new Date(row.finished_at),
                                        "dd 'de' MMMM 'de' Y 'às' HH:mm",
                                        { locale: ptBR }
                                    )
                                }
                            </Cell>
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
                                    <Button
                                        appearance="link"
                                        onClick={() =>
                                            alert(`id:${rowData.id}`)
                                        }
                                    >
                                        Detalhes
                                    </Button>
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
