import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2, H3 } from "@/Components/Headings";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import DataTable from "react-data-table-component";

const columns = [
    {
        name: "Nome",
        selector: (row) => row.name,
    },
];

export default function Update({ auth, condominium, id }) {
    const title = "Atualizar Condomínio";

    const { data, setData, errors, processing, put } = useForm({
        name: condominium.name,
    });

    const submit = (e) => {
        e.preventDefault();
        if (data.name.trim() !== condominium.name.trim()) {
            put(route("condominium.update", id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<H2>{title}</H2>}>
            <Head title={title} />
            <DefaultWrapper>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Nome" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <PrimaryButton
                            className="mt-2 mr-2"
                            disabled={processing}
                        >
                            Atualizar
                        </PrimaryButton>
                        <LinkButton href={route("condominium.index")}>
                            Voltar
                        </LinkButton>
                    </div>
                </form>
                <H3 className="my-5">Áreas Comum</H3>
                <DataTable columns={columns} data={condominium.common_areas} />
            </DefaultWrapper>
        </AuthenticatedLayout>
    );
}
