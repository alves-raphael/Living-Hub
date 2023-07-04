import DefaultWrapper from "@/Components/DefaultWrapper";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {title}
                </h2>
            }
        >
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
            </DefaultWrapper>
        </AuthenticatedLayout>
    );
}
