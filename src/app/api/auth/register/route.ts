import { saltAndHashPassword } from "@/utils/password";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return Response.json(
      { message: "Email and Password are required" },
      { status: 400 }
    );
  }

  const hashedPassword = await saltAndHashPassword(password);

  if (await prisma.user.findUnique({ where: { email: email } }))
    return Response.json(
      { message: "User email already register" },
      { status: 422 }
    );

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });

    return Response.json(
      user,
      // { message: "User was register with success" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
