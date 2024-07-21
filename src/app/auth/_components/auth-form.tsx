/**
 * v0 by Vercel.
 * @see https://v0.dev/t/371vh6sNTPR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthForm() {
  const form = useForm();
  const router = useRouter();

  const handleSubmit = form.handleSubmit(async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
  });

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col items-center gap-6 px-4 py-12 sm:px-6 lg:px-8"
      >
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-8 w-8" />
          <span className="text-2xl font-bold">Acme Inc.</span>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Faça login na sua conta</CardTitle>
            <CardDescription>
              Digite seu email e senha abaixo para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                required
                {...form.register("email")}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="#"
                  className="text-sm font-medium underline underline-offset-4 hover:text-primary"
                  prefetch={false}
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...form.register("password")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </CardFooter>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-medium underline underline-offset-4 hover:text-primary"
            prefetch={false}
          >
            Registre-se
          </Link>
        </p>
      </form>
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
