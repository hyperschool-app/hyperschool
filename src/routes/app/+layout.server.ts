import type { LayoutServerLoad } from './$types';
import {requires_session} from "$lib/auth.server";

export const load: LayoutServerLoad = async (event) => {
    return {
        session: await requires_session(event)
    }
}