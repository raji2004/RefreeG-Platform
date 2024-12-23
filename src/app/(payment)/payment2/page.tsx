"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Example Shadcn UI components

export default function FormSwitcher() {
    const [activeForm, setActiveForm] = useState("form1"); // 'form1' or 'form2'

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Toggle Buttons */}
            <div className="flex space-x-4">
                <Button
                    variant={activeForm === "form1" ? "default" : "outline"}
                    onClick={() => setActiveForm("form1")}
                >
                    Show Form 1
                </Button>
                <Button
                    variant={activeForm === "form2" ? "default" : "outline"}
                    onClick={() => setActiveForm("form2")}
                >
                    Show Form 2
                </Button>
            </div>

            {/* Forms */}
            <Card className="w-full max-w-md">
                {activeForm === "form1" && (
                    <>
                        <CardHeader>Form 1</CardHeader>
                        <CardContent>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full mt-1 px-3 py-2 border rounded"
                                    />
                                </div>
                                <Button type="submit">Submit Form 1</Button>
                            </form>
                        </CardContent>
                    </>
                )}
                {activeForm === "form2" && (
                    <>
                        <CardHeader>Form 2</CardHeader>
                        <CardContent>
                            <form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full mt-1 px-3 py-2 border rounded"
                                    />
                                </div>
                                <Button type="submit">Submit Form 2</Button>
                            </form>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
}
