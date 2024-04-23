export const verifyResetCode = async (email, code) => {
    try {
      const response = await fetch("http://localhost:5000/api/enter-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }), 
      });
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error verifying reset code:", error);
      return { success: false, error: "Failed to verify code" };
    }
  };
  