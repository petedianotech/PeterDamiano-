import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ 
      success: false, 
      error: 'GEMINI_API_KEY environment variable is not set. Please ensure GEMINI_API_KEY is configured in your environment secrets.' 
    }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [{ role: 'user', parts: [{ text: 'Test connection: Say "Gemini AI is ready" in 3 words.' }] }]
    });
    return NextResponse.json({ 
      success: true, 
      message: 'Gemini AI tested successfully and is responding co-routed with gemini-3.5-flash-lite!', 
      response: response.text,
      modelUsed: 'gemini-3.5-flash-lite' 
    });
  } catch (err: any) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [{ role: 'user', parts: [{ text: 'Test connection: Say "Gemini AI is ready" in 3 words.' }] }]
      });
      return NextResponse.json({ 
        success: true, 
        message: 'Gemini AI tested successfully with fallback model gemini-3.1-flash-lite!', 
        response: fallbackResponse.text,
        modelUsed: 'gemini-3.1-flash-lite' 
      });
    } catch (fallbackErr: any) {
      return NextResponse.json({ 
        success: false, 
        error: err.message || fallbackErr.message || 'Gemini API test failed' 
      }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY environment variable is not set. Please configure GEMINI_API_KEY in your environment.' }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { title, content, action } = await req.json();

    const systemContext = `You are an expert AI assistant helping Peter Damiano (known online as Petediano @petediano), a software developer, electronics builder, and content creator from Mulanje, Malawi. 
Peter builds full-stack apps (Next.js, React), mobile apps (Flutter, Kotlin, C++, Python), and IoT hardware (Automatic Flood Alert System, EducateMW, AI Tact, Oto Creator, SoundBox). He also creates community challenge games and videos.

When writing or editing blog posts for Peter:
1. Write in a natural, authentic human writing style. Avoid generic AI fluff, robotic cliches, or corporate jargon (e.g. do not use "In today's fast-paced digital landscape", "delve into", "testament to"). Write warmly, clearly, and practically as a passionate creator.
2. If action is 'polish': generate a catchy SEO title, a concise 1-2 sentence excerpt summary, fix any grammar errors, and rewrite/enhance the content in Peter's voice.
3. Return the result strictly as a valid JSON object with keys: "title", "excerpt", "content".
`;

    const prompt = `Action: ${action || 'polish'}
Current Title: ${title || ''}
Current Content: ${content || ''}

Please process this blog post and return JSON with keys: title, excerpt, content.`;

    let responseText = '';
    let usedModel = 'gemini-3.5-flash-lite';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: [
          { role: 'user', parts: [{ text: systemContext + '\n\n' + prompt }] }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });
      responseText = response.text || '';
    } catch (primaryErr) {
      console.warn('gemini-3.5-flash-lite failed, falling back to gemini-3.1-flash-lite:', primaryErr);
      usedModel = 'gemini-3.1-flash-lite';
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [
          { role: 'user', parts: [{ text: systemContext + '\n\n' + prompt }] }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });
      responseText = fallbackResponse.text || '';
    }

    let parsed = JSON.parse(responseText);
    return NextResponse.json({ ...parsed, modelUsed: usedModel });
  } catch (err: any) {
    console.error('Blog AI Assistant Error:', err);
    return NextResponse.json({ error: err.message || 'AI processing error' }, { status: 500 });
  }
}
