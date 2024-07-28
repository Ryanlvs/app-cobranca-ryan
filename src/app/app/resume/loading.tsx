/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DdTGkjWWGqR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="relative w-16 h-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="mt-4 text-black text-sm font-medium">Carregando...</p>
    </div>
  );
}
