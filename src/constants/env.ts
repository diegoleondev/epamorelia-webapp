const ENV = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  DISCORD_INVITE_URL:
    process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.com/",
};

export default ENV;
