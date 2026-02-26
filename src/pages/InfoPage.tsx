import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface InfoPageProps {
  title: string;
  description: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-white/80">{description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-border p-8">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            This page is currently under development. We're working on bringing you comprehensive
            information about this topic soon.
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-900 text-sm">
              In the meantime, please feel free to{" "}
              <button
                onClick={() => navigate("/contact-us")}
                className="font-semibold text-primary hover:text-primary/80 underline"
              >
                contact us
              </button>{" "}
              if you have any questions.
            </p>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-3"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
