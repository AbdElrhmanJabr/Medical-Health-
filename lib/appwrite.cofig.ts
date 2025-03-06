import * as sdk from "node-appwrite";

// Initialize Appwrite client 
const client = new sdk.Client();
client.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!).setProject("676d2ea700123e1208be").setKey("standard_4c473b38c04609e9fbdda14cb4559254cc63ba3e21ef7413475fc68b442ef42aeba789d7de9f7b2290c777121d6f69aea0e9d7fcf91fc544fc2fd5e9ac4daae81de1241c8fdc8ee903fd8400fecd0f0a352964c1a151a7014b2bb04b94da6d3cc25d49b28fac26430b03dce4946d115e23933a7d05e91b947d9708ceedae4753");

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);

console.log("Appwrite client initialized successfully.");
