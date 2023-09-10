import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse<any> {
    return NextResponse.json({
        data: {
            payment_methods: [
                {
                    id: 1,
                    name: "Apple Pay",
                    image: "payments/apple-pay.png"
                },
                {
                    id: 2,
                    name: "Google Pay",
                    image: "payments/google-pay.png"
                },
                {
                    id: 3,
                    name: "Mastercard",
                    image: "payments/card.png"
                },
                {
                    id: 4,
                    name: "Visa",
                    image: "payments/visa.png"
                },
                {
                    id: 5,
                    name: "Cash",
                    image: "payments/cash.png"
                },
            ]
        }
    })
}