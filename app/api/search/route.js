import { GetSearchDTO } from "@/data/cataegory-dto";
import { NextResponse } from "next/server";

// To handle a POST request to /api
export async function GET(request)
{
    const { searchParams } = new URL(request.url);
    let name = ""
    if(searchParams.has('name'))
        name = searchParams.get('name');  
    
    const results = await GetSearchDTO(name);
    if(!results.success)
        return NextResponse.json(results, {status: results.status});

    return NextResponse.json({ success: true, categories: results.categories }, {status: 200});
}
	