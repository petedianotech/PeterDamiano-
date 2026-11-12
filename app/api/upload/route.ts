import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');

    if (!imageFile || !(imageFile instanceof Blob)) {
      return NextResponse.json({ error: 'No valid image file provided' }, { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'IMGBB_API_KEY environment variable is not configured on the server.' }, { status: 500 });
    }

    const imgbbFormData = new FormData();
    imgbbFormData.append('image', imageFile);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: imgbbFormData,
    });

    const result = await response.json();

    if (result && result.success && result.data && result.data.url) {
      return NextResponse.json({ url: result.data.url });
    } else {
      return NextResponse.json({ error: result.error?.message || 'ImgBB upload failed' }, { status: 400 });
    }
  } catch (err: any) {
    console.error('Upload API Error:', err);
    return NextResponse.json({ error: err.message || 'Server upload error' }, { status: 500 });
  }
}
