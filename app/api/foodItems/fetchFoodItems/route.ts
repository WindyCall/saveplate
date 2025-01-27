import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const foodItems = await prisma.foodItem.findMany();
        console.log(foodItems)
        
        return NextResponse.json(foodItems, { status: 200 });
    } catch (error) {
        console.error("Error retrieving project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    }
}