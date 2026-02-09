import { healthCheck } from '@foundry/data';

export async function GET() {
  const response = await healthCheck();
  return Response.json(response);
}
