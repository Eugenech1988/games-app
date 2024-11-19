import PageInner from '@/components/PageInner';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <div
          className="bg-white relative px-3 pt-5 md:p-5 w-lvw h-lvh rounded-0 md:rounded-xl md:fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[600px] md:h-auto md:min-h-[400px] md:w-full">
          <PageInner/>
        </div>
      </main>
    </div>
  );
}
