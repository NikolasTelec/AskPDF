import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    try {
        // Getting user
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
            console.log("❌ [PROXY] Supabase error:", error.message);
        }

        // If user is NOT logged in and is trying to access documents redirect him to /signin
        if (!user && request.nextUrl.pathname.startsWith('/documents')) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }

        // If user is logged in and is trying to access signin/signup redirect him to /documents
        if (user && (request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup'))) {
            return NextResponse.redirect(new URL('/documents', request.url))
        }

        // Just checking that everything is working 
        if (user) {
            console.log(`✅ [PROXY] User signed up! Email: ${user.email}`);
        } else {
            console.log("🔒 [PROXY] User = null");
        }

    } catch (e) {
        console.error("💥 [PROXY] Crash when authenticating user", e);
    }

    console.log("--------------------------------------------------");
    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}