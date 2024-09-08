import type { PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth();

    if (session) {
        // get the redirect URL from the query string
        const redirect_dest = event.url.searchParams.get('redirect') ?? '/app';

        // redirect to the app
        console.log(`authed, redirecting to ${redirect_dest}`);
        throw redirect(307, redirect_dest);
    }

    // we're good
    return {}
};