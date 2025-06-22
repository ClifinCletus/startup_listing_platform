"use client"

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {z} from 'zod'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors,setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const {toast} = useToast()
  const router = useRouter()

  const handleFormSubmit = async (
    prevState: { error: string; status: string },
    formData: FormData
  ) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      
      
      await formSchema.parseAsync(formValues);
      
      //creating the startup in the sanity db
      const result = await createPitch(prevState,formData,pitch)
      
     if(result.status === "SUCCESS"){
       toast({
      title:"Success",
      description:"Your startup pitch have been created successfully",
      variant:"destructive"
    })
    router.push(`/startup/${result._id}`)
     }

    return result
    } catch (error) {

  // Check if the error thrown is a Zod validation error
  if (error instanceof z.ZodError) {
    
    // Extract the specific validation error messages for each field
    const fieldErrors = error.flatten().fieldErrors;
    // Update local component state with the validation errors,
    // casting the fieldErrors object to the expected format (Record<string, string>)
    setErrors(fieldErrors as unknown as Record<string, string>);
    

    toast({
      title:"Error",
      description:"Please check yout inputs and try again",
      variant:"destructive"
    })
    // Return a new state indicating a validation failure
    return {
      ...prevState,
      error: "Validation failed",  // Message for UI or logging
      status: "ERROR"              // Custom status flag for error tracking
    };
  }

   toast({
      title:"Error",
      description:"An unexpected error has occured",
      variant:"destructive"
    })
  // If the error is not related to Zod validation,
  // return a generic error state to handle unexpected errors
  return {
    ...prevState,
    error: "An Unexpected error has occured", // General fallback error message
    status: "ERROR"                           // Consistent status flag
  };

 
  }
};


  const [state, formAction, isPending] = useActionState(handleFormSubmit,{
    error:"",status:"INITIAL"
  });

  return (
    <form action={formAction} className="startup-form p-10">
      {/* Rest of your form stays the same */}
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Startup Description" />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input id="category" name="category" className="startup-form_input" required placeholder="Startup Category (Tech, Health, Education ...)" />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">Image URL</label>
        <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Image URL" />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
        <MDEditor 
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch" 
          preview="edit" 
          height={300} 
          style={{borderRadius: 20, overflow:"hidden"}}
          textareaProps={{
            placeholder:"Briefly describe your idea and what problem it solves"
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
       
      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending ? "Submitting...": "Submit Your Pitch"}
        <Send className="size-6 ml-2"/>
      </Button>
    </form>
  )
}


export default StartupForm