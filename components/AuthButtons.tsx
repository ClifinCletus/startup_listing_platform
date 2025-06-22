'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButtons() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <div>Loading...</div>
  
  if (session?.user) {
    return (
      <>
        <Link href="/startup/create">
          <span>Create</span>
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/' })}>
          Logout
        </button>
        <Link href={`/user/${session.user.id}`}>
          <span>{session.user.name}</span>
        </Link>
      </>
    )
  }
  
  return (
    <button onClick={() => signIn('github')}>
      Login
    </button>
  )
}