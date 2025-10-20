"use client";

import Image from "next/image";
// import { signInWithGoogle } from "../lib/auth-actions";
import { createClient } from "@/utils/supabase/client";


interface ScreenAuthenticationProps {
  onClose: () => void;
}

const ScreenAuthentication: React.FC<ScreenAuthenticationProps> = ({ onClose }) => {

   const handleLoginWithGoogle = async () => {
    const supabase = createClient();
    console.log(`${window.location.origin}/auth/callback`)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // bukan /api/auth/callback
      },
    });

    if (error) {
      console.error("Login error:", error.message);
    } else {
      // Supabase akan otomatis redirect ke Google
      console.log("Redirecting to Google login...");
    }
  };

     

    return (

        <>

            <div className="h-screen fixed  w-full bg-white">
                <Image onClick={onClose} className="cursor-pointer absolute right-2 top-2" src="/icon/close.png" height={32} width={28} alt="close" />
           
                <div className="flex flex-col items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="font-figtree text-[32px] font-bold">Join Liora</h1>
           
                    <div  onClick={handleLoginWithGoogle} className="w-[226px] relative h-[46px] border-black border rounded-[30px] flex justify-center items-center">
                        <Image className="absolute top-1/2 left-2 -translate-y-1/2" src="/icon/google.png" height={32} width={28} alt="google" />
                        <p className="font-figtree text-[16px]">Sign up with Google</p>
                    </div>
                    <div className="w-[226px] relative h-[46px] border-black border rounded-[30px] flex justify-center items-center">
                        <Image className="absolute top-1/2 left-2 -translate-y-1/2" src="/icon/email.png" height={32} width={28} alt="email" />
                        <p className="font-figtree text-[16px]">Sign up with Email</p>
                    </div>
           
           
                    <p className="font-figtree text-[11px] w-[289px] text-center mt-10">
                    By clicking &quot;Join&quot;, you accept Liora&apos;s Terms of Service and Privacy Policy
                    </p>

                </div>
            </div>

        
        
        </>
    )

}

export default ScreenAuthentication