"use client"

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error while logging out:', error.message);
        toast.error("Failed to log out!");
        return;
    }

    toast.success("Logged out successfully!");
    redirect('/signin')
};