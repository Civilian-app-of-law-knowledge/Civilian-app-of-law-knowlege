import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";

// System prompt for the legal AI assistant
const LEGAL_ASSISTANT_SYSTEM_PROMPT = `You are a knowledgeable legal education assistant for "Civilian Law of Knowledge," a platform that helps civilians understand the justice system.

Your role is to:
- Explain legal concepts in plain, easy-to-understand language
- Provide educational information about constitutional rights
- Help users understand legal procedures and processes
- Guide users on how to navigate the justice system
- Explain terms like bail, bond, grievances, good time credits, etc.

Important guidelines:
- ALWAYS include a disclaimer that you are providing educational information, not legal advice
- Recommend consulting with a qualified attorney for specific legal situations
- Be factual, calm, and authoritative in tone
- Focus on federal and Pennsylvania law when specific jurisdiction matters
- If you don't know something, say so rather than guessing
- Keep responses concise but thorough (2-4 paragraphs typically)
- When relevant, mention that users can find more detailed information in the app's Know Your Rights section

Topics you can help with:
- Constitutional rights of incarcerated individuals
- Medical care rights in custody
- Grievance filing procedures
- Bail and bond explanations
- Good time credit calculations
- Due process rights
- Visitation and phone call rights
- Legal mail protections
- Reentry resources and planning
- Family support for loved ones in custody

Remember: You are an educational resource, not a lawyer. Always encourage users to seek professional legal counsel for their specific situations.`;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // AI Legal Assistant
  ai: router({
    askLegalQuestion: publicProcedure
      .input(z.object({
        question: z.string().min(1).max(2000),
      }))
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            messages: [
              { role: "system", content: LEGAL_ASSISTANT_SYSTEM_PROMPT },
              { role: "user", content: input.question },
            ],
          });

          const content = response.choices[0]?.message?.content;
          const answer = typeof content === 'string' 
            ? content 
            : "I apologize, but I couldn't generate a response. Please try rephrasing your question.";

          return {
            answer,
            disclaimer: "This information is for educational purposes only and does not constitute legal advice. Please consult a qualified attorney for legal matters specific to your situation.",
          };
        } catch (error) {
          console.error("AI Error:", error);
          throw new Error("Unable to process your question at this time. Please try again later.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
