import Link from "next/link";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <Container as="section" className="py-16">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-4">
        <Link href={routes.home} className="underline">
          Back to home
        </Link>
      </p>
    </Container>
  );
}
