import { predictFast } from "@/lib/predict";

export async function POST(request: Request) {
  return predictFast(request);
}
