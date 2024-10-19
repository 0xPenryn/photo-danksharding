// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// library AdQueue {
//     struct AdvertisementSlot {
//         string url;
//         uint256 value;
//     }
//     struct Queue {
//         mapping(uint256 => AdvertisementSlot) queue;
//         uint256 first;
//         uint256 last;
//     }

//     function init(Queue storage self) internal {
//         self.first = 1;
//         self.last = 1;
//     }

//     function addToList(Queue storage self, AdvertisementSlot calldata data) public {
//         self.last += 1;
//         self.queue[self.last] = data;
//     }

//     function paidGas(Queue storage self) public returns (AdvertisementSlot memory) {
//         AdvertisementSlot memory data;
//         require(self.last > self.first);
//         data = self.queue[self.first];
//         delete self.queue[self.first];
//         self.first += 1;
//         return data;
//     }

//     function length(Queue storage self) public view returns (uint256) {
//         return self.last - self.first;
//     }
// }

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract SignatureVerification {
    using ECDSA for bytes32;
    using Address for address;

    function verifySignature(
        bytes32 message,
        address signer,
        bytes memory signature
    ) public pure returns (bool) {
        bytes32 hash = message.toEthSignedMessageHash();
        address recoveredSigner = hash.recover(signature);
        return signer == recoveredSigner;
    }
}

contract PhotoDanksharding {
    // string public currentSponsorUrl;

    function newPost(uint256 kzgCommitment) public {
        // TODO: Implement
    }

    // function queueAdvertisement(string memory url) public {
    //     // TODO: Implement
    // }

}
