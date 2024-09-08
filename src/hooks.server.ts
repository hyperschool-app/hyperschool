import { handle as auth } from "$lib/auth.server";
import { sequence } from "@sveltejs/kit/hooks";

export const handle = sequence(auth)