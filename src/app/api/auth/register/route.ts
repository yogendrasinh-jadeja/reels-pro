import { apiErrorResponse, apiSuccessResponse } from "@/app/lib/api/apiResponse";
import { asyncHandler } from "@/app/lib/api/asyncHandler";
import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "./repository";

export const POST = asyncHandler(async (req: NextRequest) => {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json(apiErrorResponse(400, "Email and password are required"), { status: 400 });
    }
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        return NextResponse.json(apiErrorResponse(400, "Email is already registered"), { status: 400 });
    }
    const createdUser = await createUser(email, password)
    return NextResponse.json(apiSuccessResponse(201, "User created succsefully", createdUser), { status: 201 });
});
