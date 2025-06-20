import Link from "next/link";
import Image from "next/image"; //nextjs image tag
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth(); //provides all the details of the user and for login,logout

  return (
    <header className=" px-5 py-3 bg-white shadow-md">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logosmall.png" alt="logo" width={144} height={50} />
        </Link>

        {/*things to show only if user is logged in */}
        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                {" "}
                {/*to create a stratup */}
                <span>Create</span>
              </Link>
             
            {/*here and in the signout, we added a form because , previous we had these added in button onClick={}, but onClick is particularly a client side prop, hence converted it properly to server side and added server actions here so works perfect. */}
            <form 
              action={async () => { 
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">Logout</button>
            </form>

              <Link href={`/user/${session?.user?.id}`}>
                {" "}
                {/*for user details */}
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
