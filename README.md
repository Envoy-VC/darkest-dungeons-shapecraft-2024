<p align="center">
<img src="./assets/logo.png" alt=""  width="400px"/></p>

Welcome to Darkest Dungeon, an infinite procedural dungeon-crawling adventure where danger lurks around every corner! 🧙‍♂️⚔️ Explore mysterious dungeons, collect treasures, defeat fearsome enemies, and race to find the stairs to escape to the next level! But beware—each level gets harder, and you only have 3 lives. Can you survive the darkness and climb to glory?

## ⚙️ How It Works

### 🕹️ Gameplay Mechanics

- **Randomly Generated Dungeons**: Each playthrough offers a fresh dungeon layout. No two games are the same!
- **Enemies**:
  - Skeletons: Common foes with average stats.
  - Archers: Dangerous enemies with long-range attacks, higher HP, and higher damage per second (DPS).
- **Loot System**: Collect coins to increase your score and HP. Coins come in various forms:
  - 🪙 Silver
  - 🟡 Gold
  - 🟢 Emerald
  - 🔴 Ruby
  - 💠 Diamond

### 🎮 Objective

Explore rooms, defeat enemies, and find the stairs to advance to the next level. With each new level, the dungeon grows larger, enemies get tougher, and the stakes get higher!

### 🔥 Scoring System

- Defeat enemies to boost your score.
- Collect rare loot for extra points and perks.
- 💀 3 Lives: When your three lives are up, Game Over! Save your scores and records on-chain to earn perks for future runs.

---

## 🛠️ Built for ShapeCraft Hackathon

This game is built for the ShapeCraft Hackathon using modern tools and Web3 integrations. Here’s what powers the dungeon:

- Alchemy Account Kit: Gasless user authentication for smooth Web3 interactions.
- On-Chain Features: Store scores and timer data on-chain, unlocking special perks for future playthroughs.

Contracts are deployed at [0xFae1D0D5BaF9c5354ad14fc1763feb46F9fc7190](https://explorer-sepolia.shape.network/address/0xFae1D0D5BaF9c5354ad14fc1763feb46F9fc7190) on Shape Sepolia.

---

## 🌟 Future Scope

🔮 Our journey doesn't stop here! Planned future features include:

- Multiplayer Mode: Team up or compete with friends in the dungeon.
- Boss Fights: Face epic enemies with unique mechanics.
- More Loot, More Enemies, More Challenges: Expand the dungeon universe with richer gameplay.

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="./assets/1.png" alt="" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="./assets/2.png" alt="" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/3.png" alt="" >
    </td>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/4.png" alt="" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/5.png" alt="" >
    </td>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/6.png" alt="" >
    </td>
  </tr>
</table>

## 🎥 Demo Video

[![Demo Video](https://img.youtube.com/vi/irDNxg45pvI/0.jpg)](https://www.youtube.com/watch?v=irDNxg45pvI)

## Get Started 🚀

The following repository is a turborepo and divided into the following:

- **apps/web** - The web application built using VITE.

First install the dependencies by running the following:

```

pnpm install

```

Then fill in the Environment variables in `apps/web/.env.local`

```bash
VITE_ALCHEMY_API_KEY="" # Alchemy API Key
VITE_WALLET_CONNECT_ID="" # Wallet Connect Project ID
VITE_GAS_SPONSORSHIP_ID="" # Alchemy Gas Sponsorship ID
```

Then run the following command to start the application:

```bash
pnpm dev
```

Happy Crawling! 🚪💎

---
