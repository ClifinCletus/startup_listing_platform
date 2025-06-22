"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  //params to perform the operations here-

  const session = await auth(); //to know author here,used it

  //here do need to be as JSON.parse(JSON.stringify({error.....})) for that created a util fn here.
  //need to do this in server actions
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  //extracting all the values present in the formData
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form.entries()).filter(([key]) => key !== "pitch")
  );

  //creating the slug(unique name like for each startup(known))
  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    //creating the startup on the sanity, for it aligning all the data in an object and then adding proper contents of it
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference", //the author here is the reference of author object in sanity
        _ref: session?.id, //id of user
      },
      pitch,
    };
     
    //creating startup in the database using the data got from the create form
    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
