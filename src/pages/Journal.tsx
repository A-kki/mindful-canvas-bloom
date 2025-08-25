import JournalSummarizer from "@/components/JournalSummarizer";

export default function Journal() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Journal & AI Insights</h1>
      <p className="text-muted-foreground">
        Write freely about your thoughts and feelings. AI will summarize in plain language. 
        This is not medical advice. If you feel unsafe, please reach out to a helpline immediately.
      </p>
      <JournalSummarizer />
    </div>
  );
}
