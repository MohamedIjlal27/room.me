'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/context/authStore'
import { Card, CardContent } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-neutral-900 flex flex-col md:flex-row justify-center items-center w-full">
      <div className="w-full h-full max-w-[1440px] relative flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-16 py-6 md:py-0 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-500">
                <img 
                  src="/material-symbols-meeting-room.svg" 
                  alt="Room.me logo" 
                  width={24} 
                  height={24} 
                  className="text-white"
                />
              </div>
              <span className="text-xl font-bold text-white">ROOM.ME</span>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="mb-4 text-3xl font-bold text-white">Welcome back to Room.me!</h1>
            <p className="text-base text-gray-300">
              Room.me is an innovative video conference product that revolutionizes virtual meetings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-white font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-md border border-gray-700 bg-transparent p-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-white font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-gray-700 bg-transparent p-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button 
              type="submit"
              className="mt-2 rounded-md bg-purple-500 p-2 font-medium text-white hover:bg-purple-600 disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center rounded-md bg-white p-2 font-medium text-gray-800 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="mr-2">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  Remember for 30 days
                </label>
              </div>
              <button type="button" className="text-sm text-purple-400 hover:underline">
                Forgot password
              </button>
            </div>

            <div className="mt-4 text-center text-gray-300">
              Doesn&apos;t have account?{" "}
              <button type="button" className="text-purple-400 hover:underline">
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block relative w-full md:w-1/2 h-[650px] my-auto ml-12">
          <div className="absolute inset-0 bg-[url(/image.png)] bg-cover bg-center rounded-[20px]">
            <div className="absolute bottom-16 left-10 right-10 rounded-lg bg-gray-800/70 p-4 backdrop-blur-sm">
              <p className="mb-3 text-lg font-medium text-white">
                &quot;We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me
                has become an essential tool for our team, allowing us to collaborate effectively. Highly recommended!&quot;
              </p>
              <p className="text-base font-medium text-white">Sarah Markivoc - Project Manager</p>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-1.5 w-6 rounded-full ${i === 0 ? "bg-white" : "bg-gray-400/50"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 