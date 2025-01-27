import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, provider, price, imageUrl, number, description, location } = body;
  
    if (!name) {
      return NextResponse.json(
        { error: "Name parameter is missing" },
        { status: 400 }
      );
    }
  
    //
    const prisma = new PrismaClient();

    console.log(name, provider, price, imageUrl, number, description, location);
  
    try {
      await prisma.foodItem.upsert({
        where: {
            name,
        },
        update: {
            price,
            number
        },
        create: {
            name,
            price,
            imageUrl,
            number,
            description,
            location,
            providerEmail: provider,
        },
      });
  
      return NextResponse.json([], { status: 200 });
    } catch (error) {
      console.error("Error updating project:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }