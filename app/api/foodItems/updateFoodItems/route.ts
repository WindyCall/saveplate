import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, providerEmail, price, imageUrl, number, description, location } = body;
  
    if (!name) {
      return NextResponse.json(
        { error: "Name parameter is missing" },
        { status: 400 }
      );
    }
  
    //
    const prisma = new PrismaClient();

    console.log(name, providerEmail, price, imageUrl, number, description, location);
  
    try {
      const item = await prisma.foodItem.findMany({
        where: {
          providerEmail: providerEmail,
          name: name
        }
      });
      if (item.length === 0) { 
        await prisma.foodItem.create({
          data: {
            name,
            providerEmail,
            price,
            imageUrl,
            number,
            description,
            location
          }
        });
      } else {
        await prisma.foodItem.update({
          where: {
            providerEmail_name: {
              providerEmail: providerEmail,
              name
            }
          },
          data: {
            price,
            number
          }
        });
      }
  
      return NextResponse.json([], { status: 200 });
    } catch (error) {
      console.error("Error updating project:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }