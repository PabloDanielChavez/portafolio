import { revalidatePath } from "next/cache";

import {
    createRevalidationPostHandler,
    methodNotAllowedHandler
} from "../../../lib/server/revalidationSecurity.mjs";

export const POST = createRevalidationPostHandler({
    getExpectedToken: () => process.env.REVALIDATION_TOKEN,
    revalidate: revalidatePath
});

export function GET() {
    return methodNotAllowedHandler();
}
