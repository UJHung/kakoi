export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen p-5 lg:max-w-7xl">{children}</div>
  );
}
