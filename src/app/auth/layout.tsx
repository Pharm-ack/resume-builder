export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-2 sm:p-4 lg:p-8">{children}</div>;
}
