import Counter from "./ui/counter";

export default async function Home() {
  const data = await fetch("https://catfact.ninja/fact");
  const json = await data.json();

  return <Counter catFact={json.fact} />;
}
