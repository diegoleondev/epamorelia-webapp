const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_DISCORD_INVITE_URL } = process.env;

export const ENV = {
  API_URL: NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  DISCORD_INVITE_URL: NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.com/",
};
