export function apiSuccessResponse<T>(statusCode: number, message: string = "Success", data?: T) {
    return {
        statusCode,
        message,
        data: data ?? null,
        success: true,
    };
}

export function apiErrorResponse(statusCode: number, message: string = "Something Went Wrong") {
    return {
        statusCode,
        message,
        data: null,
        success: false,
    };
}

