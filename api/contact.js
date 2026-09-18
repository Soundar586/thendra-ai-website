import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        // Get form data
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

        // Validate required fields
        if (!name || !email || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from("leads")
            .insert([
                {
                    name,
                    company,
                    email,
                    phone,
                    service,
                    budget,
                    timeline,
                    description,
                    status: "NEW"
                }
            ])
            .select()
            .single();

        // Database error
        if (error) {

            console.error("Supabase error:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to save enquiry."
            });
        }

        // Success
        return res.status(200).json({
            success: true,
            message: "Your enquiry has been received.",
            leadId: data.id
        });

    } catch (error) {

        console.error("Server error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
}