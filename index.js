import { bech32m } from 'bech32';
const network = ['mainnet', 'testnet', 'regtest'];
const PAYLOAD_LENGTH_NO_OUTPOINT = 15;
const PAYLOAD_LENGTH_WITH_OUTPOINT = 18;
const magicCodes = {
    mainnet: 0x3,
    testnet: 0x6,
    regtest: 0x0,
};
const prefixes = {
    mainnet: 'tx',
    testnet: 'txtest',
    regtest: 'txrt',
};
const magicCodesByPrefix = {
    tx: 0x3,
    txtest: 0x6,
    txrt: 0x0,
};
const networkByPrefix = {
    tx: 'mainnet',
    txtest: 'testnet',
    txrt: 'regtest',
};
function addSeparators(encoded) {
    const separatorIndex = encoded.indexOf('1');
    const payload = encoded.substring(separatorIndex + 1);
    const separatedPayload = payload.match(/.{1,4}/g)?.join('-');
    return encoded.substring(0, separatorIndex) + '1:' + separatedPayload;
}
export function encode({ blockHeight, txIndex, outpoint, network = 'mainnet', }) {
    const hasOutpoint = !!outpoint;
    const magicCode = magicCodes[network] + (hasOutpoint ? 1 : 0);
    const prefix = prefixes[network];
    const words = Array.from({ length: hasOutpoint ? 11 : 8 });
    words[0] = magicCode;
    words[1] |= (blockHeight & 0xf) << 1;
    words[2] |= (blockHeight & 0x1f0) >> 4;
    words[3] |= (blockHeight & 0x3e00) >> 9;
    words[4] |= (blockHeight & 0x7c000) >> 14;
    words[5] |= (blockHeight & 0xf80000) >> 19;
    words[6] |= txIndex & 0x1f;
    words[7] |= (txIndex & 0x3e0) >> 5;
    words[8] |= (txIndex & 0x7c00) >> 10;
    if (hasOutpoint) {
        words[9] |= outpoint & 0x1f;
        words[10] |= (outpoint & 0x3e0) >> 5;
        words[11] |= (outpoint & 0x7c00) >> 10;
    }
    return addSeparators(bech32m.encode(prefix, words));
}
/**
 * Strips invalid characters that are not part of bech32 alphabet from an
 * encoded TxRef string.
 * @param txRef A raw TxRef we are expected to decode
 * @returns A TxRef string without any invalid characters
 */
function stripNonBechCharacters(txRef) {
    const separatorIndex = txRef.indexOf('1');
    const payload = txRef.substring(separatorIndex + 1);
    const strippedPayload = payload.replace(/[^ac-hj-np-zAC-HJ-NP-Z02-9]/g, '');
    if (payload !== strippedPayload) {
        if (separatorIndex === -1) {
            // there's no prefix
            return strippedPayload;
        }
        else {
            return `${txRef.substring(0, separatorIndex)}1${strippedPayload}`;
        }
    }
    else {
        return txRef;
    }
}
/**
 * Appends the HRP prefix to a TxRef string if it is not already present.
 * @param strippedTxRef A TxRef stripped of any invalid characters
 * @returns A TxRef with the appropriate HRP bech prefix. If the provided TxRef
 * already had a prefix, it is returned unmodified.
 *
 */
function appendHrpPrefixIfMissing(strippedTxRef) {
    // some txrefs may have had the HRP stripped off leaving just the payload
    // prepend the bech32 prefix and separator if needed to properly decode
    if (strippedTxRef.length === PAYLOAD_LENGTH_NO_OUTPOINT) {
        switch (strippedTxRef[0]) {
            case 'r':
                return `${prefixes.mainnet}1${strippedTxRef}`;
            case 'x':
                return `${prefixes.testnet}1${strippedTxRef}`;
            case 'q':
                return `${prefixes.regtest}1${strippedTxRef}`;
            default:
                throw new Error('txref magic code not recognized');
        }
    }
    else if (strippedTxRef.length === PAYLOAD_LENGTH_WITH_OUTPOINT &&
        !strippedTxRef.toLowerCase().startsWith('tx1')) {
        switch (strippedTxRef[0]) {
            case 'y':
                return `${prefixes.mainnet}1${strippedTxRef}`;
            case '8':
                return `${prefixes.testnet}1${strippedTxRef}`;
            case 'p':
                return `${prefixes.regtest}1${strippedTxRef}`;
            default:
                throw new Error('txref magic code not recognized');
        }
    }
    return strippedTxRef;
}
/**
 * Sanitizes a TxRef so it can be successfully decoded as a bech32 string.
 */
function sanitizeTxRef(txRef) {
    const strippedTxRef = stripNonBechCharacters(txRef);
    return appendHrpPrefixIfMissing(strippedTxRef);
}
/**
 * @param encoded An encoded TxRef string with or without separators
 * and with or without a human readable prefix.
 */
export function decode(txRef) {
    const encoded = sanitizeTxRef(txRef);
    const { prefix, words } = bech32m.decode(encoded);
    const magicCode = words[0];
    const prefixMagicCode = magicCodesByPrefix[prefix];
    const network = networkByPrefix[prefix];
    if (prefixMagicCode === undefined || network === undefined) {
        throw new Error('txref prefix not recognized');
    }
    let outpoint;
    if (words.length === 9) {
        // no encoded outpoint
        if (magicCode !== prefixMagicCode) {
            throw new Error('invalid magic code');
        }
    }
    else if (words.length === 12) {
        // we have an outpoint
        if (magicCode !== prefixMagicCode + 1) {
            throw new Error('invalid magic code');
        }
        outpoint = words[9];
        outpoint |= words[10] << 5;
        outpoint |= words[11] << 10;
    }
    else {
        throw new Error('invalid length of bech32 encoded words');
    }
    const version = words[1] & 0x1;
    if (version !== 0) {
        throw new Error('unknown version');
    }
    let blockHeight = words[1] >> 1;
    blockHeight |= words[2] << 4;
    blockHeight |= words[3] << 9;
    blockHeight |= words[4] << 14;
    blockHeight |= words[5] << 19;
    let txIndex = words[6];
    txIndex |= words[7] << 5;
    txIndex |= words[8] << 10;
    return { network, blockHeight, txIndex, outpoint };
}
