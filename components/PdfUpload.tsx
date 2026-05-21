"use client";

import { useEffect, useRef } from "react";

export const triggerFileUpload = () => {
    window.dispatchEvent(new Event("open-pdf-upload"));
};

const PdfUpload = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleTrigger = () => {
            fileInputRef.current?.click();
        };

        window.addEventListener("open-pdf-upload", handleTrigger);

        return () => {
            window.removeEventListener("open-pdf-upload", handleTrigger);
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Takes first selected file
        if (file) {
            console.log("Vybraný soubor:", file.name);
            console.log("Velikost souboru (v bajtech):", file.size);
            console.log("Typ souboru:", file.type);

            // Will add function for DB soon
        }
    };
    
    {/* Hidden input (checks if the file has PDF format) */}
    return (
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf" // allows only PDF
            className="hidden"
        />
    )
}

export default PdfUpload