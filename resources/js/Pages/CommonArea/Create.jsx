import { H2 } from "@/Components/Headings";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Select from "react-select";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

export default function Create({ auth, condominia }) {
    const title = "Nova área comum";
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        condominium_id: null,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("common-area.store"));
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
                                            htmlFor="name"
                                            value="Nome"
                                        />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="condominiun_id"
                                            value="Condomínio"
                                        />
                                        <Select
                                            id="condominiun_id"
                                            name="condominium_id"
                                            placeholder="Selecione"
                                            options={condominia}
                                            className="w-64"
                                            onChange={(e) =>
                                                setData(
                                                    "condominium_id",
                                                    e.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.name}
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
                                        href={route("common-area.index")}
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
