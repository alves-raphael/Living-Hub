import DefaultWrapper from "@/Components/DefaultWrapper";
import { H2 } from "@/Components/Headings";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function Update({ auth, condominia, commonArea, id }) {
    const title = "Atualizar área comum";

    const { data, setData, errors, processing, put } = useForm({
        name: commonArea.name,
        condominium_id: commonArea.condominium_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("common-area.update", id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<H2>{title}</H2>}>
            <Head title={title} />
            <DefaultWrapper>
                <form onSubmit={submit}>
                    <div className="flex gap-1 flex-wrap">
                        <div>
                            <InputLabel htmlFor="name" value="Nome" />
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
                                htmlFor="condominium_id"
                                value="Condomínio"
                            />
                            <Select
                                id="condominium_id"
                                name="condominium_id"
                                options={condominia}
                                placeholder="Escolha o condomínio"
                                className="w-64"
                                defaultValue={condominia.filter(
                                    (condo) =>
                                        condo.value == commonArea.condominium.id
                                )}
                                onChange={(e) =>
                                    setData("condominium_id", e.value)
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
                            Atualizar
                        </PrimaryButton>
                        <LinkButton href={route("common-area.index")}>
                            Voltar
                        </LinkButton>
                    </div>
                </form>
            </DefaultWrapper>
        </AuthenticatedLayout>
    );
}
