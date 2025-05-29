import Card from "../components/Card";
import LoginForm from "./components/LoginForm";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Card title="Login">
        <LoginForm />
      </Card>
    </div>
  );
}
