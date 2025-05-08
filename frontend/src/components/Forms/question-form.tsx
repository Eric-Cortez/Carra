import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/baseUrl";
import type { Topic } from "@/features/topics/topicSlice";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose, DialogFooter } from "../ui/dialog";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(75, { message: "Title must be 75 characters or fewer." }),
  content: z.string().min(2, { message: "Content is too short." }).max(500),
  userId: z.number().min(1, { message: "Invalid user ID." }),
  topicId: z.number().min(1, { message: "Please select a topic." }),
});

const QuestionForm: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const user = useAppSelector(state => state.auth.user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      userId: user?.id || 0,
      topicId: 1,
    },
  });

  useEffect(() => {
    async function getAllTopics() {
      try {
        const response = await fetch(`${BASE_URL}/topics`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setTopics(data.topics);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getAllTopics();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${BASE_URL}/questions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Type your question here."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 align-bottom mt-0">
          <FormField
            control={form.control}
            name="topicId"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={field.value?.toString() || ""}
                  onValueChange={value => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics &&
                      topics.map(topic => (
                        <SelectItem
                          key={`_topic_select${topic.id}`}
                          value={topic.id.toString()}
                        >
                          {topic.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
