"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const triggerFileUpload = () => {
    window.dispatchEvent(new Event("open-pdf-upload"));
};

const PdfUpload = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const handleTrigger = () => {
            fileInputRef.current?.click();
        };

        window.addEventListener("open-pdf-upload", handleTrigger);

        return () => {
            window.removeEventListener("open-pdf-upload", handleTrigger);
        };
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Takes first selected file
        if (!file) return;

        try {
            setIsUploading(true);

            // 1. Getting user
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                setIsUploading(false);
                return;
            }

            // 2. Generating unique path for file in storage
            const fileExtension = file.name.split(".").pop() || "pdf";
            const nameWithoutExtension = file.name.substring(0, file.name.lastIndexOf("."));
            const cleanFileName = nameWithoutExtension.replace(/[^a-zA-Z0-9]/g, "_");
            // Final result: user_id/date_filename.pdf
            const filePath = `${user.id}/${Date.now()}_${cleanFileName}.${fileExtension}`;

            // 3. Upload file to storage
            const { error: storageError } = await supabase.storage
                .from("pdfs") // bucket name in supabase
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false
                });

            if (storageError) {
                throw new Error(`Storage error: ${storageError.message}`);
            }

            // 4. Getting public url address 
            const { data: { publicUrl } } = supabase.storage
                .from("pdfs")
                .getPublicUrl(filePath);

            // 5. WRITE to table documents
            const { data: dbData, error: dbError } = await supabase
                .from("documents")
                .insert({
                    user_id: user.id,
                    file_url: publicUrl
                    // ID and created_at generate automatically in db
                })
                .select() // .select() gives me added row with new ID
                .single();

            if (dbError) {
                throw new Error(`Database error: ${dbError.message}`);
            }

            console.log("Added successfully to DB. Document ID:", dbData.id);

            // Will add redirect to chat

        } catch (error: any) {
            console.error("Upload failed:", error.message);
        } finally {
            setIsUploading(false);
            // Input reset
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    {/* Hidden input (checks if the file has PDF format) */ }
    return (
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf" // allows only PDF
            className="hidden"
            disabled={isUploading}
        />
    )
}

export default PdfUpload