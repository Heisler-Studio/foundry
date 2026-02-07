import { sayHello } from '@foundry/hello-world';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">{sayHello()}</h1>
    </main>
  );
}
