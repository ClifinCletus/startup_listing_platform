import Link from 'next/link'
import Image from 'next/image' //nextjs image tag
import { auth,signIn,signOut } from '@/auth'

const Navbar = async () => { 
    const session = await auth() //provides all the details of the user and for login,logout

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
        <nav className='flex justify-between items-center'>
           <Link href='/'>
               <Image src='/logo.png' alt='logo' width={144} height={30}/>
           </Link>
        
           {/*things to show only if user is logged in */}
           <div className='flex items-center gap-5 text-black'>
             {session && session.user ? (
                <>
                 <Link href='/startup/create'> {/*to create a stratup */}
                   <span>Create</span>
                 </Link>

                  <button onClick={() => signOut()}> {/*to signout */}
                    <span> Logout</span>
                  </button>

                  <Link href={`/user/${session?.user?.id}`}>  {/*for user details */}
                      <span>{session?.user?.name}</span>
                  </Link>
                </>
             ) : (
                <button onClick={await signIn('github')}> {/*to sign in via github */}
                    <span> Login </span>
                </button>
             )
             }
           </div>
        </nav>
    </header>
  )
}

export default Navbar