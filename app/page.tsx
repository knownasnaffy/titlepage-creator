import UntitledForm from "@/components/pdfForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-cneter py-32 px-12 sm:px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Tectonic PDF Generator
        </h1>
        <UntitledForm />
      </main>
    </div>
  );
}
