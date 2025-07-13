import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  // Extract role from the first user message
  const roleMessage = messages.find((msg: any) => msg.position === "right");
  const role = roleMessage?.message || "software engineer";

  // Count how many questions have been asked so far (by interviewer)
  const questionCount = messages.filter((msg: any) => msg.position === "left").length;
  const questionsRemaining = 15 - questionCount;

  // If no questions yet, start the interview
  if (questionCount === 0) {
    return res.status(200).json({
      reply: `Great! Let's begin your interview for the role of ${role}. Can you tell me about yourself?`,
    });
  }

  // End interview if already asked 15 questions
  if (questionCount >= 15) {
    return res.status(200).json({
      reply: "Thank you. The interview is now complete. You’ve answered all 15 questions.",
    });
  }

  // Prepare the conversation for GPT
  const conversation = messages
    .map((msg: any) => {
      const speaker = msg.position === "left" ? "Interviewer" : "Candidate";
      return `${speaker}: ${msg.message}`;
    })
    .join("\n");

  const prompt = `
You are a professional AI interviewer.

The candidate is applying for the role of ${role}.
Your goal is to ask smart, technical, and relevant interview questions for the position.
You are allowed to ask up to 15 questions in total.

So far, you have asked ${questionCount} question(s). Now, based on the conversation, continue the interview with the next appropriate question.

Do not mention question numbers. Do not return anything else like 'questionCount' or 'questionsRemaining' — just continue the interview naturally.

Conversation so far:
${conversation}

Interviewer:
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0].message?.content?.trim() ?? "Thanks for your answer.";

    // ✅ Only sending reply to frontend — no extra metadata
    res.status(200).json({ reply });
  } catch (err: any) {
    console.error("OpenAI error:", err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
}
