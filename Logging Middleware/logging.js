export async function Log(stack, level, pkg, message, token) {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    if (!res.ok) {
      console.error("Failed to send log:", await res.text());
    } else {
      console.log("Log sent successfully");
    }
  } catch (err) {
    console.error("Error in Log:", err);
  }
}
