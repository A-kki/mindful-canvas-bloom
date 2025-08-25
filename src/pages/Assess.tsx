import PHQ9 from "@/components/assessments/PHQ9";

export default function Assess() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mental Health Assessment</h1>
      <p className="text-muted-foreground">
        This screening uses the PHQ-9 questionnaire to help you reflect on mood over the last two weeks. 
        It’s not a diagnosis. For professional help, please consult a licensed provider.
      </p>
      <PHQ9 />
    </div>
  );
}
