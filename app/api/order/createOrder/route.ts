import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { userEmail, foodName, providerEmail, paymentMethod, status, orderNumber } = body;

    const prisma = new PrismaClient();

    console.log(userEmail, foodName, providerEmail, paymentMethod, status, orderNumber);
  
    try {
      const item = await prisma.foodItem.findUnique({
        where: {
            providerEmail_name: {
                providerEmail: providerEmail,
                name: foodName
            }
        }
      });

      console.log(item)

      if (item) {
        await prisma.order.create({
            data: {
            userEmail,
            foodId: item.id,
            paymentMethod,
            status,
            orderNumber,
            },
        });
        await prisma.foodItem.update({
            where: {
                id: item.id
            },
            data: {
                number: item.number - orderNumber
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