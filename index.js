import LaunchDarkly from "launchdarkly-node-server-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = LaunchDarkly.init(process.env.LD_SDK_KEY);

async function main() {
  await client.waitForInitialization();
  console.log("LaunchDarkly client initialized");

  const user = { key: "example-user", name: "Venki" };
  const flagKey = "enable-new-feature";

  const showFeature = await client.variation(flagKey, user, false);
  console.log(showFeature ? "✅ Feature ENABLED" : "❌ Feature DISABLED");

  await client.flush();
  client.close();
}

main();
