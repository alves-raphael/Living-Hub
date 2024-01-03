import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date) {
    return format(new Date(date), "dd 'de' MMMM 'de' Y 'às' HH:mm", {
        locale: ptBR,
    });
}
