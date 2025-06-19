import SearchForm from "@/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  //access the query set as from the Form automatically to the current url,
  const query = (await searchParams).query;

  return (
    <>
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
    </>
  );
}
