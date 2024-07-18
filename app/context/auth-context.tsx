import { useRouter } from "next/navigation"
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react"

interface AuthContextProps {
  isAuthenticated: boolean
  authenticate: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  let timeout: NodeJS.Timeout

  const resetTimeout = useCallback(() => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      logout()
    }, 5 * 60 * 1000) // 5 minutos
  }, [])

  const authenticate = () => {
    setIsAuthenticated(true)
    resetTimeout()
    window.addEventListener("mousemove", resetTimeout)
    window.addEventListener("mousedown", resetTimeout)
    window.addEventListener("keypress", resetTimeout)
  }

  const logout = () => {
    setIsAuthenticated(false)
    router.push("/unlock")
    window.removeEventListener("mousemove", resetTimeout)
    window.removeEventListener("mousedown", resetTimeout)
    window.removeEventListener("keypress", resetTimeout)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("mousemove", resetTimeout)
      window.removeEventListener("mousedown", resetTimeout)
      window.removeEventListener("keypress", resetTimeout)
    }
  }, [resetTimeout])

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
