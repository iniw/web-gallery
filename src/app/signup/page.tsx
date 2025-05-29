import Card from "../components/Card";
import SignUpForm from "./components/SignUpForm";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Card title="Sign up">
        <SignUpForm />
      </Card>
    </div>
  );
}
