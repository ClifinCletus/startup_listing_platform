import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  // Validates that 'link' is a valid URL first
  link: z.string().url().refine(
    // Additional custom validation using refine to ensure it's an image URL
    async (url) => {
      try {
        // Make a HEAD request to the URL (sends only headers, not the whole content)
        const res = await fetch(url, { method: "HEAD" });

        // Read the 'content-type' from the response headers
        const contentType = res.headers.get("content-type");

        // Check if the content-type starts with 'image/', meaning it's an image file
        if (contentType?.startsWith("image/")) {
          return true; //Valid image URL
        } else {
          return false; //URL doesn't point to an image
        }
      } catch {
        // Fetch failed (URL unreachable, invalid, or doesn't exist)
        return false;
      }
    },
    {
      message: "The link must be a valid, publicly accessible image URL.",
    }
  ),

  pitch: z.string().min(10),
});
