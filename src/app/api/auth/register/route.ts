import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    const defaultProvider = await prisma.providerInfo.findFirst({
      where: {
        default: true,
      },
    });

    console.log("defaultProvider", defaultProvider);

    // Create user config for default settings
    const userConfig = await prisma.userConfig.create({
      data: {
        userId: user.id,
        provider_settings: JSON.stringify({
          ...defaultProvider,
          dynamic_params: JSON.parse(defaultProvider?.dynamic_params || "{}"),
        }),
      },
    });

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Failed to create user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
