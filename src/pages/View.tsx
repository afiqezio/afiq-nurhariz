import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen section-padding">
      {/* Header Section */}
      <div className="mb-8">
        <Button
          variant="outline"
          className="glass mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-4xl font-bold mb-2">View Page</h1>
        <p className="text-muted-foreground">
          This is a template for viewing detailed information
        </p>
      </div>

      {/* Main Content Section */}
      <div className="grid gap-6">
        <Card className="glass p-6">
          <h2 className="text-2xl font-semibold mb-4">Content Section</h2>
          <p className="text-muted-foreground">
            Add your content here. This card uses the glass effect consistent with
            the site's design.
          </p>
        </Card>

        <Card className="glass p-6">
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <p className="text-muted-foreground">
            You can add more sections and customize this template based on your
            needs.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default View;