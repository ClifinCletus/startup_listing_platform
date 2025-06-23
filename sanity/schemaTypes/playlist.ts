import {defineField, defineType} from 'sanity'

export const playlist = defineType({ 
    name: "playlist",
    title: "Playlists",
    type: "document",
    
    fields: [
        defineField({ //like startup of the day, of the year etc
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: { //ie, here the slug(unique name) is auto created based on the title we give
                source:'title'
            }
        }),
        defineField({ //here, we can select various startupsa and each each under the playlist as needed, can be done in sanity studio.
            name: "select",
            type: "array",
            of: [{type :"reference", to:[{type:'startup'}]}] //each playlist refers to multiple startups and have its own title.
        }),
        
    ]
})