import { H2 } from "@/Components/Headings";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import "rsuite/dist/rsuite.min.css";
import { DatePicker, SelectPicker } from "rsuite";
import ptBR from "rsuite/locales/pt_BR";

export default function Create({ auth, areas }) {
    const title = "Nova reserva";
    const { data, setData, post, errors, processing } = useForm({
        common_area_id: null,
        started_at: null,
        finished_at: null,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("reservations.store"));
    };
    return (
        <AuthenticatedLayout user={auth.user} header={<H2>{title}</H2>}>
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="flex gap-1 flex-wrap">
                                    <div>
                                        <InputLabel
                                            htmlFor="common_area_id"
                                            value="Área Comum"
                                        />
                                        <SelectPicker
                                            placeholder="Selecione"
                                            locale={ptBR}
                                            data={areas}
                                            onChange={(value) =>
                                                setData("common_area_id", value)
                                            }
                                            style={{ width: 224 }}
                                        />
                                        <InputError
                                            message={errors.common_area_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="started_at"
                                            value="Início"
                                        />
                                        <DatePicker
                                            locale={ptBR}
                                            onChange={(value) =>
                                                setData("started_at", value)
                                            }
                                            format="dd/MM/yyyy HH:mm"
                                            placeholder="dia/mês/ano hora:minuto"
                                            name="started_at"
                                            id="started_at"
                                        />
                                        <InputError
                                            message={errors.started_at}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="finished_at"
                                            value="Fim"
                                        />
                                        <DatePicker
                                            locale={ptBR}
                                            onChange={(value) =>
                                                setData("finished_at", value)
                                            }
                                            format="dd/MM/yyyy HH:mm"
                                            placeholder="dia/mês/ano hora:minuto"
                                            name="finished_at"
                                            id="finished_at"
                                            className="border-red-400 rounded-lg"
                                        />
                                        <InputError
                                            message={errors.finished_at}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <PrimaryButton
                                        className="mt-2 mr-2"
                                        disabled={processing}
                                    >
                                        Cadastrar
                                    </PrimaryButton>
                                    <LinkButton
                                        href={route("reservations.mine")}
                                    >
                                        Voltar
                                    </LinkButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
