import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import Ping from "./Ping"
import { client } from "@/sanity/lib/client"
import { writeClient } from "@/sanity/lib/write-client";
import {after} from "next/server"

const View = async ({id}: {id:string}) => {
    //have taken the views using the id here, but we have also done putting useCdn to false, inline here, so on every updates, gives live data
    const { views: totalViews = 0 } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
  
    //update the no.of views as users visit the page
    after(async()=>{
      await writeClient.patch(id).set({views: totalViews + 1}).commit()
    })
    
  
    return (
   <div className='view-container'>
     <div className="absolute -top-2 -right-2">
        {/* the small rose blinking round component to show it is active */}
        <Ping/>
     </div>

     <p className="view-text">
        <span className="font-black">{totalViews > 1 ? `${totalViews} views`: `${totalViews} view`}</span>
     </p>
   </div>
  )
}

export default View