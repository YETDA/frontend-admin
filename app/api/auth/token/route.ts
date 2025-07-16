import { cookies } from 'next/headers';
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // 서버 로그 찍기
  console.log('--------------------------------------');
  console.log('✅ [API] accessToken from cookies:', token);
  console.log('--------------------------------------');
  if (!token) {
    return new Response(JSON.stringify({ error: 'No token' }), { status: 401 });
  }

  return new Response(JSON.stringify({ token }), { status: 200 });
}
