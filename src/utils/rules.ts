export const rules = {
    required: (message: string) => ({
        required: true, message
    }),
    minLength: (min: number, message?: string) => ({
        min, message
    }),
    maxLength: (max: number, message?: string) => ({
        max, message
    }),
    pattern: (pattern: RegExp, message?: string) => ({
        pattern: pattern, message
    })
}
