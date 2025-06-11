import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Rotas públicas
        const publicRoutes = ["/login", "/cadastro", "/recuperar-senha"]
        const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

        if (isPublicRoute) {
          return true
        }

        // Verificar se tem token para rotas protegidas
        return !!token
      },
    },
  },
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
