declare const network: readonly ["mainnet", "testnet", "regtest"];
/** Supported bitcoin networks */
export type Network = (typeof network)[number];
/**
 * The data parts encoded by a TxRef
 */
export type DataParts = {
    network: Network;
    blockHeight: number;
    txIndex: number;
    outpoint?: number;
};
/**
 * Encodes a `blockheight`, `txIndex`, and optionally `network` and/or
 * `outpoint` into a TxRef string.
 */
export declare function encode({ blockHeight, txIndex, outpoint, network, }: DataParts): string;
/**
 * Decodes a TxRef string into its data parts such as `blockHeight` and `txIndex`.
 * @param txRef An encoded TxRef string with or without separators
 * and with or without a human readable prefix.
 */
export declare function decode(txRef: string): DataParts;
export {};
