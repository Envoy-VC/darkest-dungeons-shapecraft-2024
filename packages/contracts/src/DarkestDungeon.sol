// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract DarkestDungeon {
    address public owner;

    mapping(address => PlayRecord[]) public playRecords;

    struct RoundTime {
        uint256 startTime;
        uint256 endTime;
        uint256 round;
    }

    struct PlayRecord {
        uint256 totalScore;
        RoundTime[] roundTimes;
    }

    constructor(address _initialOwner) {
        owner = _initialOwner;
    }

    function addPlayScore(PlayRecord memory record, address player) public {
        playRecords[player].push(record);
    }
}
