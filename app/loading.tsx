import { Loader } from "@/components/Loader";

// Route-level suspense fallback used automatically by Next.js
// Shown instantly while the page chunk is being fetched/rendered
export default function Loading() {
  return <Loader />;
}
