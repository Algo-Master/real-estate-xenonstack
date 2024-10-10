import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}register`,
        { ...inputValue },
      );
      const { success, message, existinguser } = data;

      if (success) {
        handleSuccess(message);
        setUser(existinguser);
        setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      handleError(errorMessage);
    }
    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="block text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1"
            />
          </div>
          <Button type="submit" className="w-full mt-6">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
