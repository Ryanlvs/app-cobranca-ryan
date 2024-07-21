/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fMgiHVNWEYu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export function RegisterForm() {
  const form = useForm();
  const router = useRouter();

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status == 201) {
      toast({
        title: "Usuário criado com sucesso",
        description: "",
        action: <ToastAction altText="Logar">Logar</ToastAction>,
      });
      // router.replace("/auth");
    }
  });

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </header>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex items-center justify-center"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Registrar</CardTitle>
            <CardDescription>Crie sua conta para começar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                required
                {...form.register("name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...form.register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                {...form.register("password")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login">Já possui uma conta? </Label>
              <Link
                href="/auth"
                className="text-primary hover:underline"
                prefetch={false}
              >
                Faça login
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Registrar
            </Button>
          </CardFooter>
        </Card>
      </form>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Acme Inc. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Termos de Serviço
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
