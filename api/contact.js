import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

    console.log(
        "SUPABASE_URL exists:",
        !!process.env.SUPABASE_URL
    );

    console.log(
        "SUPABASE_SECRET_KEY exists:",
        !!process.env.SUPABASE_SECRET_KEY
    );

    if (!process.env.SUPABASE_URL) {
        return res.status(500).json({
            success: false,
            message: "SUPABASE_URL is not configured."
        });
    }

    if (!process.env.SUPABASE_SECRET_KEY) {
        return res.status(500).json({
            success: false,
            message: "SUPABASE_SECRET_KEY is not configured."
        });
    }

    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SECRET_KEY
    );

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        console.log("Request body:", req.body);

        const {
            name,
            company,
            email,
            phone,
            service,
            budget,
            timeline,
            description
        } = req.body;

        if (!name || !email || !description) {
            return res.status(400).json({
                success: false,
                message: "Name, email and description are required."
            });
        }

        const { data, error } = await supabase
            .from("leads")
            .insert([
                {
                    name,
                    company: company || null,
                    email,
                    phone: phone || null,
                    service: service || null,
                    budget: budget || null,
                    timeline: timeline || null,
                    description,
                    status: "NEW"
                }
            ])
            .select()
            .single();

        if (error) {

            console.error("SUPABASE ERROR:", error);

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        console.log("Lead created:", data.id);

        return res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully.",
            leadId: data.id
        });

    } catch (error) {

        console.error("SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}