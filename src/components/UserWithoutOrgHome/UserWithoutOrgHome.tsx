import { TokenUserWithoutOrgSchema } from "@/models/auth.model";
import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { OrganizationForm } from "../OrganizationForm";

export interface UserWithoutOrgHomeProps {
  user: TokenUserWithoutOrgSchema;
}

export const UserWithoutOrgHome = ({ user }: UserWithoutOrgHomeProps) => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <OrganizationShell setShowForm={setShowForm} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Welcome {user.name}!</CardTitle>
          <CardDescription className="text-center pt-2">
            It looks like you're not part of an organization yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">
            To get started, you can either be invited to an existing organization by an
            administrator, or you can take the lead and create your own.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button onClick={() => setShowForm(true)} className="w-full">
            Create Your Own Organization
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            If you're expecting an invitation, please check with your organization's administrator.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

const OrganizationShell = ({ setShowForm }: { setShowForm: Dispatch<SetStateAction<boolean>> }) => {
  const handleCancelCreateOrganization = () => {
    setShowForm(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CardTitle className="text-2xl font-semibold">Create New Organization</CardTitle>
          </div>

          <CardDescription>
            Fill in the details below to set up your new organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button onClick={handleCancelCreateOrganization} variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel creating organization
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
