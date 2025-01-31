import QuestionForm from "../Forms/question-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function AskQuestionModalBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ask Question</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ask a public question?</DialogTitle>
          <DialogDescription>
            <div className="flex items-center justify-center p-6">
              <QuestionForm />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AskQuestionModalBtn;
