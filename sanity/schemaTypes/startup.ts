import {defineField, defineType} from 'sanity'

export const startup = defineType({ //to define the datatypes
    //these 3 fields are the details of this author schema like name of this schema is author
    name: "startup",
    title: "Startup",
    type: "document",
    //these are the fields present in each startup. ie, author contains if of type number like that
    fields: [
        defineField({
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
        defineField({
            //author is refering to the author in the author schema(same as learned in mongoose schema)
            name: "author",
            type: "reference",
            to:{type: 'author'}
        }),
        defineField({
            name: "views",
            type: "number"
        }),
        defineField({
            name: "description",
            type: "text"
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(20).required().error("please enter a category") //same as in mongoose to define particular constraints of the field
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "pitch",
            type: "markdown" //custom field which uses markdown pligin by sanity
        }),
    ]
})