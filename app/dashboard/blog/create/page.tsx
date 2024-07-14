"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaRegSave } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Edit, EyeIcon, RocketIcon, Star } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPriview from "@/components/markdown/MarkdownPriview";


const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  image: z.string().url({message:"Invalid URL Image"}),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  is_publish: z.boolean(),
  is_premium: z.boolean(),
}).refine((data) => {
  const image = data.image

  try {
    
    const url = new URL(image)

    return url.hostname === "images.unsplash.com"

  } catch {
    return(false)
  }
},{
  message:"only suport image from unsplash",path:["image"]
})

export default function CreateBlog() {

  const[isPriview,setIsPriview] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode:"all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      image: "",
      content: "",
      is_premium: false,
      is_publish: true,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-md space-y-6">

    <div className="flex justify-between p-5 border-b  ">
      <div className="gap-5 flex items-center flex-wrap">
          <span role="button" tabIndex={0} className="flex items-center gap-2 bg-green-700 text-white py-2 px-3 rounded-md hover:bg-green-9 00 transition-all" onClick={() => setIsPriview(!isPriview && !form.getFieldState("image").invalid )}>
            {isPriview ? 
            <>
             <Edit  />
              Edit</> : 
            <>
              <EyeIcon/>
              Privew
            </>}
       
          </span>

          <FormField
          control={form.control}
          name="is_premium"
          render={({ field }) => (
            
              <FormControl>
               <div className="flex items-center gap-2 border py-2 px-3  rounded-md">
                <Star/>
                  <span>Premium</span>
                   <Switch checked={field.value} onCheckedChange={field.onChange}/>
               </div>
              </FormControl>
             
          )}
        />

        <FormField
                  control={form.control}
                  name="is_publish"
                  render={({ field }) => (
                    
                      <FormControl>
                      <div className="flex items-center gap-2 border py-2 px-3  rounded-md">
                        <RocketIcon />
                          <span>Publish</span>
                          <Switch checked={field.value} onCheckedChange={field.onChange}/>
                      </div>
                      </FormControl>
                    
                  )}
                />
              </div>

                <Button 
              disabled={!form.formState.isValid}
                className="flex items-center gap-2 text-lg">
                  Save
                  <FaRegSave/>
                </Button>
      </div>

    {/* title box */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
          
            <FormItem>
              <FormControl>
                <div className={cn("p2 flex w-full border break-words gap-2", 
                isPriview?"divide-x-0" : "divide-x")}> 
                <Input placeholder="title" {...field} className={cn("border-none font-lg leading-relaxed font-medium", isPriview? "w-0 p-0" : "w-full lg:w-1/2")} />

                  <div className={cn("lg:px-10", isPriview? "mx-auto w-full lg:w-4/5":"w-1/2 lg:block hidden")}>
                     <h1 className="text-2xl font-semibold">{form.getValues().title}</h1>
                  </div>
                </div>

              </FormControl>
            
                  {form.getFieldState("title").invalid && form.getValues().title && 
                  <div className="p-2">
                  <FormMessage />
                  </div>}
              </FormItem>
              
          )}
        />



    {/* image url box  */}
    <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
          
            <FormItem>
              <FormControl>
                <div className={cn("py-4 flex w-full border break-words gap-2", 
                isPriview?"divide-x-0" : "divide-x")}> 
                <Input placeholder="image url" {...field} className={cn("border-none font-lg leading-relaxed font-medium", isPriview? "w-0 p-0" : "w-full lg:w-1/2")} />

                 {
                  !isPriview?(
                  <>
                    <p className="p-2">To se Image click Priview button</p>
                  </>):(

                  <div className="w-full flex justify-center ">
                    <div className="w-3/4 h-40 lg:h-80 relative ">
                    <Image src={form.getValues().image} alt="priview_image" fill className="object-cover"/>
                    </div>
                      
                  </div>)
                 }
                </div>

              </FormControl>
            
                  {form.getFieldState("image").invalid && form.getValues().image && 
                    <div className="p-2">
                     <FormMessage />
                    </div>}
              </FormItem>
              
          )}
        />

      {/* content box */}

      <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
          
            <FormItem>
              <FormControl>
                <div className={cn(" flex w-full  gap-2", 
                isPriview?"divide-x-0" : "divide-x h-[70vh]")}> 
                <Textarea placeholder="content" {...field} className={cn("border-none font-lg leading-relaxed font-medium resize-none h-full ", isPriview? "w-0 p-0" : "w-full lg:w-1/2")} />
                  <div className={cn("overflow-y-auto",isPriview?"mx-auto w-full lg:w-4/5":"w-1/2 lg:block hidden")}>
                     <MarkdownPriview content={form.getValues().content}/>
                  </div>
                </div>

              </FormControl>
            
                  {form.getFieldState("content").invalid && form.getValues().content && 
                  <div className="p-2">
                  <FormMessage />
                  </div>}
              </FormItem>
              
          )}
        />

       
      </form>
    </Form>
  )
}
