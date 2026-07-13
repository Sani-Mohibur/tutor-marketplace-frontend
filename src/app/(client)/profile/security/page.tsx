import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function SecurityPage() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Security Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account credentials and security preferences.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
