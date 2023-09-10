import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest"

export async function GET(request: NextApiRequest): Promise<NextResponse<any>> {
    const { searchParams } = new URL(request.url!)
    const searchText = searchParams.get("q")

    const response = await fetch(`${BASE_URL}?q=${searchText}?language=en&limit=4&session_token=${process.env.NEXT_PUBLIC_MAPBOC_SESSION_ID}&country=TH&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSS_TOKEN}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const json = await response.json()

    return NextResponse.json({ data: json })
}