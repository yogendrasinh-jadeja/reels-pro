import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../db";
import { apiErrorResponse } from "./apiResponse";

type HandlerFunction = (req: NextRequest) => Promise<NextResponse>;

export function asyncHandler(handler: HandlerFunction) {
    return async (req: NextRequest): Promise<NextResponse> => {
        try {
            await connectDB();
            return await handler(req);
        } catch (error) {
            return NextResponse.json(apiErrorResponse(500, "Internal Server Error"), { status: 500 });
        }
    };
}
