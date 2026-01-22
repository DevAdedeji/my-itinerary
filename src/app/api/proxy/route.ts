import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
        return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
    }

    // Remove endpoint from params to forward the rest
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        if (key !== 'endpoint') {
            params[key] = value;
        }
    });

    const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '783c990fdbmsh9d5fe36eb993d8fp11623ejsnc8b4bf474be8';

    try {
        const response = await axios.get(`https://booking-com15.p.rapidapi.com${endpoint}`, {
            headers: {
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
                'x-rapidapi-key': API_KEY
            },
            params: params
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Proxy Error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: error.message, details: error.response?.data },
            { status: error.response?.status || 500 }
        );
    }
}
