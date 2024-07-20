import { saltAndHashPassword } from "@/utils/password";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return Response.json(
      {
        message: "Email and Password are required",
      },
      { status: 400 }
    );
  }

  const hashedPassword = await saltAndHashPassword(password);

  console.log(password, hashedPassword);

  try {
    console.log(1);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

/*
export async function POST(request: Request) {
  console.log("teste");
  console.log(request.body);
  return Response.json(request);
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const hashedPassword = await saltAndHashPassword(password);

  console.log(password, hashedPassword);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
*/
