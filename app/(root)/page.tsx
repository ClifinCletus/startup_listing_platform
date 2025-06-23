import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch,SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  //access the query set as from the Form automatically to the current url,
  const query = (await searchParams).query;

  //here we have taken the query and passing it to the queries.ts, then if the search(params) contain anything, it would fetch data as per that(we are adding this logic to the query)//now like doing a filter
  const params = {search: query || null}

  //

  const [session,{data: posts}] = await Promise.all([
   await auth(),
   await sanityFetch ({query: STARTUPS_QUERY , params})
  ])
   

  console.log(session?.id) 

  

  // const posts = [{
  //   _createdAt:new Date(),
  //   views: 55,
  //   author: {_id:1, name:"Clifin"},
  //   _id:1,
  //   description:'This is a description',
  //   image: 'https://cdnb.artstation.com/p/assets/covers/images/001/694/405/large/jesus-velazco-cropped.jpg?1451069260',
  //   category:"Robots",
  //   title: "We Robots"
  // }]

  return (
    <> 
     {/*Hero section */}
      <section className="pink_container">
        <h1 className="heading">
          {" "}
          Pitch Your startup, <br /> Connect With Enterpreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      {/*Startup lists */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Search results for ${query}`: 'All Startups'}
        </p>

        <ul className="mt-7 card_grid"> {/*card gris is a custom tailwind code which sets 3 colum grid in medium and above devices and 2 column grid in small devices and gap btw them*/}
          {posts ?.length>0 ?(
            posts.map((post : StartupTypeCard)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ):
          (
            <p className='no-results'> No Startups found</p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
