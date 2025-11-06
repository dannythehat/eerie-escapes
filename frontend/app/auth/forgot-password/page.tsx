"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setSubmitted(true);
      toast({
        title: "Email sent",
        description: "If an account exists with this email, you will receive a password reset link."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 shadow-2xl text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-500/20 p-3">
              <Icons.check className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Check your email</h2>
          <p className="text-gray-300">
            If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
          </p>
          <p className="text-sm text-gray-400">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setSubmitted(false)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              try again
            </button>
          </p>
          <Link href="/auth/signin">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="text-gray-200">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/auth/signin"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
