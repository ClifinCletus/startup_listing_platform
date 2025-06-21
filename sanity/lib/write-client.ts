import "server-only"

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId ,token} from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Set to false if statically generating pages(on every change made in the sanity data, we would get it instanty, not in 60 seconds(if true-> used to cache the blog like pages where content not changes gradually)), using ISR or tag-based revalidation
})

if(!writeClient.config().token){
    throw new Error("write token not found")
}