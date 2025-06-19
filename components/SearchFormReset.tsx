'use client'
import Link from 'next/link'
import {X} from 'lucide-react'

const SearchFormReset = () => {
   const reset = () =>{

    //access form and remove the current content in it
    const form = document.querySelector('.search-form') as HTMLFormElement;
    
    if(form) form.reset()
   }

  return (
    <button type="reset" onClick={reset}>
      <Link href='/' className="search-btn text-white"> {/* here as per the form submission it may goto another poage because of the Nextform behaviour, so to come back to the home page by removing content in form */}
        <X className='size-5'/> {/*here also imported x icon from lucide react */}
      </Link>
    </button>
  )
}

export default SearchFormReset