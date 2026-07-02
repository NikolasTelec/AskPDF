export const PLAN_LIMITS = {
    free: {
        documents: 2,
        messagesPerDocument: 3,
        canDelete: false,
    },
    pro: {
        documents: 20,
        messagesPerDocument: 100,
        canDelete: true,
    },
} as const

export type Plan = keyof typeof PLAN_LIMITS