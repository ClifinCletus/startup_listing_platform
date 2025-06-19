import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";


const SearchForm = ({ query }: { query?: string }) => {
  return (
    //here used the nextjs Form element hence as added the name in it , its content would be added as search parameters to the current url on the screen(learned)
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}{" "}
        {/*if content in the form then appears the button to clear it if needed */}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />{" "}
          {/*icon added through shadcn via lucide-react */}
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
