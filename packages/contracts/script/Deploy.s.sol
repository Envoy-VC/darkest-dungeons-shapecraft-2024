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

        address gasbackAddress = 0xdF329d59bC797907703F7c198dDA2d770fC45034;

        DarkestDungeon game = new DarkestDungeon(deployerAddress, gasbackAddress);

        console.log("Deployed Darkest Dungeon at address: %s", address(game));
        vm.stopBroadcast();
    }
}
