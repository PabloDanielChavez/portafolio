import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // 1. Verificación de seguridad: No queremos que cualquiera pueda borrar tu caché.
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.MI_TOKEN_SECRETO) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    // 2. Limpiar el caché de la ruta principal (o donde se muestre el portafolio)
    const path = request.nextUrl.searchParams.get('path') || '/';
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, now: Date.now() });
}