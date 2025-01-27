import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { user } from "@nextui-org/react";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email");

    if (userEmail) {
        try {
            const orders = await prisma.order.findMany({
                where: {
                    userEmail
                }
            });

            const returns = orders.map((order) => {
                return {
                    foodName: order.foodName,
                    foodPrice: order.foodPrice,
                    status: order.status,
                    paymentMethod: order.paymentMethod,
                    orderNumber: order.orderNumber,
                    orderedAt: order.orderedAt
                };
            });

            return NextResponse.json(returns);
        } catch (error) {
            console.error("Error retrieving project:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    }
}