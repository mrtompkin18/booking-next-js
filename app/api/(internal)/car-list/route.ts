import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export function GET(request: NextApiRequest): NextResponse<any> {
    return NextResponse.json({
        data: {
            car_list: [
                {
                    id: 1,
                    name: "Economy",
                    image: "cars/1.png",
                    charges: 1
                },
                {
                    id: 2,
                    name: "Mini Van",
                    image: "cars/2.png",
                    charges: 1.25
                },
                {
                    id: 3,
                    name: "Comfort",
                    image: "cars/3.png",
                    charges: 1.5
                },
                {
                    id: 4,
                    name: "Luxury",
                    image: "cars/4.png",
                    charges: 2
                },
                {
                    id: 5,
                    name: "Electric",
                    image: "cars/5.png",
                    charges: 1.4
                },
            ]
        }
    })
}