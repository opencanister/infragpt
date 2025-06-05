export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex justify-center">
          <a href="/" className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            InfraNorm
          </a>
        </div>
      </div>
      {children}
    </div>
  );
}