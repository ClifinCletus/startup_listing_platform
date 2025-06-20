import {defineField, defineType} from 'sanity'
import {UserIcon} from 'lucide-react'

export const author = defineType({ //to define the datatypes
    //these 4 fields are the details of this author schema like name of this schema is author
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    //these are the fields present in each author. ie, author contains if of type number like that
    fields: [
        defineField({
            name: "id",
            type: "number"
        }),
        defineField({
            name: "name",
            type: "string"
        }),
        defineField({
            name: "username",
            type: "string"
        }),
        defineField({
            name: "email",
            type: "string"
        }),
        defineField({
            name: "image",
            type: "url"
        }),
        defineField({
            name: "bio",
            type: "text"
        }),
    ],
    preview: { //means, we can select each schema(each author details) particularly using the author's name
        select: {
            title: "name"
        }
    }
})