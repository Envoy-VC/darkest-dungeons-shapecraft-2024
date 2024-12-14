// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {DarkestDungeon} from "src/DarkestDungeon.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying deployer address", deployerAddress);

        DarkestDungeon game = new DarkestDungeon(deployerAddress);

        console.log("Deployed Darkest Dungeon at address: %s", address(game));
        vm.stopBroadcast();
    }
}
