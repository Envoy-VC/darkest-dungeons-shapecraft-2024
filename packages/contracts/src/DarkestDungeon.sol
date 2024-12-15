// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IGasback} from "./interfaces/IGasback.sol";

contract DarkestDungeon {
    address public owner;
    IGasback public gasback;

    mapping(address => PlayRecord[]) public playRecords;
    mapping(string => RoundTime[]) public roundTimes;

    struct RoundTime {
        uint256 startTime;
        uint256 endTime;
        uint256 round;
    }

    struct PlayRecord {
        string id;
        uint256 timestamp;
        uint256 totalRounds;
        uint256 totalScore;
    }

    struct PlayRecordWithTimes {
        string id;
        PlayRecord record;
        RoundTime[] times;
    }

    event PlayRecordAdded(PlayRecord record, RoundTime[] times, address player);

    constructor(address _initialOwner, address _gasback) {
        owner = _initialOwner;
        gasback = IGasback(_gasback);
    }

    function addPlayScore(PlayRecord memory record, RoundTime[] memory times, address player) public {
        playRecords[player].push(record);
        for (uint256 i = 0; i < times.length; i++) {
            roundTimes[record.id].push(times[i]);
        }

        emit PlayRecordAdded(record, times, player);
    }

    function registerForGasback() public {
        gasback.register(owner, address(this));
    }

    function getPlayRecords(address player) public view returns (PlayRecordWithTimes[] memory) {
        PlayRecord[] memory records = playRecords[player];

        PlayRecordWithTimes[] memory recordsWithTimes = new PlayRecordWithTimes[](records.length);

        for (uint256 i = 0; i < records.length; i++) {
            recordsWithTimes[i] =
                PlayRecordWithTimes({id: records[i].id, record: records[i], times: roundTimes[records[i].id]});
        }

        return recordsWithTimes;
    }
}
